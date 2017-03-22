<?php

namespace App\Http\Controllers\Api\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ObservationsController extends Controller
{
    public function __construct() {
    }

    public function index(Request $request) {
        $user = $request->user();
        $observations = $user->observations()->all();
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
              'collection_date' => $observation->collection_date,
              ''
            ];
        }
    }
}
