<?php

use Illuminate\Database\Seeder;

class ObservationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Observation::create([
            'user_id' => \App\User::first()->id,
            'observation_category' => 'American Chestnut',
            'images' => [
                'images' => [
                    '/images/am.jpg',
                    '/images/ash.jpg',
                ],
            ],
            'latitude' => 40.354388,
            'longitude' => -95.998237,
            'location_accuracy' => 60.09932,
            'fuzzy_coords' => $this->fuzzify(40.354388, -95.998237),
            'data' => [
                'comment' => 'Comment on record 1',
            ],
            'is_private' => false,
            'collection_date' => \Carbon\Carbon::now(),
            'mobile_id' => 1
        ]);

        \App\Observation::create([
            'user_id' => \App\User::first()->id,
            'observation_category' => 'White Oak',
            'images' => [
                'images' => [
                    '/images/hem.jpg',
                    '/images/oak.jpg',
                ],
            ],
            'latitude' => 40.354388,
            'longitude' => -90.998237,
            'location_accuracy' => 20.50,
            'fuzzy_coords' => $this->fuzzify(40.354388, -90.998237),
            'data' => [
                'comment' => 'Comment on record 2',
            ],
            'is_private' => false,
            'collection_date' => \Carbon\Carbon::now(),
            'mobile_id' => 2
        ]);

        // Another user with a private record
        \App\Observation::create([
            'user_id' => \App\User::orderby('id', 'desc')->first()->id,
            'observation_category' => 'Ash',
            'images' => [
                'images' => ['/images/ash.jpg'],
            ],
            'latitude' => 44.354388,
            'longitude' => -93.998237,
            'location_accuracy' => 10,
            'data' => [
                'comment' => 'Comment on record 3',
            ],
            'fuzzy_coords' => $this->fuzzify(44.354388, -93.998237),
            'is_private' => true,
            'collection_date' => \Carbon\Carbon::now(),
            'mobile_id' => 3
        ]);
    }

    /**
     * Generate fuzzified coordinates.
     *
     * @param $lat
     * @param $lng
     * @return array
     */
    private function fuzzify($lat, $lng) {
        $miles = 5;
        $range = $miles / 69;
        $latitude = $lat + mt_rand($range * (-1), $range);
        $longitude = $lng + mt_rand($range * (-1), $range);
        return [
            'latitude' => $latitude,
            'longitude' => $longitude,
        ];
    }
}
