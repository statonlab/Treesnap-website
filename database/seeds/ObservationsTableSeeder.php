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
            '/images/am.jpg',
            '/images/ash.jpg',
          ],
          'longitude' => 40.354388,
          'latitude' => -95.998237,
          'location_accuracy' => 60.09932,
          'data' => [
            'comment' => 'Comment on record 1',
          ],
          'is_private' => false,
          'collection_date' => \Carbon\Carbon::now(),
        ]);

        \App\Observation::create([
          'user_id' => \App\User::first()->id,
          'observation_category' => 'White Oak',
          'images' => [
            '/images/hem.jpg',
            '/images/oak.jpg',
          ],
          'longitude' => 40.354388,
          'latitude' => -95.998237,
          'location_accuracy' => 20.50,
          'data' => [
            'comment' => 'Comment on record 2',
          ],
          'is_private' => false,
          'collection_date' => \Carbon\Carbon::now(),
        ]);


        // Another user with a private record
        \App\Observation::create([
          'user_id' => \App\User::orderby('id', 'desc')->first()->id,
          'observation_category' => 'Green Ash',
          'images' => [
            '/images/ash.jpg',
          ],
          'longitude' => 44.354388,
          'latitude' => -93.998237,
          'location_accuracy' => 10,
          'data' => [
            'comment' => 'Comment on record 3',
          ],
          'is_private' => true,
          'collection_date' => \Carbon\Carbon::now(),
        ]);

    }
}
