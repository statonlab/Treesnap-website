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
          'is_over_thirteen' => true,
          'api_token' => str_random(60),
        ]);

        \App\User::create([
          'name' => 'Bradford Condon',
          'email' => 'bradford.condon@uky.edu',
          'password' => bcrypt('testpass'),
          'is_over_thirteen' => true,
          'api_token' => str_random(60),
        ]);
    }
}
