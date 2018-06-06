<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddObservationIdForeignKeyToFlagsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // First clean up flags that have deleted observations
        $flags = \App\Flag::with('observation')->get();
        foreach ($flags as $flag) {
            if ($flag->observation === null) {
                $flag->delete();
            }
        }

        Schema::table('flags', function (Blueprint $table) {
            $table->unsignedInteger('observation_id')->change();
            $table->unsignedInteger('observation_id')->change();
        });

        Schema::table('flags', function(Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('observation_id')->references('id')->on('observations')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('flags', function (Blueprint $table) {
            $table->dropForeign('user_id');
            $table->dropForeign('observation_id');

            $table->integer('observation_id')->change();
            $table->integer('observation_id')->change();
        });
    }
}
