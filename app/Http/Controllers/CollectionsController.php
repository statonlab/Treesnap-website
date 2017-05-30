<?php

namespace App\Http\Controllers;

use App\Collection;
use App\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

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
        $data = [];

        foreach ($collections as $collection) {
            //something

        }

        return $this->success($data);
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

        foreach ($observations as $id) {

            if ($id) {
                $id->collections()->attach($request->collection_id);
            }
        }

        $collection = Collection::with([
            'users' => function ($query) {
                $query->select('id', 'name');
            },
        ])->findOrFail($request->group_id);

        return $this->success([
            'name' => $collection->name,
            'users' => $collection->users,
        ]);
    }

    /**
     * Grant access to collection.
     */

    public function grantAccess(Request $request)
    {
        Collection::find($request->request_id)->users()->where('user_id', $request->user_id)->firstOrFail();
    }

    /**
     * Delete the collection
     */

    public function detach($id)
    {
        return null;
    }
}
