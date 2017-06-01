<?php

namespace App\Http\Controllers;

use App\Collection;
use Illuminate\Http\Request;
use App\Http\Controllers\Traits\Responds;

class CollectionsController extends Controller
{
    use Responds;

    /**
     * Get list of collections.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        //collections shared
        $user = $request->user();
        $collectionsShared = $user->collections()->get();

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
        // $this->validate($request, [
        //     'user' => 'required',
        //     'label' => 'required|min:3|max:255',
        //     'description' => 'nullable',
        // ]);
        $collection = Collection::create([
            'user_id' => $user->id,
            'label' => "test",
            'description' => "its a test, genius",
        ]);

        $collection = Collection::create([
            'user_id' => $user->id,
            'label' => $request->label,
            'description' => $request->description,
        ]);
        //Attach the creator to the collection
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
        $collection = Collection::where('id', $id)->first();
        //$collection = Collection::with([
        //    'users' => function ($query) {
        //        $query->select('id', 'name');
        //    },
        //    'observations' => function ($query) {
        //        $query->select('id', 'observation');
        //    },
        //])->findOrFail($id);

        if (! $collection) {
            return $this->notFound('The collection you requested was not found.');
        }

        return $this->success([
            'label' => $collection->label,
            'user_id' => $collection->user_id,
            'description' => $collection->observations,
        ]);
    }

    /**
     * Add observation to collection
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function attach(Request $request)
    {

        $this->validate($request, [
            'observations' => 'required|json',
            'collection_id' => 'required|exists:collections,id',
            //this field must exist in the id column of the collection table
        ]);

        $collection = Collection::findOrFail($request->collection_id);
        $observations = json_decode($request->observations);

        foreach ($observations as $id) {
            if ($id) {
                //TO DO: prevent double attachment.
                $collection->observations()->attach($id);
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

        $collection = Collection::findOrFail($request->collection_id);
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
        $collection = Collection::findOrFail($request->collection_id);
        $observations = json_decode($request->observations);

        foreach ($observations as $id) {
            if ($id) {
                $collection->observations()->detach($id);
            }
        }

        return $this->success([
            'name' => $collection->name,
        ]);
    }

    /**Detach users from collection (unshare)
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function unshare(Request $request)
    {
        $request->user_id = 2;
        $request->collection_id = 1;

        $collection = Collection::findOrFail($request->collection_id);
        $collection->users()->detach($request->user_id);
        //
        //if (!$request->user_id === $collection->user_id) { //Don't detach self
        //    $collection->users()->detach($request->user_id);
        //}

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
        $id = $request->collection_id;
        $label = $request->label;
        $collection = Collection::find($id);
        $collection->delete();

        return $this->success([
            'id' => $id,
            'label' => $label,
        ]);
    }
}