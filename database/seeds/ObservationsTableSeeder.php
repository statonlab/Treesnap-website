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
        // Seed this in a way that creates a leaderboard
        $users = factory(\App\User::class, 10)->create();

        $observations_count = 1000;
        foreach ($users as $user) {
            factory(App\Observation::class, $observations_count)->create([
                'user_id' => $user->id,
            ]);
            //$observations_count += 10;
        }
    }
}
