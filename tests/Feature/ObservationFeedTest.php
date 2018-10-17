<?php

namespace Tests\Feature;

use App\Observation;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ObservationFeedTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * Test that the getObservationFeed method returns the latest ten observations.
     *
     * @return void
     */
    public function testObservationFeedReturnsLatestTen()
    {
        $observations = factory(Observation::class, 10)->create();
        $response = $this->get('/web/observations/feed');
        $response->assertSuccessful();

        foreach ($response->json()['data'] as $observation) {
            $this->assertTrue($observations->contains('id', $observation['id']));
        }
    }
}
