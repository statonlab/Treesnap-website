<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\Responds;
use App\Http\Controllers\Traits\Observable;
use App\Observation;
use Illuminate\Http\Request;
use App\Events\ObservationDeleted;
use Cache;
use Storage;

class ObservationsController extends Controller
{
    use Responds, Observable;

    /**
     * Get all public observations.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request, $limit = null)
    {
        $is_admin = false;
        $user = $request->user();
        if ($user) {
            $is_admin = $user->isAdmin() || $user->isScientist();
        }
        $cache_key = $is_admin ? 1 : 0;
        $uid = $user ? $user->id : 'guest';
        $cache_key = "all_observations_{$cache_key}_{$uid}";

        // Get data from the cache if a limit is not set
        if (! $limit) {
            //$data = Cache::tags('observations')->remember($cache_key, 60 * 24, function () use ($limit, $request) {
                $data = $this->getObservationsFromDB($request, $limit);
            //});
        } else {
            $data = $this->getObservationsFromDB($request, $limit);
        }

        return $this->success($data);
    }

    /**
     * Get observation records from the DB.
     *
     * @param Request $request
     * @param int|null $limit
     * @return array
     */
    public function getObservationsFromDB($request, $limit = null)
    {
        $user = $request->user();
        $is_admin = false;

        $observations = Observation::with('user');

        if ($user) {
            $is_admin = $user->isScientist() || $user->isAdmin();
        }

        if (! $is_admin) {
            $observations = $observations->where('is_private', false);
        }

        $observations->orderBy('observations.id', 'desc');

        $data = [];

        $mapper = function ($observations) use (&$data, $user, $is_admin) {
            if ($user) {
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
                ]);
            }

            foreach ($observations as $observation) {
                // Compile the data into a standardized response
                // Remove the is_private value from the response
                $user = $observation->user;
                $json_ready = array_except($this->getObservationJson($observation, $is_admin), ['is_private']);
                $mapped = array_merge($json_ready, [
                    'user' => [
                        'id' => $user->id,
                        'name' => ! $is_admin && $user->is_anonymous ? 'Anonymous' : $user->name,
                    ],
                ]);

                $data[] = $mapped;
            }
        };

        if ($limit) {
            $observations = $observations->paginate(intval($limit));
            $mapper($observations);
            $data = [
                'observations' => $data,
                'currentPage' => $observations->currentPage(),
                'perPage' => $observations->perPage(),
                'hasMorePages' => $observations->hasMorePages(),
                'total' => $observations->total(),
                'nextPageUrl' => $observations->nextPageUrl(),
                'previousPageUrl' => $observations->previousPageUrl(),
            ];
        } else {
            $observations->chunk(1000, $mapper);
        }

        return $data;
    }

    /**
     * Return the observation page.
     *
     * @param $id
     * @return \Illuminate\View\View
     */
    public function show($id)
    {
        return view('observations.observation')->with(compact('id'));
    }

    /**
     * @param $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function ajaxShow($id, Request $request)
    {
        $observation = Observation::findOrFail($id);

        if ($observation->is_private) {
            if (auth()->check() && ! auth()->user()->isAdmin()) {
                return abort(401);
            }
        }

        if ($request->wantsJson() || $request->ajax()) {
            return $this->success([
                'observation_category' => $observation->observation_category,
                'owner' => $observation->user->is_anonymous ? 'Anonymous' : $observation->user->name,
                'latitude' => (double) number_format($observation->latitude, 5),
                'longitude' => (double) number_format($observation->longitude, 5),
                'location_accuracy' => (int) number_format($observation->location_accuracy, 0),
                'meta_data' => $observation->data,
                'images' => $observation->images,
                'collection_date' => $observation->collection_date->diffForHumans(),
                'mobile_id' => $observation->mobile_id,
            ]);
        }

        return abort(404);
    }

    /**
     * Return available categories.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCategories()
    {
        return $this->success($this->observation_categories);
    }

    /**
     * Delete observations.
     * Admin and owner only can delete observations.
     *
     * @param $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id, Request $request)
    {
        $user = $request->user();
        $isAdmin = $user->isAdmin();

        // Make sure the user is deleting a record that they own
        $observation = Observation::where('id', $id)->first();

        if (! $observation) {
            return $this->notFound('The observation you requested was not found.');
        }

        if (!$isAdmin || $observation->user_id != $user->id) {
            return $this->unauthorized();
        }

        // Delete All Images
        foreach ($observation->images as $images) {
            foreach ($images as $image) {
                $image = str_replace('/storage/', 'public/', $image);
                $image = trim($image, '/');
                if (Storage::exists($image)) {
                    Storage::delete($image);
                }
            }
        }

        $observation->delete();

        // Broadcast that an observation has been deleted
        event(new ObservationDeleted());

        return $this->success('Observation has been deleted successfully');
    }
}
