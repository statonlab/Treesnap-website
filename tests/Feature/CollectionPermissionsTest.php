<?php

namespace Tests\Feature;

use App\Collection;
use App\Observation;
use App\Role;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CollectionPermissionsTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp()
    {
        parent::setUp();

        $this->withHeader('Accept', 'application/json');
    }

    public function testPrivateObservationsInACollectionCannotBeSeen()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'User')->first()->id,
        ]);
        $this->actingAs($user);

        $observations = factory(Observation::class, 2)->create([
            'is_private' => true,
        ]);

        $collection = factory(Collection::class)->create([
            'user_id' => $user->id,
        ]);

        $collection->users()->attach($user);
        $collection->observations()->attach($observations);

        $response = $this->get("/web/collection/{$collection->id}");

        $response->assertStatus(200);

        $data = $response->json()['data'];

        $this->assertEmpty($data['observations']);
    }

    public function testNonPrivateObservationsInACollectionCanBeSeen()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'User')->first()->id,
        ]);
        $this->actingAs($user);

        $observations = factory(Observation::class, 2)->create([
            'is_private' => false,
        ]);

        $collection = factory(Collection::class)->create([
            'user_id' => $user->id,
        ]);

        $collection->users()->attach($user);
        $collection->observations()->attach($observations);

        $response = $this->get("/web/collection/{$collection->id}");

        $response->assertStatus(200);

        $data = $response->json()['data'];

        $this->assertNotEmpty($data['observations']);
    }

    public function testNonOwnerCannotDeleteCollection()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $collection = factory(Collection::class)->create();

        $collection->users()->attach($user->id);

        $response = $this->delete("/web/collection/{$collection->id}");

        $response->assertStatus(401);
    }

    public function testNonOwnerCannotShareCollection()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $otherUser = factory(User::class)->create();

        $collection = factory(Collection::class)->create();

        $collection->users()->attach($user->id);

        $response = $this->post("/web/collection/{$collection->id}/share", [
            'share_category' => 'user',
            'user_id' => $otherUser->id,
            'group_id' => null,
            'can_customize' => 1,
        ]);

        $response->assertStatus(401);
    }

    public function testOwnerCannotShareWithNonGroupMembers()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $otherUser = factory(User::class)->create();

        $collection = factory(Collection::class)->create([
            'user_id' => $user->id,
        ]);

        $collection->users()->attach($user->id);

        $response = $this->post("/web/collection/{$collection->id}/share", [
            'share_category' => 'user',
            'user_id' => $otherUser->id,
            'group_id' => null,
            'can_customize' => 1,
        ]);

        $response->assertStatus(401);
    }
}
