<?php

use Illuminate\Database\Seeder;

class GroupsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(\App\Group::class, 50)->create();

        // Attach users to groups
        $max = \App\User::count();
        $i = 0;
        foreach (\App\Group::all() as $group) {
            // get 10 users in randem order
            $users = \App\User::where('id', '!=', $group->user_id)->offset($i)->limit(10)->get();
            $group->users()->sync($users);
            $group->users()->attach($group->user_id);

            $i += 10;
            if($i >= $max) {
                $i = 0;
            }
        }
    }
}
