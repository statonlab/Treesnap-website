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
      'Green Ash',
      'Hemlock',
      'White Oak',
    ];

    protected function getObservationJson(Observation $observation)
    {
        return [
          'id' => $observation->id,
          'observation_category' => $observation->observation_category,
          'meta_data' => $observation->data,
          'location' => [
            'longitude' => $observation->longitude,
            'latitude' => $observation->latitude,
            'accuracy' => $observation->location_accuracy,
          ],
          'images' => $observation->images,
          'date' => $observation->collection_date,
          'meta_data' => $observation->data,
          'is_private' => $observation->is_private,
          'collection_date' => $observation->collection_date,
        ];
    }
}