<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\User;
use App\Observation;

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
        $users = factory(User::class, 10)->create();

        $observations_count = 10;
        foreach ($users as $user) {
            factory(Observation::class, $observations_count)->create([
                'user_id' => $user->id,
            ]);
            //$observations_count += 10;
        }
    }
}
