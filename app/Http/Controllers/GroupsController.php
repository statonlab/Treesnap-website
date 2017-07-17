<?php

namespace App\Http\Controllers;

use App\Group;
use App\Http\Controllers\Traits\Responds;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GroupsController extends Controller
{
    use Responds;

    /**
     * Get list of groups.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $groups = $user->groups()->with([
            'owner' => function ($query) use ($user) {
                $query->select(['users.id', DB::raw("IF(users.id = {$user->id}, 'You', users.name) AS name")]);
            },
        ])->withCount('users')->get();

        return $this->success($groups);
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

        $user = $request->user();

        $group = Group::create([
            'name' => $request->name,
            'user_id' => $request->user()->id,
        ]);

        $group->users()->attach($user->id);

        $group->owner = [
            'id' => $user->id,
            'name' => $user->name,
        ];

        $group->users_count = 0;

        return $this->created($group);
    }

    /**
     * Get a certain group.
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id, Request $request)
    {
        $user = $request->user();

        $group = Group::with([
            'users' => function ($query) {
                $query->select(['id', 'name']);
            },
        ])->findOrFail($id);

        // Protect group from being accessed by unauthorized users
        if ($group->user_id !== $user->id) {
            if (! $group->users->where('id', $user->id)->first()) {
                return $this->unauthorized();
            }
        }

        return $this->success([
            'id' => $group->id,
            'name' => $group->name,
            'users' => $group->users,
            'owner' => $group->users->where('id', $group->user_id)->first(),
            'is_owner' => $user->id === $group->user_id,
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

        $user = $request->user();
        $group = Group::findOrFail($request->group_id);

        if ($group->user_id !== $user->id) {
            return $this->unauthorized();
        }

        if ($group->user_id === intval($request->user_id)) {
            return $this->validationError([
                'user' => ['The group leader cannot be removed from the group'],
            ]);
        }

        $group->users()->detach($request->user_id);

        return $this->created('User has been removed from group');
    }

    /**
     * Delete a group and detach any associated records.
     *
     * @param $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id, Request $request)
    {
        $group = Group::findOrFail($id);
        $user = $request->user();

        if ($group->user_id !== $user->id) {
            return $this->unauthorized();
        }

        $group->users()->detach();
        $group->delete();

        return $this->created('Group deleted successfully.');
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
