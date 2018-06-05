<?php

namespace Tests\Feature;

use App\Collection;
use App\Filter;
use App\Observation;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class DownloadsControllerTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * Test that collections are downloadable
     */
    public function testThatCollectionsAreDownloadable()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $observations = factory(Observation::class, 2)->create(['user_id' => $user->id]);
        $collection = factory(Collection::class)->create(['user_id' => $user->id]);

        $collection->observations()->attach($observations);
        $collection->users()->attach($user);

        $response = $this->get("/services/download/collection/$collection->id");
        $response->assertSuccessful();
    }

    /**
     * Test that filters are downloadable.
     */
    public function testThatFiltersAreDownloadable()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        factory(Observation::class, 2)->create([
            'observation_category' => 'American Chestnut',
            'user_id' => $user->id,
        ]);
        $filter = factory(Filter::class)->create(['user_id' => $user->id]);

        $this->assertGreaterThan(0, Filter::apply($filter->rules)->count());

        $response = $this->get("/services/download/filter/$filter->id");
        $response->assertSuccessful();
    }

    /**
     * Test that my observations are downloadable.
     */
    public function testThatMyObservationsAreDownloadable()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);
        factory(Observation::class, 2)->create(['user_id' => $user->id]);

        $response = $this->get("/services/download/observations");
        $response->assertSuccessful();
    }
}
