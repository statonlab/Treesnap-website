<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\v1\ResponseTrait;
use App\Observation;
use Illuminate\Http\Request;

class ObservationsController extends Controller
{
    use ResponseTrait;

    public function index()
    {
        $observations = Observation::all();
        $data = [];

        foreach ($observations as $observation) {
            // Skip private observations
            if ($observation->is_private) {
                continue;
            }

            // Compile the data into a standardized response
            $data[] = [
              'id' => $observation->id,
              'observation_category' => $observation->observation_category,
              'meta_data' => $observation->data,
              'location' => [
                'longitude' => $observation->longitude,
                'latitude' => $observation->latitude,
              ],
              'images' => $observation->images,
              'date' => $observation->collection_date,
              'data' => $observation->data,
            ];
        }

        return $this->success($data);
    }
}
