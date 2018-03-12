<?php

use Illuminate\Database\Seeder;

class ThousandsObservationsSeeder extends Seeder
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
