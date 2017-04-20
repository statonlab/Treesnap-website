<?php

namespace App\Http\Controllers\Traits;

use App\Observation;

trait Observable
{
    /**
     * Observation Categories.
     * Currently only names of plants.
     *
     * @var array
     */
    protected $observation_categories = [
        'American Chestnut',
        'Ash',
        'Hemlock',
        'White Oak',
        'Other',
    ];

    /**
     * Formats the observation record into the expected response.
     *
     * @param \App\Observation $observation
     * @return array
     */
    protected function getObservationJson(Observation $observation)
    {
        // Set Image Urls
        $images = [];
        foreach ($observation->images as $image) {
            $images[] = url($image);
        }

        return [
            'observation_id' => $observation->id,
            'user_id' => $observation->user_id,
            'observation_category' => $observation->observation_category,
            'meta_data' => $observation->data,
            'location' => [
                'longitude' => $observation->longitude,
                'latitude' => $observation->latitude,
                'accuracy' => $observation->location_accuracy,
                'address' => $observation->address,
            ],
            'images' => $images,
            'date' => $observation->collection_date,
            'is_private' => $observation->is_private,
            'date_human_diff' => $observation->collection_date->diffForHumans(),
        ];
    }
}
