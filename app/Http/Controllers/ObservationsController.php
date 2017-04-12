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
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $observations = Observation::with('user')->where('is_private', false)->orderby('collection_date', 'desc')->get();
        $data = [];

        foreach ($observations as $observation) {
            // Compile the data into a standardized response
            // Remove the is_private value from the response
            $data[] = array_merge(array_except($this->getObservationJson($observation), ['is_private']), [
                'user' => [
                    'name' => $observation->user->is_anonymous ? 'Anonymous' : $observation->user->name,
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
        return view('observations.observation')->with(compact('observation', 'id'));
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
            return abort(401);
        }

        if ($request->wantsJson() || $request->ajax()) {
            return $this->success([
                'observation_category' => $observation->observation_category,
                'owner' => $observation->user->is_anonymous ? 'Anonymous' : $observation->user->name,
                'latitude' => (double)number_format($observation->latitude, 5),
                'longitude' => (double)number_format($observation->longitude, 5),
                'location_accuracy' => (int)number_format($observation->location_accuracy, 0),
                'meta_data' => $observation->data,
                'images' => $observation->images,
                'collection_date' => $observation->collection_date->diffForHumans(),
            ]);
        }

        return abort(404);
    }
}
