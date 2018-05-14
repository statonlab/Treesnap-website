<?php

namespace Tests\Feature;

use App\Observation;
use App\Services\Analytics\ObservationStatistics;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\User;
use App\Role;

class ObservationStatisticsTest extends TestCase
{
    use DatabaseTransactions;

    public function testObservationCountPerSeasonIsCorrect()
    {
        factory(Observation::class, 10)->create();
        $stats = new ObservationStatistics();

        $data = $stats->aggregateObservationsByMonth();

        $this->assertNotEmpty($data);
    }

    public function testObservationsOverTimeAPI()
    {
        factory(Observation::class, 10)->create();
        // Create an admin user
        $user = factory(User::class)->create([
            'role_id' => Role::where('is_admin', true)->first()->id,
        ]);
        $this->actingAs($user);

        $response = $this->get('/admin/web/analytics/observations-over-time');

        $response->assertSuccessful();
        $response->assertJsonStructure([
            'data' => [
                [
                    'label',
                    'data' => [
                        [
                            'date',
                            'observations_count',
                            'observation_category',
                        ],
                    ],
                ],
            ],
        ]);
    }
}
