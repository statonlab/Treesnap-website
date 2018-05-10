<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddHasPrivateCommentsColumnToObservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @throws \Exception
     * @return void
     */
    public function up()
    {
        Schema::table('observations', function (Blueprint $table) {
            $table->boolean('has_private_comments')->default(false);
        });

        \App\Observation::where('has_private_comments', false)->update([
            'has_private_comments' => true
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('observations', function (Blueprint $table) {
            $table->dropColumn('has_private_comments');
        });
    }
}
