<?php

namespace App\Http\Controllers\Admin;

use App\File;
use App\Http\Controllers\Traits\CreatesDownloadableFiles;
use App\Http\Controllers\Traits\Observes;
use App\Http\Controllers\Traits\Responds;
use App\Observation;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class UsersController extends Controller
{
    use Responds, Observes, CreatesDownloadableFiles;

    /**
     * Get all users.
     *
     * @param Request $request The request.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $this->validate($request, [
            'per_page',
            'nullable|integer|min:6|max:100',
            'search' => 'nullable',
            'sort_by' => 'nullable|in:users.name,users.email,observations_count,roles.name',
            'sort_dir' => 'nullable|in:desc,asc',
        ]);

        $users = User::join('roles', 'roles.id', 'users.role_id')->select([
            'users.name',
            'users.email',
            'users.id',
            'roles.name as role_name',
            'roles.id as role_id',
            DB::raw('(SELECT COUNT(*) FROM observations WHERE observations.user_id = users.id) AS observations_count'),
        ]);

        if (! empty($request->search)) {
            $term = $request->search;
            $users->where(function ($query) use ($term) {
                /** @var \Illuminate\Database\Eloquent\Builder $query */
                $query->where('users.name', 'like', "%$term%");
                $query->orWhere('users.email', 'like', "%$term%");
                $query->orWhere('roles.name', 'like', "%$term%");
            });
        }

        $order_by = $request->sort_by ?: 'users.name';
        $order_dir = $request->sort_dir ?: 'asc';

        $users->orderBy($order_by, $order_dir);

        if ($order_by !== 'users.name') {
            $users->orderBy('users.name', 'asc');
        }

        $users = $users->paginate($request->per_page ?: 25);

        foreach ($users as $user) {
            $data[] = $this->constructUserObject($user);
        }

        return $this->success(array_merge($users->toArray(), ['data' => $data]));
    }

    /**
     * @param object $record
     * @return array
     */
    protected function constructUserObject(object $record)
    {
        return [
            'id' => $record->id,
            'name' => $record->name,
            'email' => $record->email,
            'role' => [
                'id' => $record->role_id,
                'name' => $record->role_name,
            ],
            'observations_count' => $record->observations_count,
        ];
    }

    /**
     * Get a user and their observations.
     *
     * @param $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id, Request $request)
    {
        $user = User::withCount('observations')
            ->with(['groups', 'role'])
            ->findOrFail($id);
        $admin = $request->user();

        $observations = Observation::with([
            'flags' => function ($query) use ($admin) {
                $query->where('user_id', $admin->id);
            },
            'collections' => function ($query) use ($admin) {
                $query->where('user_id', $admin->id);
            },
            'confirmations' => function ($query) use ($admin) {
                $query->where('user_id', $admin->id);
            },
        ])
            ->select($this->observation_select_fields)
            ->where('user_id', $id)
            ->orderBy('updated_at', 'desc')
            ->limit(60)
            ->get();

        $all = [];
        foreach ($observations as $observation) {
            $all[] = array_merge(array_except($this->getObservationJson($observation,
                true, $user), ['is_private']), [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                ],
            ]);
        }

        return $this->success([
            'user' => $user,
            'observations' => $all,
        ]);
    }

    /**
     * Update user info.
     *
     * @param $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     *
     * @throws \Exception
     */
    public function update($id, Request $request)
    {
        $user = User::findOrFail($id);

        $rules = [];
        if ($request->email != $user->email) {
            $rules['email'] = 'required|email|unique:users';
        }

        $this->validate($request, array_merge([
            'name' => 'required|min:3|max:255',
            'email' => 'required|email',
            'class' => 'required|min:3|max:50',
            'is_anonymous' => 'required|boolean',
            'groups.*' => 'nullable|exists:groups,id',
            'role' => 'required|exists:roles,id',
            'zipcode' => [
                'nullable',
                'min:5',
                'max:10',
                'regex:/^([0-9]{5})(-[0-9]{4})?$/i',
            ],
            'birth_year' => 'required|integer',
        ], $rules));

        $user->fill([
            'name' => $request->name,
            'role_id' => $request->role,
            'email' => $request->email,
            'class' => $request->class,
            'is_anonymous' => $request->is_anonymous,
            'zipcode' => $request->zipcode,
            'birth_year' => $request->birth_year,
        ])->save();

        $user->groups()->sync($request->groups);

        return $this->created([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'class' => $user->class,
            'zipcode' => $user->zipcode,
            'is_admin' => $user->role->is_admin,
            'role' => $user->role,
            'groups' => $user->groups,
            'is_anonymous' => $user->is_anonymous,
            'birth_year' => $user->birth_year,
        ]);
    }

    /**
     * Allow admins to download a list of users.
     *
     * @param \Illuminate\Http\Request $request
     */
    public function download(Request $request)
    {
        $filename = 'Users_'.uniqid().'_'.date('m-d-Y').'.csv';
        $path = "downloads/$filename";
        $extension = 'csv';

        // Create the file
        \Storage::put($path, $this->line([
            'Name',
            'Registration Date',
            'Email Address',
            'Number of Observations',
            'Most Recent Observation Date',
        ], $extension));

        // Create auto removable file
        File::create([
            'auto_delete' => true,
            'user_id' => $request->user()->id,
            'path' => $path,
        ]);

        // Load the data
        $users = User::select([
            'users.id',
            'users.name',
            'users.created_at',
            'users.email',
            DB::raw('(SELECT observations.created_at FROM observations WHERE users.id=observations.user_id ORDER BY observations.id DESC LIMIT 1) AS recent_observation_date'),
            DB::raw('(SELECT COUNT(*) FROM observations WHERE users.id=observations.user_id) AS observations_count'),
        ])->orderBy('users.id', 'desc')->get();

        foreach ($users as $user) {
            $recent_observation = $user->recent_observation_date;
            if (! is_null($recent_observation)) {
                $recent_observation = Carbon::createFromFormat('Y-m-d H:i:s',
                    $recent_observation)->format('m/d/y');
            }

            \Storage::append($path, $this->line([
                $user->name,
                $user->created_at->format('m/d/Y'),
                $user->email,
                $user->observations_count,
                $recent_observation ?: 'Inapplicable',
            ], $extension));
        }

        return response()->download(storage_path("app/$path"), $filename);
    }
}
