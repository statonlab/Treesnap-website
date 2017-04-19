<?php

namespace App\Http\Controllers\Admin;

use App\Group;
use App\Http\Controllers\Traits\Responds;
use App\User;
use function foo\func;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class GroupsController extends Controller
{
    use Responds;

    /**
     * Get list of groups.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return $this->success(Group::select([
            'id',
            'name',
            'created_at',
            DB::raw('(SELECT COUNT(*) FROM group_user WHERE groups.id=group_user.group_id) as users'),
        ])->get());
    }

    /**
     * Create a new group.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|min:3|max:255',
        ]);

        $group = Group::create([
            'name' => $request->name,
        ]);

        return $this->created($group);
    }

    /**
     * Get a certain group.
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $group = Group::with([
            'users' => function ($query) {
                $query->select('id', 'name');
            },
        ])->findOrFail($id);

        return $this->success([
            'name' => $group->name,
            'users' => $group->users,
        ]);
    }

    /**
     * Remove a user from a group.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function detach(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required|integer',
            'group_id' => 'required|integer',
        ]);

        $user = User::findOrFail($request->user_id);

        $user->groups()->detach($request->group_id);

        return $this->created();
    }

    /**
     * Get users that don't belong to this group.
     *
     * @param $group_id
     * @param Request $request
     */
    public function getAllowedUsers($group_id, Request $request)
    {
        // Get the default set of options
        if (! $request->term) {
            $users = User::select([
                'name',
                'id',
            ])->whereDoesntHave('groups', function ($query) use ($group_id) {
                $query->where('group_id', $group_id);
            })->limit(10)->get();

            return $this->success($users);
        }

        $users = User::select([
            'name',
            'id',
        ])->whereDoesntHave('groups', function ($query) use ($group_id) {
            $query->where('group_id', $group_id);
        })->where('name', 'like', "%{$request->term}%")->get();

        return $this->success($users);
    }

    /**
     * Add users to a group.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function attach(Request $request)
    {
        $this->validate($request, [
            'users' => 'required|json',
            'group_id' => 'required|exists:groups,id',
        ]);

        $users = json_decode($request->users);

        foreach ($users as $id) {
            $user = User::whereDoesntHave('groups', function ($query) use ($request) {
                $query->where('group_id', $request->group_id);
            })->find($id);

            if ($user) {
                $user->groups()->attach($request->group_id);
            }
        }

        $group = Group::with([
            'users' => function ($query) {
                $query->select('id', 'name');
            },
        ])->findOrFail($request->group_id);

        return $this->success([
            'name' => $group->name,
            'users' => $group->users,
        ]);
    }
}
