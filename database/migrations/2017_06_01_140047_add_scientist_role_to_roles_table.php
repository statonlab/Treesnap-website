<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddScientistRoleToRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (! \App\Role::where('name', 'Scientist')->first()) {
            \App\Role::create([
                'name' => 'Scientist',
                'is_admin' => false,
            ]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (\App\Role::where('name', 'Scientist')->count() > 1) {
            $role = \App\Role::where('name', 'Scientist')->first();
            $role->delete();
        }
    }
}
