<?php

namespace Tests\Feature;

use App\Observation;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Artisan;

class DuplicateObservationsRemoverTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * Original observation.
     *
     * @var Observation
     */
    protected $observation;

    /**
     * List of duplicates.
     *
     * @var \Illuminate\Database\Eloquent\Collection[Observation]
     */
    protected $duplicates;

    /**
     * Set up tests.
     */
    protected function setUp()
    {
        parent::setUp();

        // Create duplicate observations
        $observation = factory(Observation::class)->create();
        sleep(1);
        $this->duplicates = factory(Observation::class, 10)->create([
            'user_id' => $observation->user_id,
            'observation_category' => $observation->observation_category,
            'data' => $observation->data,
            'mobile_id' => $observation->mobile_id,
            'latitude' => $observation->latitude,
            'longitude' => $observation->longitude,
        ]);

        $this->observation = $observation;
    }

    public function testThatDuplicatesGetRemoved()
    {
        // Assert duplicates exist
        $this->assertGreaterThan(0, Observation::where([
            'mobile_id' => $this->observation->mobile_id,
            'user_id' => $this->observation->user_id,
        ])->count());

        // Run the command and make sure only 1 observation is kept (the latest of the duplicates)
        $exitCode = Artisan::call('observations:flush-duplicates');
        $this->assertEquals(0, $exitCode);

        $ids = [$this->observation->id] + $this->duplicates->pluck('id')->all();
        $observations_count = Observation::whereIn('id', $ids)->count();
        $this->assertEquals(1, $observations_count);
    }
}
