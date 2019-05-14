<?php

namespace Tests\Feature;

use App\Observation;
use App\User;
use App\Role;
use App\ShareToken;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Illuminate\Support\Str;

class ObservationSharingTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * Test share link returns forbidden for non-owners.
     *
     * @test
     */
    public function testShareLinkFailsForNonOwner()
    {
        $user = factory(User::class)->create();
        $owner = factory(User::class)->create();

        $observation = factory(Observation::class)->create([
            'user_id' => $owner->id,
        ]);

        $this->actingAs($user);

        $response = $this->get('/web/share/observation/' . $observation->id);

        $response->assertStatus(401);
    }

    /**
     * Test share link returns successful for owner.
     *
     * @test
     */
    public function testShareLinkSucceedsForOwner()
    {
        $user = factory(User::class)->create();

        $observation = factory(Observation::class)->create([
            'user_id' => $user->id,
        ]);

        $this->actingAs($user);

        $response = $this->get('/web/share/observation/' . $observation->id);

        $token = ShareToken::where('user_id', $user->id)
            ->where('observation_id', $observation->id)
            ->first();

        $response->assertSee($token->value);
        $response->assertStatus(200);
    }

    /**
     * Test invalid token returns fuzzified location.
     *
     * @test
     */
    public function testInvalidTokenShowsInaccurateLocation()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'User')->first()->id,
        ]);

        $owner = factory(User::class)->create();
        $observation = factory(Observation::class)->create([
            'user_id' => $owner->id,
        ]);

        $this->actingAs($user);

        $response = $this->get("/web/observation/$observation->id");

        $json = $response->json();

        $this->assertEquals($json['data']['location']['longitude'], $observation->fuzzy_coords['longitude']);
        $this->assertEquals($json['data']['location']['latitude'], $observation->fuzzy_coords['latitude']);

        $response->assertStatus(200);
    }

    /**
     * Test valid token returns correct location for non-owners.
     *
     * @test
     */
    public function testValidTokenShowsAccurateLocationToNonOwner()
    {
        $owner = factory(User::class)->create();

        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'User')->first()->id,
        ]);

        $observation = factory(Observation::class)->create([
            'user_id' => $owner->id,
        ]);

        $token_value = Str::random(60);

        $token = factory(ShareToken::class)->create([
            'user_id' => $owner->id,
            'observation_id' => $observation->id,
            'value' => $token_value,
        ]);

        $this->actingAs($user);

        $response = $this->get("/web/observation/$observation->id?token=$token->value");

        $json = $response->json();

        $this->assertEquals($json['data']['location']['longitude'], $observation->longitude);
        $this->assertEquals($json['data']['location']['latitude'], $observation->latitude);

        $response->assertStatus(200);
    }
}
