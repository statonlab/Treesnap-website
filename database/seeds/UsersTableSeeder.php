<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\User::create([
          'name' => 'Abdullah Almsaeed',
          'email' => 'almasaeed2010@gmail.com',
          'password' => bcrypt('testpass'),
          'api_token' => str_random(60),
            'birth_year'=> 1974
        ]);

        \App\User::create([
          'name' => 'Bradford Condon',
          'email' => 'bradford.condon@uky.edu',
          'password' => bcrypt('testpass'),
          'api_token' => str_random(60),
            'birth_year' => 1984
        ]);
    }
}
