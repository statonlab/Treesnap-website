<?php

namespace Tests\Feature;

use App\Http\Controllers\Traits\Observes;
use App\Observation;
use App\Role;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class ObservationPermissionsTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withHeader('Accept', 'application/json');
    }

    /** @test */
    public function testPrivateObservationGuestAccess()
    {
        $observation = factory(Observation::class)->create([
            'is_private' => true,
        ]);

        $response = $this->get("/observation/$observation->id");

        $response->assertStatus(403);
    }

    /** @test */
    public function testPrivateObservationLoggedInAccess()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'User')->first()->id,
        ]);
        $this->actingAs($user);
        $observation = factory(Observation::class)->create([
            'is_private' => true,
        ]);

        $response = $this->get("/observation/$observation->id");

        $response->assertStatus(403);
    }

    /** @test */
    public function testPrivateObservationAdminAccess()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'Admin')->first()->id,
        ]);
        $this->actingAs($user);
        $observation = factory(Observation::class)->create([
            'is_private' => true,
        ]);

        $response = $this->get("/observation/$observation->id");

        $response->assertStatus(200);
    }

    /** @test */
    public function testPrivateObservationScientistAccess()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'Admin')->first()->id,
        ]);
        $this->actingAs($user);
        $observation = factory(Observation::class)->create([
            'is_private' => true,
        ]);

        $response = $this->get("/observation/$observation->id");

        $response->assertStatus(200);
    }

    /** @test */
    public function testPrivateObservationAPIGuestAccess()
    {
        $observation = factory(Observation::class)->create([
            'is_private' => true,
        ]);

        $response = $this->get("/web/observation/$observation->id");

        $response->assertStatus(401);
    }

    /** @test */
    public function testPrivateObservationAPILoggedInAccess()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'User')->first()->id,
        ]);
        $this->actingAs($user);
        $observation = factory(Observation::class)->create([
            'is_private' => true,
        ]);

        $response = $this->get("/web/observation/$observation->id");

        $response->assertStatus(401);
    }

    /** @test */
    public function testPrivateObservationAPIAdminAccess()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'Admin')->first()->id,
        ]);
        $this->actingAs($user);
        $observation = factory(Observation::class)->create([
            'is_private' => true,
        ]);

        $response = $this->get("/web/observation/$observation->id");

        $response->assertStatus(200);
    }

    /** @test */
    public function testPrivateObservationAPIScientistAccess()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'Admin')->first()->id,
        ]);
        $this->actingAs($user);
        $observation = factory(Observation::class)->create([
            'is_private' => true,
        ]);

        $response = $this->get("/web/observation/$observation->id");

        $response->assertStatus(200);
    }

    /** @test */
    public function testGuestDoesntSeeAccurateLocation()
    {
        $observation = factory(Observation::class)->create([
            'is_private' => false,
        ]);

        $response = $this->get("/web/observation/$observation->id");

        $response->assertStatus(200);

        $data = $response->json()['data'];
        $location = $data['location'];

        $this->assertNotEquals($observation->latitude, $location['latitude']);
        $this->assertNotEquals($observation->longitude, $location['longitude']);
        $this->assertEquals($observation->fuzzy_coords['latitude'], $location['latitude']);
        $this->assertEquals($observation->fuzzy_coords['longitude'], $location['longitude']);
        $this->assertEmpty($location['address']);
    }

    /** @test */
    public function testLoggedInUserDoesntSeeAccurateData()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'User')->first()->id,
        ]);
        $this->actingAs($user);
        $observation = factory(Observation::class)->create([
            'is_private' => false,
            'has_private_comments' => true,
        ]);

        $response = $this->get("/web/observation/$observation->id");

        $response->assertStatus(200);
        $data = $response->json()['data'];
        $location = $data['location'];

        $this->assertNotEquals($observation->latitude, $location['latitude']);
        $this->assertNotEquals($observation->longitude, $location['longitude']);
        $this->assertEquals($observation->fuzzy_coords['latitude'], $location['latitude']);
        $this->assertEquals($observation->fuzzy_coords['longitude'], $location['longitude']);
        $this->assertEmpty($location['address']);
        $this->assertTrue(! isset($data['meta_data']['comment']), 'Guests should not see private comments.');
    }

    /** @test */
    public function testOwnerSeesAccurateData()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'User')->first()->id,
        ]);
        $this->actingAs($user);
        $observation = factory(Observation::class)->create([
            'user_id' => $user->id,
            'is_private' => false,
            'has_private_comments' => true,
        ]);

        $response = $this->get("/web/observation/$observation->id");

        $response->assertStatus(200);
        $data = $response->json()['data'];
        $location = $data['location'];

        $this->assertEquals($observation->latitude, $location['latitude']);
        $this->assertEquals($observation->longitude, $location['longitude']);
        $this->assertNotEmpty($location['address']);
        $this->assertTrue(isset($data['meta_data']['comment']), 'Owner should be able to see his private comments');
    }

    /** @test */
    public function testAdminSeesAccurateData()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'Admin')->first()->id,
        ]);
        $this->actingAs($user);
        $observation = factory(Observation::class)->create([
            'is_private' => true,
            'has_private_comments' => true,
        ]);

        $response = $this->get("/web/observation/$observation->id");

        $response->assertStatus(200);
        $data = $response->json()['data'];
        $location = $data['location'];

        $this->assertEquals($observation->latitude, $location['latitude']);
        $this->assertEquals($observation->longitude, $location['longitude']);
        $this->assertNotEmpty($location['address']);
        $this->assertTrue(! isset($data['meta_data']['comment']),
            'Admins should not see private comments of other users.');
    }

    /** @test */
    public function testScientistSeesAccurateData()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'Scientist')->first()->id,
        ]);
        $this->actingAs($user);
        $observation = factory(Observation::class)->create([
            'has_private_comments' => true,
            'is_private' => true,
        ]);

        $response = $this->get("/web/observation/$observation->id");

        $response->assertStatus(200);
        $data = $response->json()['data'];
        $location = $data['location'];

        $this->assertEquals($observation->latitude, $location['latitude']);
        $this->assertEquals($observation->longitude, $location['longitude']);
        $this->assertNotEmpty($location['address']);
        $this->assertTrue(! isset($data['meta_data']['comment']),
            'Scientists should not see private comments of other users.');
    }
}
