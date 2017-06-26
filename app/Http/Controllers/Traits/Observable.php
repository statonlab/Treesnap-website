<?php

namespace App\Http\Controllers\Traits;

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
        'American Elm',
        'Other',
    ];

    /**
     * Formats the observation record into the expected response.
     *
     * @param  $observation
     * @return array
     */
    protected function getObservationJson($observation, $admin = false)
    {
        // Set Image Urls
        $images = [
            'images' => [],
        ];

        foreach ($observation->images as $key => $list) {
            foreach ($list as $image) {
                $images[$key][] = url($image);
            }
        }

        return [
            'observation_id' => $observation->id,
            'user_id' => $observation->user_id,
            'observation_category' => $observation->observation_category,
            'meta_data' => $observation->data,
            'location' => [
                'longitude' => $admin ? $observation->longitude : $observation->fuzzy_coords['longitude'],
                'latitude' => $admin ? $observation->latitude : $observation->fuzzy_coords['latitude'],
                'accuracy' => $observation->location_accuracy,
                'address' => $admin ? $observation->address : [],
            ],
            'images' => $images,
            'date' => $observation->collection_date,
            'is_private' => $observation->is_private,
            'date_human_diff' => $observation->collection_date->diffForHumans(),
            'mobile_id' => $observation->mobile_id,
            'flags' => isset($observation->flags) ? $observation->flags : [],
            'collections' => isset($observation->collections) ? $observation->collections : [],
            'confirmations' => isset($observation->confirmations) ? $observation->confirmations : [],
        ];
    }
}
