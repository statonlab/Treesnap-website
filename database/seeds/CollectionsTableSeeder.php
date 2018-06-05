<?php

use Illuminate\Database\Seeder;

class CollectionsTableSeeder extends Seeder
{
    /**
     * Run the Collections seeder.
     *
     * @return void
     */
    public function run()
    {
        factory(\App\Collection::class, 10)->create();

        // Attach random users to the collection
        $max = \App\User::count();
        $i = 0;
        foreach (\App\Collection::all() as $collection) {
            $users = \App\User::where('id', $collection->user_id)->offset($i)->limit(10)->get();
            $collection->users()->sync($users);
            $collection->users()->attach($collection->user_id);

            $i += 10;
            if($i >= $max) {
                $i = 0;
            }
        }
    }
}
