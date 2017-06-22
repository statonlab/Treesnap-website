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

    $images = [
        '0gzxI58ed05259fdbb.jpeg',
        '1Dz1O58ed050699cbc.jpeg',
        '1PGpE58ed003f2b1de.jpeg',
        '2hnPv58eb95af53fc7.jpeg',
        '2uYTm58f63661f03de.jpeg',
        '40FJY58ee2ffb5a9d9.jpeg',
        '5fcsL58ee2ffb57d1a.jpeg',
        '5hxWy58f635be04a09.jpeg',
        '6LZSE58e518eac8641.jpeg',
        '6NIHZ58ed054f143d9.jpeg',
        '7K4ii58ee2ffb51f6b.jpeg',
        '8IBu558e518afab610.jpeg',
        '9PH3Q58ed048f2a28d.jpeg',
        'BHVbz58ee2ffb1fffc.jpeg',
        'BLrdW58f635b99d73d.jpeg',
        'ClEpS58e5192053bac.jpeg',
        'CsIky58e54968027ee.jpeg',
        'EJoKB58ee2ffb56233.jpeg',
        'FwmZP58ed09611572e.jpeg',
        'Ggf7P58f63661f2426.jpeg',
        'GlYD258ed03154a4f1.jpeg',
        'H5cFQ58eba2b6a7189.jpeg',
        'Idfy858ee2ffb4e08c.jpeg',
        'KD4dU58ed19535a4ba.jpeg',
        'KdESs58e5192053d22.jpeg',
        'M00RU58ed023e44bb8.jpeg',
        'MG54G58ed028e19e71.jpeg',
        'N0gLi58eba2b6a507a.jpeg',
        'Nwb4w58ed0815536d1.jpeg',
        'PDqsR58e518eac520d.jpeg',
        'PRVDD58f635be047ae.jpeg',
        'RPzrp58ee2ffb356a0.jpeg',
        'RdadQ58ed03023b058.jpeg',
        'RlH2N58ee2ffb35a9d.jpeg',
        'Sqhc358e518573f2af.jpeg',
        'ToPaO58ed045de1bb9.jpeg',
        'Ts2Ge58e51725323c8.jpeg',
        'Um5qv58ee2ffb4dd31.jpeg',
        'Un6Zc58e518eac143f.jpeg',
        'VL4Dr58e518afa9b25.jpeg',
        'W4JXn58f635be07997.jpeg',
        'WoHLR58e6625848923.jpeg',
        'XBqn358f636678937c.jpeg',
        'XegSn58f635be0768f.jpeg',
        'YVedL58ed0acc4caec.jpeg',
        'YucvM58e5182549164.jpeg',
        'alXzc58e518eac4605.jpeg',
        'aqEIu58ee2ffb50f97.jpeg',
        'asPfl58ebaca36fbe1.jpeg',
        'cIGZi58eba229abece.jpeg',
        'ckRts58ebd3145b158.jpeg',
        'd04l058ee2ffb1fef0.jpeg',
        'g2XBf58eba229a820a.jpeg',
        'h0WJE58ee2ffb50331.jpeg',
        'isKTb58e518afa796f.jpeg',
        'jEwc058ed063505adc.jpeg',
        'jMaTe58e5180dad004.jpeg',
        'jX65I58f63667871e6.jpeg',
        'jwC1F58e518eac385c.jpeg',
        'nMD2058f635b9a19b8.jpeg',
        'oZcRj58e518eacbcf1.jpeg',
        'qMb7u58e518eac931f.jpeg',
        'ql7Lv58e54968048ea.jpeg',
        'r1nZS58ed08459ef43.jpeg',
        'rQ10758ee2ffb4f4b6.jpeg',
        'rePCY58e518eac5f02.jpeg',
        'vEYMK58e518eac78f8.jpeg',
        'vIGKG58e518eaca186.jpeg',
        'vShGr58ed02a6ce9a1.jpeg',
        'vwoin58e6625846845.jpeg',
        'wzP0R58e518eacafee.jpeg',
        'xLG9I58e518afaa9c1.jpeg',
        'yeqDk58e518eac6bba.jpeg',
    ];

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

    return [
        'user_id' => $users[rand() % count($users)],
        'observation_category' => $c,
        'images' => [
            'images' => ['/storage/images/'.$images[rand() % count($images)]],
        ],
        'latitude' => $faker->latitude(),
        'longitude' => $faker->longitude(),
        'location_accuracy' => 60.09932,
        'data' => [
            'comment' => 'Comment on record '.rand() % 3000,
            'otherLabel' => $otherTrees[rand() % count($otherTrees)],
        ],
        'address' => $Addresses[rand() % count($Addresses)],
        'is_private' => false,
        'collection_date' => \Carbon\Carbon::now(),
    ];
});
