<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeysToCollectionObservationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('collection_observation', function (Blueprint $table) {
            $table->integer('observation_id')->unsigned()->change();
            $table->integer('collection_id')->unsigned()->change();

            $table->foreign('observation_id')->references('id')->on('observations')->onDelete('cascade');
            $table->foreign('collection_id')->references('id')->on('collections')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('collection_observation', function (Blueprint $table) {
            $table->dropForeign(['observation_id']);
            $table->dropForeign(['collection_id']);
        });
    }
}
