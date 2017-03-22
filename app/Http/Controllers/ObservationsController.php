<?php

namespace App\Http\Controllers;

use App\Observation;
use Illuminate\Http\Request;

class ObservationsController extends Controller
{
    public function index()
    {
        $observations = Observation::all();
        $data = [];

        foreach ($observations as $observation) {
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

        return [
          'data' => $data,
        ];
    }
}
