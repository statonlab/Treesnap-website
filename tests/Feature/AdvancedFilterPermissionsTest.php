<?php

namespace Tests\Feature;

use App\Filter;
use App\Observation;
use App\Role;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;

class AdvancedFilterPermissionsTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withHeader('Accept', 'application/json');
    }

    public function testThatAppliedFiltersDoNotIncludePrivateObservationsForNonOwners()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'User')->first()->id,
        ]);
        $this->actingAs($user);

        /** @var \Illuminate\Database\Eloquent\Collection $observations */
        $observations = factory(Observation::class, 5)->create([
            'is_private' => true,
        ]);
        $categories = $observations->map(function ($o) {
            return $o->observation_category;
        })->unique();
        $ids = $observations->map(function ($o) {
            return $o->id;
        });

        $filter = factory(Filter::class)->create([
            'user_id' => $user->id,
            'rules' => [
                'categories' => $categories,
            ],
        ]);

        $response = $this->get("/web/filter/{$filter->id}");
        $response->assertStatus(200);

        $data = collect($response->json()['data']['observations']);
        $this->assertEmpty($data->whereIn('observation_id', $ids));
    }

    public function testThatAppliedFiltersDoIncludePrivateObservationsForOwners()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'User')->first()->id,
        ]);
        $this->actingAs($user);

        /** @var \Illuminate\Database\Eloquent\Collection $observations */
        $observations = factory(Observation::class, 5)->create([
            'is_private' => true,
            'user_id' => $user->id,
        ]);
        $categories = $observations->map(function ($o) {
            return $o->observation_category;
        })->unique();
        $ids = $observations->map(function ($o) {
            return $o->id;
        });

        $filter = factory(Filter::class)->create([
            'user_id' => $user->id,
            'rules' => [
                'categories' => $categories,
            ],
        ]);

        $response = $this->get("/web/filter/{$filter->id}");
        $response->assertStatus(200);

        $data = collect($response->json()['data']['observations']);
        $this->assertEquals(5, $data->whereIn('observation_id', $ids)->count());
    }

    public function testThatAppliedFiltersDoNotIncludeAccurateDataForNonOwners()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'User')->first()->id,
        ]);
        $this->actingAs($user);

        /** @var \Illuminate\Database\Eloquent\Collection $observations */
        $observations = factory(Observation::class, 5)->create([
            'is_private' => false,
        ]);
        $categories = $observations->map(function ($o) {
            return $o->observation_category;
        })->unique();
        $ids = $observations->map(function ($o) {
            return $o->id;
        });

        $filter = factory(Filter::class)->create([
            'user_id' => $user->id,
            'rules' => [
                'categories' => $categories,
            ],
        ]);

        $response = $this->get("/web/filter/{$filter->id}");
        $response->assertStatus(200);

        $data = collect($response->json()['data']['observations'])->whereIn('observation_id', $ids);
        $observation = $data->first();
        $original = $observations->where('id', $observation['observation_id'])->first();
        $this->assertNotEquals($observation['location']['latitude'], $original->latitude);
        $this->assertNotEquals($observation['location']['longitude'], $original->longitude);
        $this->assertEmpty($observation['location']['address']);
    }

    public function testThatAppliedFiltersIncludeAccurateDataForOwners()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'User')->first()->id,
        ]);
        $this->actingAs($user);

        /** @var \Illuminate\Database\Eloquent\Collection $observations */
        $observations = factory(Observation::class, 5)->create([
            'user_id' => $user->id,
            'is_private' => false,
        ]);
        $categories = $observations->map(function ($o) {
            return $o->observation_category;
        })->unique();
        $ids = $observations->map(function ($o) {
            return $o->id;
        });

        $filter = factory(Filter::class)->create([
            'user_id' => $user->id,
            'rules' => [
                'categories' => $categories,
            ],
        ]);

        $response = $this->get("/web/filter/{$filter->id}");
        $response->assertStatus(200);

        $data = collect($response->json()['data']['observations'])->whereIn('observation_id', $ids);
        $observation = $data->first();
        $original = $observations->where('id', $observation['observation_id'])->first();
        $this->assertEquals($observation['location']['latitude'], $original->latitude);
        $this->assertEquals($observation['location']['longitude'], $original->longitude);
        $this->assertNotEmpty($observation['location']['address']);
    }

    public function testThatAppliedFiltersIncludeAccurateDataForAdmins()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'Admin')->first()->id,
        ]);
        $this->actingAs($user);

        /** @var \Illuminate\Database\Eloquent\Collection $observations */
        $observations = factory(Observation::class, 5)->create([
            'is_private' => false,
        ]);
        $categories = $observations->map(function ($o) {
            return $o->observation_category;
        })->unique();
        $ids = $observations->map(function ($o) {
            return $o->id;
        });

        $filter = factory(Filter::class)->create([
            'user_id' => $user->id,
            'rules' => [
                'categories' => $categories,
            ],
        ]);

        $response = $this->get("/web/filter/{$filter->id}");
        $response->assertStatus(200);

        $data = collect($response->json()['data']['observations'])->whereIn('observation_id', $ids);
        $observation = $data->first();
        $original = $observations->where('id', $observation['observation_id'])->first();
        $this->assertEquals($observation['location']['latitude'], $original->latitude);
        $this->assertEquals($observation['location']['longitude'], $original->longitude);
        $this->assertNotEmpty($observation['location']['address']);
    }

    public function testThatAppliedFiltersIncludeAccurateDataForScientists()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'Scientist')->first()->id,
        ]);
        $this->actingAs($user);

        /** @var \Illuminate\Database\Eloquent\Collection $observations */
        $observations = factory(Observation::class, 5)->create([
            'is_private' => false,
        ]);
        $categories = $observations->map(function ($o) {
            return $o->observation_category;
        })->unique();
        $ids = $observations->map(function ($o) {
            return $o->id;
        });

        $filter = factory(Filter::class)->create([
            'user_id' => $user->id,
            'rules' => [
                'categories' => $categories,
            ],
        ]);

        $response = $this->get("/web/filter/{$filter->id}");
        $response->assertStatus(200);

        $data = collect($response->json()['data']['observations'])->whereIn('observation_id', $ids);
        $observation = $data->first();
        $original = $observations->where('id', $observation['observation_id'])->first();
        $this->assertEquals($observation['location']['latitude'], $original->latitude);
        $this->assertEquals($observation['location']['longitude'], $original->longitude);
        $this->assertNotEmpty($observation['location']['address']);
    }
}
