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
        'api_token' => str_random(60),
        'role_id' => \App\Role::inRandomOrder()->first()->id,
        'birth_year' => $faker->year(1997),
    ];
});

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Observation::class, function (Faker\Generator $faker) {
    $addresses = include base_path('database/factories/Addresses.php');

    $images = glob(storage_path('app/public/images/').'*.jpeg');
    $thumbnails = glob(storage_path('app/public/thumbnails/').'*.jpeg');

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

    $users = \App\User::all()->map(function ($user) {
        return $user->id;
    })->toArray();

    $data = [
        'comment' => 'Comment on record '.rand() % 3000,
    ];

    if ($c === 'Other') {
        $data['otherLabel'] = $otherTrees[rand() % count($otherTrees)];
    }

    $thumbnail = $thumbnails[rand() % count($thumbnails)];
    $thumbnail = explode('/', $thumbnail);
    $thumbnail = $thumbnail[count($thumbnail) - 1];

    $image = $images[rand() % count($images)];
    $image = explode('/', $image);
    $image = $image[count($image) - 1];

    return [
        'user_id' => $users[rand() % count($users)],
        'observation_category' => $c,
        'images' => [
            'images' => ['/storage/images/'.$image],
        ],
        'latitude' => $faker->latitude(),
        'longitude' => $faker->longitude(),
        'location_accuracy' => 60.09932,
        'data' => $data,
        'address' => $addresses[rand() % count($addresses)],
        'is_private' => false,
        'collection_date' => \Carbon\Carbon::now(),
        'thumbnail' => '/storage/thumbnails/'.$thumbnail,
    ];
});

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Group::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->company,
        'user_id' => \App\User::inRandomOrder()->first()->id,
    ];
});

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Collection::class, function (Faker\Generator $faker) {
    return [
        'label' => $faker->city,
        'user_id' => \App\User::inRandomOrder()->first()->id,
        'description' => $faker->realText(),
    ];
});