<?php
namespace Database\Seeders;
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
        factory(\App\Collection::class, 2)->create();

        foreach (\App\Collection::all() as $collection) {
            $users = \App\User::where('id', $collection->user_id)->get();
            $collection->users()->sync($users);
            $collection->users()->attach($collection->user_id);
        }
    }
}
