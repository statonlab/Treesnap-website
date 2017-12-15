<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddLatinNameColumnToObservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table(
            'observations',
            function (Blueprint $table) {
                $table->unsignedInteger('latin_name_id')->default(1);
            }
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table(
            'observations',
            function (Blueprint $table) {
                $table->dropColumn('latin_name_id');
            }
        );
    }
}
