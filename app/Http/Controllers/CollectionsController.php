<?php

namespace App\Http\Controllers;

use App\Collection;
use App\User;
use Illuminate\Support\Facades\DB;
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
        $user = $request->user();
        $collections = $user->collections()->get();
        dd($request->all());

        return $this->success($collections);
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
            'user' => 'required',
            'label' => 'required|min:3|max:255',
            'description' => 'nullable',
        ]);

        $collection = Collection::create([
            'user_id' => $user->id,
            'label' => $request->label,
            'description' => $request->description,
        ]);

        return $this->created($collection);
    }

    /**
     * Get a specific collection.
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $collection = Collection::with([
            'users' => function ($query) {
                $query->select('id', 'name');
            },
            'observations' => function ($query) {
                $query->select('id', 'observation_category');
            },
        ])->findOrFail($id);

        if (! $collection) {
            return $this->notFound('The collection you requested was not found.');
        }

        return $this->success([
            'name' => $collection->name,
            'users' => $collection->users,
            'observations' => $collection->observations,
        ]);
    }

    /**
     * Add trees to an existing collection.
     *
     */

    public function attach(Request $request)
    {

        $this->validate($request, [
            'observations' => 'required|json',
            'collection_id' => 'required|exists:collections,id',
            //this field must exist in the id column of the collection table
        ]);

        $observations = json_decode($request->observations);
        $collection = $request->collection_id;

        foreach ($observations as $id) {
            if ($id) {
                $collection->observations()->attach($id);
                //$id->collections()->attach($request->collection_id);
                //Need to attach the observation to the collection, not vice versa.
            }
        }

        return $this->success([
            'name' => $collection->name,
        ]);
    }

    /**
     * Grant access to collection, given a userID and collection ID.
     *
     * @param \Illuminate\Http\Request $request
     * @return mixed
     */

    public function grantAccess(Request $request)
    {
        $collection = Collection::findOrFail($request->collection_id);
        $collection->users()->attach($request->user_id);

        return $this->success([
            'name' => $collection->name,
        ]);
    }

    /**
     * Remove tree from the collection
     */

    public function detach(Request $request)
    {
        $collection = Collection::findOrFail($request->collection_id);
        $observations = json_decode($request->observations);

        $collection->detach($request->observation_id);
        foreach ($observations as $id) {
            if ($id) {
                $collection->observations()->detach($id);
            }
        }

        return $this->success([
            'name' => $collection->name,
        ]);
    }


    /**
     * Remove access for user from the collection
     */

    /**
     * Delete the collection
     */

}