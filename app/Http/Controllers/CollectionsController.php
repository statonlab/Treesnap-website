<?php

namespace App\Http\Controllers;

use App\Collection;
use Illuminate\Http\Request;
use App\Http\Controllers\Traits\Responds;

class CollectionsController extends Controller
{
    use Responds;

    /**
     * Get list of collections user has access to (owned and shared)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        //collections shared
        $user = $request->user();
        $collectionsShared = $user->collections;

        return $this->success($collectionsShared);
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
        $collection->users()->attach($user->id);

        return $this->created($collection);
    }

    /**
     * Get a specific collection.
     *
     * @param $id
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
            'observations' => 'required|json',
            'collection_id' => 'required|exists:collections,id',
        ]);

        $collection = Collection::findOrFail($request->collection_id);

        // Prevent non owners from adding to the collection
        if ($collection->user_id !== $user->id) {
            return $this->unauthorized();
        }

        $observations = json_decode($request->observations);
        foreach ($observations as $id) {
            // Make sure that all observations exists before attaching
            if (Collection::find($id)) {
                $collection->observations()->syncWithoutDetaching($id);
            }
        }

        return $this->success([
            'id' => $collection->id,
            'label' => $collection->label,
        ]);
    }

    /**
     * Grant access to collection, given a userID and collection ID.
     *
     * @param \Illuminate\Http\Request $request
     * @return mixed
     */
    public function share(Request $request)
    {
        $user = $request->user();

        $this->validate($request, [
            'collection_id' => 'required|exists:collections,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $collection = Collection::findOrFail($request->collection_id);

        // Allow only owners to share
        if ($collection->user_id !== $user->id) {
            return $this->unauthorized();
        }

        $collection->users()->syncWithoutDetaching($request->user_id);

        return $this->success([
            'id' => $collection->id,
            'label' => $collection->label,
            'added' => $request->user_id,
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
            'collection_id' => 'required|exists:collections,id',
            'observations' => 'required|json',
        ]);

        $user = $request->user();

        $collection = Collection::findOrFail($request->collection_id);

        // Allow only owners to remove from the collection
        if ($collection->user_id !== $user->id) {
            return $this->unauthorized();
        }

        $observations = json_decode($request->observations);
        foreach ($observations as $id) {
            $collection->observations()->detach($id);
        }

        return $this->success([
            'name' => $collection->name,
        ]);
    }

    /**
     * Detach users from collection (unshare)
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function unshare(Request $request)
    {
        $user = $request->user();

        $this->validate($request, [
            'collection_id' => 'required|exists:collections,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $collection = Collection::findOrFail($request->collection_id);

        // Allow non-owners to detach themselves only
        if ($request->user_id === $user->id && $request->user_id !== $collection->user_id) {
            $collection->users()->detach($request->user_id);

            return $this->success([
                'id' => $collection->id,
                'label' => $collection->label,
                'Owner' => $collection->user_id,
            ]);
        }

        if ($collection->user_id !== $user->id) {
            return $this->unauthorized();
        }
        
        // Don't detach owner
        if ($request->user_id !== $collection->user_id) {
            $collection->users()->detach($request->user_id);
        }

        return $this->success([
            'id' => $collection->id,
            'label' => $collection->label,
            'Owner' => $collection->user_id,

        ]);
    }

    /**
     * Delete a specified collection
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete(Request $request)
    {
        $this->validate($request, [
            'collection_id' => 'required|exists:collections,id',
        ]);

        $collection = Collection::findOrFail($request->collection_id);

        if ($request->user() !== $collection->user_id) {
            return $this->unauthorized();
        }

        $collection->delete();

        return $this->success([
            'id' => $request->id,
            'label' => $request->label,
        ]);
    }
}