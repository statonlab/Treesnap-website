<?php

namespace Tests\Feature;

use App\Observation;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class LeaderboardAPITest extends TestCase
{
    use DatabaseTransactions;

    /**
     * Test that the leaderboard index method returns a set of 5 users
     * with observation count and user name if not anonymous.
     *
     * @return void
     */
    public function testLeaderboardIndexReturnsUsers()
    {
        // Set the stage by adding 10 users and giving each
        // a varying number of observations
        $users = factory(User::class, 6)->create();
        $number = 10;
        $users->map(function ($user) use (&$number) {
            factory(Observation::class, $number)->create([
                'user_id' => $user->id,
            ]);
            $number += 10;
        });
        $response = $this->get('/web/leaderboard/5');

        $response->assertJsonStructure([
            'data' => [
                [
                    'name',
                    'observations_count',
                    'thumbnail' => [
                        'src',
                        'alt',
                    ],
                ],
            ],
        ]);

        // Get the data
        $leaders = $response->json()['data'];

        // Assert sorted by observation count in descending order
        $last = null;
        $descending_order = true;
        foreach ($leaders as $leader) {
            if ($last === null) {
                $last = $leader['observations_count'];
            }

            if ($leader['observations_count'] > $last) {
                $descending_order = false;
            }

            $last = $leader['observations_count'];
        }

        $this->assertTrue($descending_order);
    }
}
