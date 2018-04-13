<?php

namespace Tests\Feature;

use App\Event;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class EventsAPITest extends TestCase
{
    use DatabaseTransactions;

    /**
     * Test getting events.
     *
     * @test
     */
    public function testGettingLatestEvents()
    {
        $limit = 3;
        factory(Event::class, 10)->create();
        $response = $this->get('/web/events/'.$limit);

        // Verify the status and structure
        $response->assertStatus(200)->assertJsonStructure([
                'data' => [
                    [
                        'id',
                        'title',
                        'start_date',
                        'end_date',
                        'timezone',
                        'location',
                        'description',
                        'link',
                        'formatted_start_date' => [
                            'month',
                            'day',
                            'year',
                            'time'
                        ],
                        'formatted_end_date'
                    ],
                ],
            ]);

        // Verify that limit is respected
        $this->assertCount($limit, $response->json()['data']);
    }
}
