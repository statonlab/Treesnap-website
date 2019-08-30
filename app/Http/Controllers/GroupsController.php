<?php

namespace App\Http\Controllers;

use App\Collection;
use App\Events\UserJoinedGroup;
use App\Group;
use App\GroupRequest;
use App\Http\Controllers\Traits\Observes;
use App\Http\Controllers\Traits\Responds;
use App\Jobs\SendGroupRequestNotification;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Observation;

class GroupsController extends Controller
{
    use Responds, Observes;

    /**
     * Get list of groups.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $this->validate($request, [
            'with_users' => 'nullable|boolean',
        ]);

        $groups = $user->groups()->with([
            'owner' => function ($query) use ($user) {
                $query->select(['users.id', DB::raw("IF(users.id = {$user->id}, 'You', users.name) AS name")]);
            },
        ])->withCount([
            'users',
            'groupRequests' => function ($query) {
                $query->where('group_requests.rejected', false);
            },
        ])->get();

        if ($request->with_users) {
            $groups->load([
                'users' => function ($query) {
                    $query->select('users.id');
                },
            ]);
        }

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
            'share' => 'required|boolean',
            'is_private' => 'required|boolean',
        ]);

        $user = $request->user();

        $group = Group::create([
            'name' => $request->name,
            'user_id' => $request->user()->id,
            'is_private' => $request->is_private,
        ]);

        $group->users()->attach($user->id, [
            'share' => $request->share ? true : false,
        ]);

        // Attach the owner to the response
        $group->setAttribute('owner', [
            'id' => $user->id,
            'name' => $user->name,
        ]);

        $group->users_count = 0;

        return $this->created($group);
    }

    /**
     * Update the group name.
     *
     * @param \App\Group $group
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function updateName(Group $group, Request $request)
    {
        $this->authorize('update', $group);

        $this->validate($request, [
            'name' => 'required|min:3|max:255',
        ]);

        $group->fill([
            'name' => $request->name,
        ])->save();

        return $this->success([
            'name' => $group->name,
        ]);
    }

    /**
     * Toggle the privacy of the group. Switches
     * from public to invite only.
     *
     * @param \App\Group $group
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function toggleDiscoverability(Group $group, Request $request) {
        $this->authorize('update', $group);

        $this->validate($request, [
            'is_private' => 'required|boolean'
        ]);

        $group->fill([
            'is_private' => $request->is_private
        ])->save();

        return $this->success(['is_private' => $group->is_private]);
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
                /** @var \Illuminate\Database\Eloquent\Builder $query */
                $query->select(['users.id', 'users.name']);
                $query->orderBy('users.name', 'asc');
                $query->orderBy('users.id', 'asc');
                $query->withCount('observations');
            },
        ])->findOrFail($id);

        // Protect group from being accessed by unauthorized users
        if ($group->user_id !== $user->id) {
            if (! $group->users->where('id', $user->id)->first()) {
                return $this->unauthorized();
            }
        }

        $users = $group->users->map(function ($user) {
            if (! $user->pivot->share) {
                $user->observations_count = 0;
            }

            return $user;
        });

        // Determine if user is sharing observations
        $is_sharing = $user->groups()->where('groups.id', $id)->first()->pivot->share ? true : false;

        return $this->success([
            'id' => $group->id,
            'name' => $group->name,
            'users' => $users,
            'owner' => $group->users->where('id', $group->user_id)->first(),
            'is_owner' => $user->id === $group->user_id,
            'is_sharing' => $is_sharing,
        ]);
    }

    /**
     * Get observations belonging to a group.
     *
     * @param $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function groupObservations($id, Request $request)
    {
        $user = $request->user();

        $group = Group::with([
            'users' => function ($query) {
                $query->select(['id', 'name']);
                $query->orderBy('name', 'asc');
            },
        ])->findOrFail($id);

        // Protect group from being accessed by unauthorized users
        if (! $group->users->where('id', $user->id)->first()) {
            return $this->unauthorized();
        }

        $observations = Observation::join('group_user', 'group_user.user_id', '=', 'observations.user_id')
            ->where('group_user.group_id', $id)
            ->where('group_user.share', true)
            ->orderBy('observations.id', 'desc')
            ->paginate(6);

        $observations->load([
            'confirmations' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            },
            'flags' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            },
            'collections' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            },
            'user' => function ($query) {
                $query->select('name', 'id');
            },
        ]);

        $data = [];
        foreach ($observations as $observation) {
            $json = $this->getObservationJson($observation, true, $user);
            $data[] = array_merge($json, ['user' => $observation->user]);
        }

        return $this->success(array_merge($observations->toArray(), [
            'data' => $data,
            'has_more_pages' => $observations->hasMorePages(),
            'count' => $observations->count(),
        ]));
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

        $group->collections->map(function ($collection) use ($request) {
            // Don't detach the owner
            if ($collection->user_id !== $request->user_id) {
                $collection->users()->wherePivot('is_shared_with_group', true)->detach($request->user_id);
            }
        });

        $group->users()->detach($request->user_id);

        return $this->created('User has been removed from group');
    }

    /**
     * Promotes a user to leader of a group.
     *
     * @param integer
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function promote(Group $group, Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required|integer',
        ]);

        $user = $request->user();
        $group = Group::findOrFail($id);

        if ($group->user_id !== $user->id) {
            return $this->unauthorized();
        }

        if ($group->user_id === intval($request->user_id)) {
            return $this->validationError([
                'user' => ['The group leader cannot be promoted to leader'],
            ]);
        }

        $group->update(['user_id' => $request->user_id]);

        return $this->success('User promoted successfully.');
    }

    /**
     * Delete a group and detach any associated records.
     *
     * @param $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function delete($id, Request $request)
    {
        $group = Group::findOrFail($id);
        $user = $request->user();

        if ($group->user_id !== $user->id) {
            return $this->unauthorized();
        }

        // Get all collections and detach all users
        // in this group from that collection
        // Remove user from collections
        $users = $group->users;
        $group->collections()->get()->map(function ($collection) use ($users) {
            // Remove everyone except the owner of the group
            $detachable_users = $users->filter(function ($user) use ($collection) {
                return $user->id !== $collection->user_id;
            });
            $collection->users()->wherePivot('is_shared_with_group', true)->detach($detachable_users);
        });

        $group->users()->detach();
        $group->delete();

        return $this->created('Group deleted successfully.');
    }

    /**
     * Remove authenticated from user a given group.
     *
     * @param \App\Group $group
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function exitGroup(Group $group, Request $request)
    {
        $this->authorize('exit', $group);

        $user = $request->user();

        // Remove user from collections
        $group->collections->map(function ($collection) use ($user) {
            if ($collection->user_id !== $user->id && $collection->users()->where('users.id', $user->id)->count() > 0) {
                $collection->users()->detach($user->id);
            }
        });

        $group->users()->detach($request->user()->id);

        return $this->success('Exited group successfully');
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
        $group = Group::find($request->group_id);

        foreach ($users as $id) {
            $user = User::whereDoesntHave('groups', function ($query) use ($request, $group) {
                $query->where('group_id', $request->group_id);
            })->find($id);

            if ($user) {
                $user->groups()->attach($request->group_id);

                // Dispatch event of joining the group
                event(new UserJoinedGroup($user, $group));
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

    /**
     * Get users that belong to the same group as the
     * currently authenticated user.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getGroupUsers(Request $request)
    {
        $this->validate($request, [
            'term' => 'nullable|max:100',
            'collection_id' => 'nullable|exists:collections,id',
        ]);

        $user = $request->user();

        $groups = $user->groups()->with([
            'users' => function ($query) use ($user, $request) {
                $query->where('users.id', '!=', $user->id);
                if (! empty($request->term)) {
                    $query->where(function ($query) use ($request) {
                        $query->where('users.name', 'like', "%{$request->term}%");
                        $query->orWhere('users.email', 'like', "%{$request->term}%");
                    });
                }

                if ($request->collection_id) {
                    $collection = Collection::find($request->collection_id);
                    if ($collection) {
                        $user_ids = $collection->users->map(function ($user) {
                            return $user->id;
                        });
                        if (! empty($user_ids)) {
                            $query->whereNotIn('users.id', $user_ids);
                        }
                    }
                }
            },
        ])->get();

        $users = [];
        $ids = [];
        foreach ($groups as $group) {
            foreach ($group->users as $user) {
                if (in_array($user->id, $ids)) {
                    continue;
                }
                $ids[] = $user->id;
                $users[] = [
                    'label' => $user->name,
                    'value' => $user->id,
                    'email' => $user->email,
                ];
            }
        }

        return $this->success($users);
    }

    /**
     * Search groups that are not private.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function searchPublicGroups(Request $request)
    {
        $this->validate($request, [
            'term' => 'nullable|max:255',
        ]);

        $user = $request->user();
        $is_admin = false;

        if ($user) {
            $is_admin = User::hasRole(['admin'], $user);
        }

        $groups = Group::withCount('users')->with([
            'groupRequests' => function ($query) use ($user) {
                $query->where('group_requests.user_id', $user->id);
            },
        ])->whereDoesntHave('users', function ($query) use ($user) {
            $query->where('users.id', $user->id);
        });

        if (! $is_admin) {
            $groups = $groups->where('groups.is_private', false);
        }

        if (! empty($request->term)) {
            $groups = $groups->where('groups.name', 'like', "%{$request->term}%");
        }

        $groups = $groups->orderBy('users_count', 'desc')->orderBy('groups.name', 'desc')->limit(25)->get();

        return $this->success($groups->map(function ($group) {
            $request = $group->groupRequests->first();

            return [
                'name' => $group->name,
                'id' => $group->id,
                'users_count' => $group->users_count,
                'has_request' => $request ? ! $request->withdrawn : false,
            ];
        }));
    }

    /**
     * Send a request to join a group.
     *
     * @param \App\Group $group
     * @param \Illuminate\Http\Request $request
     */
    public function toggleJoinRequest(Group $group, Request $request)
    {
        // Make sure the group is not private
        if ($group->is_private) {
            return $this->notFound('Group not found.');
        }

        $user = $request->user();

        // Make sure the user doesn't already belong to this group
        if ($group->users()->find($user->id)) {
            return $this->error('You already belong to this group');
        }

        // Make sure a request hasn't already been made
        /** @var GroupRequest $group_request */
        $group_request = $group->groupRequests()->where('user_id', $user->id)->first();
        if ($group_request) {
            // If the request has been previously made and withdrawn, reactivate it
            if ($group_request->withdrawn) {
                $group_request->fill([
                    'withdrawn' => false,
                ])->save();

                // Dispatch a job to make sure the request email is sent
                // The job will verify that a notification is not sent twice
                $this->sendGroupRequestNotification($group_request);

                return $this->success("Your request to join {$group->name} is pending approval from the group's leader");
            }

            // The request has been previously withdrawn to mark it as withdrawn
            $group_request->fill([
                'withdrawn' => true,
            ])->save();

            return $this->success("Your request to join {$group->name} has been withdrawn");
        }

        // Create the join request
        $group_request = GroupRequest::create([
            'group_id' => $group->id,
            'user_id' => $user->id,
            'withdrawn' => false,
        ]);

        $this->sendGroupRequestNotification($group_request);

        return $this->success("Your request to join {$group->name} is pending approval from the group's leader");
    }

    /**
     * Dispatch the group request notification job with a 5 minute
     * delay to allow the user to withdraw from the request.
     *
     * @param GroupRequest $group_request
     * @return mixed
     */
    protected function sendGroupRequestNotification($group_request)
    {
        $job = (new SendGroupRequestNotification($group_request))->delay(Carbon::now()->addMinutes(5));

        return $this->dispatch($job);
    }

    /**
     * Get join requests for a given group.
     *
     * @param \App\Group $group
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function showJoinRequests(Group $group, Request $request)
    {
        $user = $request->user();

        // Make sure only the owner sees this
        if ($user->id !== $group->owner->id) {
            return $this->unauthorized();
        }

        $requests = $group->groupRequests()->with([
            'user' => function ($query) {
                $query->select(['users.name', 'users.id']);
            },
        ])->select([
            'group_requests.id',
            'group_requests.group_id',
            'group_requests.user_id',
            'group_requests.created_at',
        ])->where([
            'withdrawn' => false,
            'rejected' => false,
        ])->get();

        return $this->success($requests);
    }

    /**
     * @param \App\Group $group
     * @param \Illuminate\Http\Request $request
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function acceptJoinRequest(Group $group, Request $request)
    {
        $this->authorize('manage', $group);

        $this->validate($request, [
            'request_id' => 'required|exists:group_requests,id',
        ]);

        // Accept request
        /** @var GroupRequest $group_request */
        $group_request = $group->groupRequests()->find($request->request_id);
        $group_request->accept();

        return $this->success('Join request accepted');
    }

    /**
     * @param \App\Group $group
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function rejectJoinRequest(Group $group, Request $request)
    {
        $this->authorize('manage', $group);

        $this->validate($request, [
            'request_id' => 'required|exists:group_requests,id',
        ]);

        // Reject request
        /** @var GroupRequest $group_request */
        $group_request = $group->groupRequests()->find($request->request_id);
        $group_request->reject();

        return $this->success('Join request rejected');
    }

    /**
     * @param \App\Group $group
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function resetJoinRequest(Group $group, Request $request)
    {
        $this->authorize('manage', $group);

        $this->validate($request, [
            'request_id' => 'required|exists:group_requests,id',
        ]);

        // Undo request
        /** @var GroupRequest $group_request */
        $group_request = $group->groupRequests()->find($request->request_id);
        $group_request->unreject();

        return $this->success('Join request undone');
    }

    /**
     * Patch sharing settings.
     *
     * @param \App\Group $group
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function changeSharing(Group $group, Request $request)
    {
        $this->validate($request, [
            'share' => 'required|boolean',
        ]);

        $user = $request->user();

        $belongsToGroup = $user->groups()->where('groups.id', $group->id)->first();
        if (! $belongsToGroup) {
            return $this->unauthorized();
        }

        // Update group settings
        $share = $request->share ? true : false;
        DB::table('group_user')->where('group_id', $group->id)->where('user_id', $user->id)->update([
            'share' => $share,
        ]);

        return $this->success($share);
    }
}
