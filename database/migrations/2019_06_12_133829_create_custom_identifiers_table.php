<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCustomIdentifiersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('custom_identifiers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('observation_id');
            $table->string('identifier');
            $table->timestamps();

            $table->foreign('observation_id')
                ->references('id')
                ->on('observations')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('custom_identifiers');
    }
}
