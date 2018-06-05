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
        'email' => $faker->email,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
        'api_token' => str_random(60),
        'role_id' => \App\Role::inRandomOrder()->first()->id,
        'birth_year' => $faker->year(1997),
        'is_anonymous' => $faker->boolean,
    ];
});

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Observation::class, function (Faker\Generator $faker) {
    static $addresses;
    static $image;
    static $thumbnail;

    if (! $addresses) {
        $addresses = include base_path('database/factories/Addresses.php');
    }

    if (! $image) {
        if (! file_exists(storage_path('app/public/images'))) {
            mkdir(storage_path('app/public/images'));
        }
        $image = copy(storage_path('app/faker/flower.jpg'), storage_path('app/public/images/flower.jpg'));
        $image = 'flower.jpg';
    }

    if (! $thumbnail) {
        if (! file_exists(storage_path('app/public/thumbnails'))) {
            mkdir(storage_path('app/public/thumbnails'));
        }
        $thumbnail = copy(storage_path('app/faker/autumn.jpg'), storage_path('app/public/thumbnails/autumn.jpg'));
        $thumbnail = 'autumn.jpg';
    }

    $categories = [
        'American Chestnut',
        'Ash',
        'Other',
        'White Oak',
        'Hemlock',
        'American Elm',
        'Florida Torreya',
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

    $data = [
        'comment' => 'Comment on record '.rand() % 3000,
    ];

    if ($c === 'Other') {
        $data['otherLabel'] = $otherTrees[rand() % count($otherTrees)];
    }

    $user = factory(\App\User::class)->create();

    return [
        'user_id' => $user->id,
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
        'has_private_comments' => $faker->randomElement([true, false]),
    ];
});

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Group::class, function (Faker\Generator $faker) {
    $is_private = [true, false];

    return [
        'name' => $faker->company,
        'user_id' => \App\User::inRandomOrder()->first()->id,
        'is_private' => $is_private[rand() % 2],
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

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(\App\Event::class, function (Faker\Generator $faker) {
    return [
        'title' => str_replace('.', '', ucwords($faker->sentence)),
        'user_id' => factory(\App\User::class)->create()->id,
        'start_date' => \Carbon\Carbon::now(),
        'end_date' => \Carbon\Carbon::now()->addDays(3),
        'link' => $faker->url,
        'platform' => 'facebook',
        'description' => $faker->text,
        'location' => $faker->address,
        'timezone' => 'EST',
    ];
});

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(\App\Filter::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'user_id' => factory(\App\User::class)->create()->id,
        'notify_user' => $faker->boolean,
        'rules' => json_decode('{"ash": [], "map": false, "name": "Test2", "address": {"city": null, "state": null, "county": null}, "hemlock": [], "whiteOak": [], "categories": ["American Chestnut"], "americanElm": [], "americanChestnut": []}'),
    ];
});
