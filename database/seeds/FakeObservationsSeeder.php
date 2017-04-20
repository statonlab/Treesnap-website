<?php

use Illuminate\Database\Seeder;

class FakeObservationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Observation::class, 3000)->create();
    }
}
