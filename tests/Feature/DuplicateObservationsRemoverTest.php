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
    protected function setUp(): void
    {
        parent::setUp();

        // Create duplicate observations
        $observation = factory(Observation::class)->create();
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
        $this->assertEquals(11, $this->getDuplicatesCount());

        // Run the command
        $exitCode = Artisan::call('observations:flush-duplicates');
        $this->assertEquals(0, $exitCode);

        // We should have only 1 observation left from the list we created
        $this->assertEquals(1, $this->getDuplicatesCount());
    }

    protected function getDuplicatesCount()
    {
        return Observation::where([
            'mobile_id' => $this->observation->mobile_id,
            'user_id' => $this->observation->user_id,
            'observation_category' => $this->observation->observation_category,
            'latitude' => $this->observation->latitude,
            'longitude' => $this->observation->longitude,
        ])->count();
    }
}
