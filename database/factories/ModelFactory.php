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

if (! function_exists('fuzifyCoorinates')) {
    function fuzifyCoorinates($original_latitude, $original_longitude)
    {
        // Generate fuzzified coordinates.  Transform by 10,000 to ensure mt_rand is working on integers
        $miles = 5;

        // 72.4637681159 = 1000 / 69 miles per lat/2 for radius
        $range = $miles * 72.4637681159;
        $latitude = $original_latitude * 10000 + mt_rand($range * (-1), $range);
        $longitude = $original_longitude * 10000 + mt_rand($range * (-1), $range);

        return [
            'latitude' => $latitude / 10000,
            'longitude' => $longitude / 10000,
        ];
    }
}

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;

    $email = explode('@', $faker->email);

    return [
        'name' => $faker->name,
        'email' => $email[0].uniqid().'@'.$email[1],
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

    $numericValue = random_int(0, 1000);
    $converter = new \App\Services\UnitsConverter();
    $data = [
        'comment' => 'Comment on record '.rand() % 3000,
        'diameterNumeric' => $numericValue,
        'diameterNumeric_units' => 'Inches',
        'diameterNumeric_values' => [
            'US_value' => $numericValue,
            'US_unit' => 'Inches',
            'metric_value' => $converter->inchesToCentimeters($numericValue),
            'metric_unit' => 'cm',
        ],
        'heightFirstBranch' => $numericValue * 2,
        'heightFirstBranch_units' => 'Feet',
        'heightFirstBranch_values' => [
            'US_value' => $numericValue * 2,
            'US_unit' => 'Feet',
            'metric_value' => $converter->feetToMeters($numericValue * 2),
            'metric_unit' => 'Meters',
        ],
        'heightNumeric' => $numericValue * 3,
        'heightNumeric_units' => 'Feet',
        'heightNumeric_values' => [
            'US_value' => $numericValue * 3,
            'US_unit' => 'Feet',
            'metric_value' => $converter->feetToMeters($numericValue * 3),
            'metric_unit' => 'Meters',
        ],
    ];

    if ($c === 'Other') {
        $data['otherLabel'] = $otherTrees[rand() % count($otherTrees)];
    }

    $user = factory(\App\User::class)->create();
    $location = [
        'lat' => $faker->latitude,
        'lng' => $faker->longitude,
    ];
    $fuzzy = fuzifyCoorinates($location['lat'], $location['lng']);

    return [
        'user_id' => $user->id,
        'observation_category' => $c,
        'images' => [
            'images' => ['/storage/images/'.$image],
        ],
        'latitude' => $location['lat'],
        'longitude' => $location['lng'],
        'fuzzy_coords' => $fuzzy,
        'location_accuracy' => $faker->randomFloat(2, 5, 100),
        'data' => $data,
        'address' => $addresses[rand() % count($addresses)],
        'is_private' => false,
        'collection_date' => \Carbon\Carbon::now(),
        'thumbnail' => '/storage/thumbnails/'.$thumbnail,
        'has_private_comments' => $faker->randomElement([true, false]),
        'mobile_id' => random_int(10000000, 99999999),
        'custom_id' => rand() % 2 === 0 ? uniqid() : null,
    ];
});

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Group::class, function (Faker\Generator $faker) {
    $is_private = [true, false];

    $user = factory(\App\User::class)->create();

    return [
        'name' => $faker->company,
        'user_id' => $user->id,
        'is_private' => $is_private[rand() % 2],
    ];
});

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Collection::class, function (Faker\Generator $faker) {
    $user = factory(\App\User::class)->create();
    return [
        'label' => $faker->city,
        'user_id' => $user->id,
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
        'notify_user' => false,
        'rules' => json_decode('{"ash": [], "map": false, "name": "Test2", "address": {"city": null, "state": null, "county": null}, "hemlock": [], "whiteOak": [], "categories": ["American Chestnut"], "americanElm": [], "americanChestnut": []}'),
        'notifications_sent_at' => null,
    ];
});

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(\App\Flag::class, function (Faker\Generator $faker) {
    return [
        'observation_id' => factory(\App\Observation::class)->create()->id,
        'user_id' => factory(\App\User::class)->create()->id,
        'reason' => $faker->randomElement([
            'This tree is the wrong species',
            'This tree is on my private land and I would like it removed',
            'This submission is spam',
            'This submission is inappropriate',
            'Other',
        ]),
        'comments' => $faker->sentence,
    ];
});

$factory->define(\App\ShareToken::class, function (Faker\Generator $faker) {
    return [
        'user_id' => factory(\App\User::class)->create()->id,
        'observation_id' => factory(\App\Observation::class)->create()->id,
        'value' => str_random(60),
        'expired_at' => \Carbon\Carbon::now()->addYear(),
    ];
});

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(\App\SubscriptionTopic::class, function (Faker\Generator $faker) {
    return [
        'description' => $faker->sentence,
    ];
});

$factory->define(\App\DownloadStatistic::class, function (Faker\Generator $faker) {
    return [
        'user_id' => factory(\App\User::class)->create()->id,
        'observations_count' => $faker->numberBetween(10, 5000),
    ];
});
