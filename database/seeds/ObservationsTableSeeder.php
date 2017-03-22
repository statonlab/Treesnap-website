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
            ['path' => '/images/am.jpg'],
            ['path' => '/images/ash.jpg'],
          ],
          'longitude' => 40.354388,
          'latitude' => -95.998237,
          'data' => [
            'comment' => 'Comment on record 1'
          ],
          'collection_date' => \Carbon\Carbon::now()
        ]);

        \App\Observation::create([
          'user_id' => \App\User::first()->id,
          'observation_category' => 'White Oak',
          'images' => [
            ['path' => '/images/hem.jpg'],
            ['path' => '/images/oak.jpg'],
          ],
          'longitude' => 40.354388,
          'latitude' => -95.998237,
          'data' => [
            'comment' => 'Comment on record 2'
          ],
          'collection_date' => \Carbon\Carbon::now()
        ]);

        \App\Observation::create([
          'user_id' => \App\User::first()->id,
          'observation_category' => 'Green Ash',
          'images' => [
            ['path' => '/images/ash.jpg']
          ],
          'longitude' => 44.354388,
          'latitude' => -93.998237,
          'data' => [
            'comment' => 'Comment on record 3'
          ],
          'collection_date' => \Carbon\Carbon::now()
        ]);

    }
}
