<?php

namespace App\Http\Controllers;

use App\Collection;
use App\Group;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Traits\Responds;
use DB;

class CollectionsController extends Controller
{
    use Responds;

    /**
     * Get list of collections user has access to (owned and shared)
     *
     * @param Request $request
     * @param boolean $paired if true, data will be mapped to json object of {label, value}
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request, $paired = false)
    {
        $user = $request->user();

        $collections = $user->collections()->select([
            'collections.*',
            DB::raw("IF(collections.user_id = {$user->id}, true, false) as is_owner"),
        ])->with([
            'owner' => function ($query) {
                $query->select('name', 'id');
            },
        ])->withCount(['observations', 'users'])->get();

        if (! $paired) {
            $collections = $collections->map(function ($collection) use ($user) {
                if ($collection->user_id !== $user->id) {
                    $collection->label .= ' by '.$collection->owner->name;
                }

                return $collection;
            });

            return $this->success($collections);
        }

        $mapped = [];
        foreach ($collections as $collection) {
            $label = $collection->label;

            if ($collection->owner->id !== $user->id) {
                $label .= " by {$collection->owner->name}";
            }

            $mapped[] = [
                'label' => $label,
                'value' => $collection->id,
            ];
        }

        return $this->success($mapped);
    }

    /**
     * Get the collections that the current authenticated user owns.
     *
     * @param \Illuminate\Http\Request $request
     * @param bool $paired
     * @return \Illuminate\Http\JsonResponse
     */
    public function ownedCollections(Request $request, $paired = false)
    {
        $user = $request->user();

        $collections = $user->ownedCollections()->select([
            'collections.id',
            'collections.label',
            'collections.description',
            'collections.created_at',
            'collections.updated_at',
            'collections.user_id',
        ])->withCount(['observations', 'users'])->get();

        if (! $paired) {
            return $this->success($collections);
        }

        $mapped = [];
        foreach ($collections as $collection) {
            $mapped[] = [
                'label' => $collection->label,
                'value' => $collection->id,
            ];
        }

        return $this->success($mapped);
    }

    /**
     * Get the collections that the current authenticated user owns.
     *
     * @param \Illuminate\Http\Request $request
     * @param bool $paired
     * @return \Illuminate\Http\JsonResponse
     */
    public function customizableCollections(Request $request, $paired = false)
    {
        $user = $request->user();

        $collections = $user->customizableCollections()->select([
            'collections.id',
            'collections.label',
            'collections.description',
            'collections.created_at',
            'collections.updated_at',
            'collections.user_id',
            DB::raw('1 AS can_customize'),
        ])->withCount(['observations', 'users'])->get();

        if (! $paired) {
            $collections = $collections->map(function ($collection) use ($user) {
                if ($collection->user_id !== $user->id) {
                    $collection->label .= ' by '.$collection->owner->name;
                }

                return $collection;
            });

            return $this->success($collections);
        }

        $mapped = [];
        foreach ($collections as $collection) {
            if ($collection->user_id !== $user->id) {
                $collection->label .= ' by '.$collection->owner->name;
            }

            $mapped[] = [
                'label' => $collection->label,
                'value' => $collection->id,
            ];
        }

        return $this->success($mapped);
    }

    /**
     * Create a new collection.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        $user = $request->user();

        $this->validate($request, [
            'label' => 'required|min:3|max:255',
            'description' => 'nullable|max:255',
        ]);

        $collection = Collection::create([
            'user_id' => $user->id,
            'label' => $request->label,
            'description' => ! empty($request->description) ? $request->description : '',
        ]);

        // Attach the creator to the collection
        $collection->users()->attach($user->id, [
            'can_customize' => true,
        ]);

        return $this->created($collection);
    }

    /**
     * Get a specific collection.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id, Request $request)
    {
        $user = $request->user();

        $collection = Collection::with([
            'users' => function ($query) {
                $query->select('id', 'name');
            },
            'observations' => function ($query) {
                $query->select('id', 'observation_category');
            },
        ])->findOrFail($id);

        // Make sure the user has access to this observation
        if (! $collection->users->contains($user->id)) {
            return $this->unauthorized();
        }

        return $this->success([
            'is_owner' => $user->id === $collection->user_id,
            'label' => $collection->label,
            'user_id' => $collection->user_id,
            'users' => $collection->users,
            'description' => $collection->description,
            'observations' => $collection->observations,
        ]);
    }

    /**
     * Add observation to collection.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function attach(Request $request)
    {
        $user = $request->user();

        $this->validate($request, [
            'observation_id' => 'required|integer|exists:observations,id',
            'collection_id' => 'nullable|integer|exists:collections,id',
            'label' => 'nullable|max:255',
        ]);

        // Deal with new collections.
        if (empty($request->collection_id)) {
            $collection = Collection::firstOrCreate([
                'label' => $request->label,
                'user_id' => $user->id,
            ]);
            $collection->users()->attach($user->id, [
                'can_customize' => true,
            ]);
        } else {
            if (empty($request->collection_id)) {
                return $this->validationError(['label' => ['At least on item is required. Please select an existing collection or create a new one.']]);
            }

            $collection = $user->collections()->findOrFail($request->collection_id);

            // Prevent non owners from adding to the collection
            if (! $collection->pivot->can_customize) {
                return $this->unauthorized();
            }
        }

        $collection->observations()->syncWithoutDetaching($request->observation_id);

        return $this->success([
            'id' => $collection->id,
            'label' => $collection->label,
        ]);
    }

    /**
     * Grant access to collection, given a userID and collection ID.
     *
     * @param int $id the collection id
     * @param \Illuminate\Http\Request $request
     * @return mixed
     */
    public function share($id, Request $request)
    {
        $user = $request->user();

        $this->validate($request, [
            'share_category' => 'required|in:user,group',
            'user_id' => 'required_if:share_category,user',
            'group_id' => 'required_if:share_category,group',
            'can_customize' => 'required|boolean',
        ]);

        $collection = Collection::findOrFail($id);

        // Allow only owners to share
        if ($collection->user_id !== $user->id) {
            return $this->unauthorized();
        }

        if ($request->share_category === 'user') {
            return $this->shareWithUser($collection, $request);
        }

        return $this->shareWithGroup($collection, $request);
    }

    /**
     * Share collection with a single user.
     *
     * @param Collection $collection
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    protected function shareWithUser($collection, $request)
    {
        $user = $request->user();
        if (! User::find($request->user_id)) {
            // User does not exist
            return $this->validationError([
                'user_id' => ['Invalid user selected'],
            ]);
        }

        // Allow sharing only with users who have a group in common
        if (! $user->sharesGroupWith($request->user_id)) {
            return $this->unauthorized();
        }

        if ($collection->users()->where('id', $request->user_id)->first()) {
            return $this->validationError(['user_id' => ['User already exists']]);
        }

        $collection->users()->detach($request->user_id);
        $collection->users()->attach($request->user_id, [
            'can_customize' => $request->can_customize,
        ]);

        return $this->created([
            'id' => $collection->id,
            'label' => $collection->label,
            'added' => $request->user_id,
            'count' => 1,
        ]);
    }

    /**
     * Share observation with a certain group.
     *
     * @param Collection $collection
     * @param Request $request
     */
    protected function shareWithGroup($collection, $request)
    {
        $user = $request->user();
        $group = Group::find($request->group_id);

        if (! $group) {
            // Group does not exist
            return $this->validationError([
                'user_id' => ['Invalid group selected'],
            ]);
        }

        // Allow user to share with a group they belong to by checking
        // if this user belongs to the current group
        if (! $group->users()->find($user->id)) {
            return $this->unauthorized();
        }

        // Get all users in the group and sync their ids to the collection.
        // Detach the given ids first to avoid duplication.
        $existing_users = $collection->users;
        $users = $group->users()->select(['users.id'])->get()->filter(function ($user) use ($existing_users) {
            // Make sure the user does not already exist. By doing this we guarantee that
            // the existing user doesn't get detached when the group is disbanded
            return ! $existing_users->contains('id', $user->id);
        })->map(function ($user) {
            return $user->id;
        });

        $collection->users()->detach($users);
        $collection->users()->attach($users, [
            'can_customize' => $request->can_customize,
            'is_shared_with_group' => true,
        ]);

        // Attach collection to group to allow new users in the
        // group to obtain access to the collection
        $collection->groups()->syncWithoutDetaching($group->id);

        return $this->created([
            'id' => $collection->id,
            'label' => $collection->label,
            'added' => $request->user_id ?: 0,
            'count' => $collection->users()->count(),
        ]);
    }

    /**
     * Remove observation(s) from collection
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function detach(Request $request)
    {
        $this->validate($request, [
            'collection_id' => 'required|integer|exists:collections,id',
            'observation_id' => 'required|integer|exists:observations,id',
        ]);

        $user = $request->user();

        $collection = $user->collections()->findOrFail($request->collection_id);

        // Allow only owners to remove from the collection
        if (! $collection->pivot->can_customize) {
            return $this->unauthorized();
        }

        $collection->observations()->detach($request->observation_id);

        return $this->success('Observation detached successfully.');
    }

    /**
     * Detach users from collection (unshare)
     *
     * @param int $collection_id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function unshare($collection_id, Request $request)
    {
        $user = $request->user();

        $this->validate($request, [
            'user_id' => 'required|exists:users,id',
        ]);

        $collection = Collection::findOrFail($collection_id);

        // Allow non-owners to detach themselves only
        if (intval($request->user_id) === $user->id && $user->id !== $collection->user_id) {
            $collection->users()->detach($request->user_id);

            return $this->created([
                'id' => $collection->id,
                'label' => $collection->label,
                'owner' => $collection->user_id,
            ]);
        }

        if ($collection->user_id !== $user->id) {
            return $this->unauthorized();
        }

        // Don't detach owner
        if ($request->user_id !== $collection->user_id) {
            $collection->users()->detach($request->user_id);
        }

        return $this->created([
            'id' => $collection->id,
            'label' => $collection->label,
            'owner' => $collection->user_id,
        ]);
    }

    /**
     * Delete a specified collection
     *
     * @param integer $id Collection id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id, Request $request)
    {
        $id = intval($id);
        $collection = Collection::findOrFail($id);

        if ($request->user()->id !== $collection->user_id) {
            return $this->unauthorized();
        }

        $collection->observations()->detach();
        $collection->users()->detach();
        $collection->groups()->detach();
        $collection->delete();

        return $this->created([
            'id' => $id,
        ]);
    }

    /**
     * Get the list of users that own a collection.
     *
     * @param $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function users($id, Request $request)
    {
        $collection = Collection::findOrFail($id);

        if ($request->user()->id !== $collection->user_id) {
            return $this->unauthorized();
        }

        $users = $collection->users()->select([
            'users.name',
            'users.email',
            'users.id',
        ]);

        if (! $request->self_included) {
            $users->where('users.id', '!=', $collection->user_id);
        }

        $users = $users->get();

        return $this->success($users);
    }

    /**
     * Allow users to change access permissions of an observation.
     *
     * @param $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function changePermissions($id, Request $request)
    {
        $user = $request->user();
        $collection = Collection::findOrFail($id);

        if ($collection->user_id !== $user->id) {
            return $this->unauthorized();
        }

        $this->validate($request, [
            'user_id' => 'required|exists:users,id',
            'can_customize' => 'required|boolean',
        ]);

        if ($request->user_id === $collection->user_id) {
            return $this->validationError([
                'user_id' => ['Illegal operation. Users are not allowed to modify the owner\'s permissions'],
            ]);
        }

        $collection->updatePermissions($request->user_id, $request->can_customize);

        return $this->success('Permissions Updated successfully');
    }
}
