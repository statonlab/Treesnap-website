<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Role::create([
            'name' => 'User',
            'is_admin' => false,
        ]);

        \App\Role::create([
            'name' => 'Admin',
            'is_admin' => true,
        ]);

        if (! \App\Role::where('name', 'Scientist')->first()) {
            \App\Role::create([
                'name' => 'Scientist',
                'is_admin' => false,
            ]);
        }
    }
}
