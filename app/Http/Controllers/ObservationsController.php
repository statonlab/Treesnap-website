<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\v1\ResponseTrait;
use App\Http\Controllers\Traits\Observable;
use App\Observation;
use Illuminate\Http\Request;

class ObservationsController extends Controller
{
    use ResponseTrait, Observable;

    /**
     * Get all public observations.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $observations = Observation::where('is_private', false)
          ->orderby('collection_date', 'desc')
          ->get();
        $data = [];

        foreach ($observations as $observation) {
            // Compile the data into a standardized response
            // Remove the is_private value from the response
            $data[] = array_except($this->getObservationJson($observation),
              ['is_private']);
        }

        return $this->success($data);
    }
}
