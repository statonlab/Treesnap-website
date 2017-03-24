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
        $observations = Observation::with('user')
          ->where('is_private', false)
          ->orderby('collection_date', 'desc')
          ->get();
        $data = [];

        foreach ($observations as $observation) {
            // Compile the data into a standardized response
            // Remove the is_private value from the response
            $data[] = array_merge(array_except($this->getObservationJson($observation), ['is_private']), [
              'user' => [
                'name' => $observation->user->name,
              ],
            ]);
        }

        return $this->success($data);
    }
}
