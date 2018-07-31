<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AssignTorreyaLatinName extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $latin = \App\LatinName::where('common', 'Florida Torreya')->first();
        if (! $latin) {
            echo "Latin name for torreya not found";

            return;
        }

        \App\Observation::where('observation_category', 'Florida Torreya')->update([
            'latin_name_id' => $latin->id,
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $latin = \App\LatinName::where('common', 'Unknown')->first();
        if (! $latin) {
            echo "Unknown in latin names table is not found.";

            return;
        }

        \App\Observation::where('observation_category', 'Florida Torreya')->update([
            'latin_name_id' => $latin->id,
        ]);
    }
}
