<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddEasternLarchLatinName extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \App\LatinName::create([
            'genus' => 'Larix',
            'species' => 'laricina',
            'common' => 'Eastern Larch',
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
            'genus' => 'Larix',
            'species' => 'laricina',
            'common' => 'Eastern Larch',
        ])->first();

        if ($latin) {
            $latin->delete();
        }
    }
}
