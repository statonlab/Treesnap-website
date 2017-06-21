<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\Responds;
use App\Http\Controllers\Traits\Observable;
use App\Observation;
use Illuminate\Http\Request;

class ObservationsController extends Controller
{
    use Responds, Observable;

    /**
     * Get all public observations.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $is_admin = false;
        $user = $request->user();
        if ($user) {
            $is_admin = $user->isAdmin() || $user->isScientist();
        }

        if ($is_admin) {
            $observations = Observation::with('user')->orderby('collection_date', 'desc')->get();
        } else {
            $observations = Observation::with('user')
                                       ->where('is_private', false)
                                       ->orderby('collection_date', 'desc')
                                       ->get();
        }

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

        $data = [];
        foreach ($observations as $observation) {
            // Compile the data into a standardized response
            // Remove the is_private value from the response
            $user = $observation->user;
            $data[] = array_merge(array_except($this->getObservationJson($observation, $is_admin), ['is_private']), [
                'user' => [
                    'id' => $user->id,
                    'name' => ! $is_admin && $user->is_anonymous ? 'Anonymous' : $user->name,
                ],
            ]);
        }

        return $this->success($data);
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
}
