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

        $observations_count = 10;
        
        factory(Observation::class, $observations_count)->create();
    }
}
