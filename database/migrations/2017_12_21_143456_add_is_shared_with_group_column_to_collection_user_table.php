<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddIsSharedWithGroupColumnToCollectionUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('collection_user', function (Blueprint $table) {
            $table->boolean('is_shared_with_group')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('collection_user', function (Blueprint $table) {
            $table->dropColumn('is_shared_with_group');
        });
    }
}
