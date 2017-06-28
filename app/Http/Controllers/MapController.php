<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\Observable;
use App\Http\Controllers\Traits\Responds;
use App\Observation;
use Illuminate\Http\Request;

class MapController extends Controller
{
    use Responds, Observable;

    public function index(Request $request)
    {
        $user = $request->user();
        $isAdmin = false;
        if ($user) {
            $isAdmin = $user->isScientist() || $user->isAdmin();
        }

        if ($isAdmin) {
            $observations = Observation::with('user')->get();
        } else {
            $observations = Observation::with('user')->where('is_private', false);
        }

        return $this->success($this->prepForMap($observations, $isAdmin));
    }

    protected function prepForMap($observations, $isAdmin)
    {
        return $observations->map(function ($observation) use ($isAdmin) {
            $flattenedImages = [];
            foreach ($observation->images as $images) {
                foreach ($images as $image) {
                    $flattenedImages[] = $image;
                }
            }

            if (empty($observation->fuzzy_coords)) {
                $observation->fuzzy_coords = $this->fuzifyCoorinates($observation->latitude, $observation->longitude);
            }

            $user = $observation->user;
            $username = $user->is_ananymous && ! $isAdmin ? 'Anonymous' : $user->name;

            $title = $observation->observation_category;
            $title = $title === 'Other' ? "{$title} ({$observation->data['otherLabel']})" : $title;

            return [
                'id' => $observation->id,
                'title' => $title,
                'category' => $observation->observation_category,
                'images' => $flattenedImages,
                'position' => [
                    'latitude' => $isAdmin ? $observation->latitude : $observation->fuzzy_coords['latitude'],
                    'longitude' => $isAdmin ? $observation->longitude : $observation->fuzzy_coords['longitude'],
                    'address' => $isAdmin ? $observation->address : [],
                    'accuracy' => $observation->location_accuracy,
                ],
                'owner' => $username,
                'date' => $observation->collection_date->toDateString(),
                'data' => $observation->data,
                'ref' => null,
            ];
        });
    }
}
