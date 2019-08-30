<?php

namespace Tests\Feature;

use App\Group;
use App\Observation;
use App\Role;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class GroupPermissionsTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withHeader('Accept', 'application/json');
    }

    public function testMemberCanSeePrivateObservationsIfSharingIsEnabled()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'User')->first()->id,
        ]);
        $otherUser = factory(User::class)->create();
        $group = factory(Group::class)->create();
        $this->actingAs($user);

        $group->users()->attach([$user->id, $otherUser->id], [
            'share' => true,
        ]);

        $observation = factory(Observation::class)->create([
            'is_private' => true,
            'user_id' => $otherUser->id,
        ]);

        $response = $this->get("/web/observation/$observation->id");

        $response->assertStatus(200);
    }

    public function testMemberCannotSeeAccurateObservationDataIfSharingIsDisabled()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'User')->first()->id,
        ]);
        $otherUser = factory(User::class)->create();
        $group = factory(Group::class)->create();
        $this->actingAs($user);

        $group->users()->attach([$user->id, $otherUser->id], [
            'share' => false,
        ]);

        $observation = factory(Observation::class)->create([
            'is_private' => false,
            'user_id' => $otherUser->id,
        ]);

        $response = $this->get("/web/observation/$observation->id");

        $response->assertStatus(200);

        $data = $response->json();
        $location = $data['data']['location'];
        $this->assertNotEquals($location['latitude'], $observation->latitude);
        $this->assertNotEquals($location['longitude'], $observation->longitude);
    }

    public function testUserCannotSeePrivateObservationsIfSharingIsDisabled() {
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'User')->first()->id,
        ]);
        $otherUser = factory(User::class)->create();
        $group = factory(Group::class)->create();
        $this->actingAs($user);

        $group->users()->attach([$user->id, $otherUser->id], [
            'share' => false,
        ]);

        $observation = factory(Observation::class)->create([
            'is_private' => true,
            'user_id' => $otherUser->id,
        ]);

        $response = $this->get("/web/observation/$observation->id");

        $response->assertStatus(401);
    }

    public function testAdminCanSeePrivateGroups()
    {
        $group = factory(Group::class)->create([
            'is_private' => true,
        ]);

        $user = factory(User::class)->create([
            'role_id' => Role::where('is_admin', true)->first()->id,
        ]);

        $this->actingAs($user);

        $response = $this->get('/web/groups/search');

        $response->assertStatus(200);
        $response->assertJsonFragment(['id' => $group->id]);
    }

    public function testUserCannotSeePrivateGroups()
    {
        $group = factory(Group::class)->create([
            'is_private' => true,
        ]);

        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'User')->first()->id,
        ]);

        $this->actingAs($user);

        $response = $this->get('/web/groups/search');

        $response->assertStatus(200);
        $response->assertJsonMissing(['id' => $group->id]);
    }

    public function testLeaderCanPromoteMember()
    {
        $leader = factory(User::class)->create([
            'role_id' => Role::where('name', 'User')->first()->id,
        ]);

        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'User')->first()->id,
        ]);

        $group = factory(Group::class)->create([
            'user_id' => $leader->id
        ]);

        $this->actingAs($leader);

        $response = $this->put("web/group/$group->id/promote", [
            'user_id' => $user->id
        ]);

        $response->assertStatus(200);
        
        // Verify that the leader has been changed
        $group = $group->fresh();
        $this->assertEquals($user->id, $group->user_id);
    }

    public function testNonLeaderCannotPromoteMember()
    {
        $leader = factory(User::class)->create([
            'role_id' => Role::where('name', 'User')->first()->id,
        ]);

        $user1 = factory(User::class)->create([
            'role_id' => Role::where('name', 'User')->first()->id,
        ]);

        $user2 = factory(User::class)->create([
            'role_id' => Role::where('name', 'User')->first()->id,
        ]);

        $group = factory(Group::class)->create([
            'user_id' => $leader->id
        ]);

        $this->actingAs($user1);

        $response = $this->put("web/group/$group->id/promote", [
            'user_id' => $user2->id
        ]);

        $response->assertStatus(401);
    }
}
