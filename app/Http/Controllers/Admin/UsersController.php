<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Traits\Observes;
use App\Http\Controllers\Traits\Responds;
use App\Observation;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class UsersController extends Controller
{
    use Responds, Observes;

    /**
     * Get all users.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $users = User::select([
            'users.id',
            'users.name',
            'email',
            'class',
            'zipcode',
            'is_anonymous',
            'roles.name as role',
            'is_admin',
            'role_id',
            DB::raw('(SELECT COUNT(id) FROM observations WHERE users.id=observations.user_id) as observations'),
        ])->join('roles', 'roles.id', '=', 'users.role_id')->get();

        return $this->success($users);
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
        $user = User::with(['groups', 'role'])->findOrFail($id);
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
            $all[] = array_merge(array_except($this->getObservationJson($observation, true, $user), ['is_private']), [
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
}
