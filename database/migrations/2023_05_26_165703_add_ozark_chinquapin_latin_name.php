<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddOzarkChinquapinLatinName extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \App\LatinName::create([
            'genus' => 'Castanea',
            'species' => 'ozarkensis',
            'common' => 'Ozark Chinquapin',
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $latin = \App\LatinName::where([
            'genus' => 'Castanea',
            'species' => 'ozarkensis',
            'common' => 'Ozark Chinquapin',
        ])->first();

        if ($latin) {
            $latin->delete();
        }
    }
}
