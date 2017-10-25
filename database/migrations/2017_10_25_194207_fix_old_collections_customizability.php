<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class FixOldCollectionsCustomizability extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \App\Collection::get()->map(function ($collection) {
            DB::table('collection_user')->where([
                    'collection_id' => $collection->id,
                    'user_id' => $collection->user_id,
                ])->update([
                    'can_customize' => 1,
                ]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        \App\Collection::get()->map(function ($collection) {
            DB::table('collection_user')->where([
                'collection_id' => $collection->id,
                'user_id' => $collection->user_id,
            ])->update([
                'can_customize' => 0,
            ]);
        });
    }
}
