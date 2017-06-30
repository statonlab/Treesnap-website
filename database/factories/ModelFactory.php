<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Observation::class, function (Faker\Generator $faker) {
    $Addresses = include base_path('database/factories/Addresses.php');

    $images = include base_path('database/factories/ImagePaths.php');

    $categories = [
        'American Chestnut',
        'Ash',
        'Other',
        'White Oak',
        'Hemlock',
        'American Elm',
    ];

    $otherTrees = [
        'Birch',
        'Beech',
        'Eastern red cedar',
        'Sycamore',
        'Big leaf magnolia',
        'Eastern red cedar',
    ];

    $c = $categories[rand() % count($categories)];

    $users = [1, 2];

    $data = [
        'comment' => 'Comment on record '.rand() % 3000,
    ];

    if ($c === 'Other') {
        $data['otherLabel'] = $otherTrees[rand() % count($otherTrees)];
    }

    return [
        'user_id' => $users[rand() % count($users)],
        'observation_category' => $c,
        'images' => [
            'images' => ['/storage/images/'.$images[rand() % count($images)]],
        ],
        'latitude' => $faker->latitude(),
        'longitude' => $faker->longitude(),
        'location_accuracy' => 60.09932,
        'data' => $data,
        'address' => $Addresses[rand() % count($Addresses)],
        'is_private' => false,
        'collection_date' => \Carbon\Carbon::now(),
    ];
});
