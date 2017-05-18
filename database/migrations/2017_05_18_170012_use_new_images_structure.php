<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UseNewImagesStructure extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $observations = \App\Observation::all();
        $observations->map(function ($observation) {
            $images = $observation->images;
            $observation->images = [
                'images' => $images,
            ];

            $observation->save();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $observations = \App\Observation::all();
        $observations->map(function ($observation) {
            $images = $observation->images;
            $observation->images = $images['images'];

            $observation->save();
        });
    }
}
