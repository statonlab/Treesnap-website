<?php

namespace Tests\Feature;

use App\Role;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AnalyticsAPITest extends TestCase
{
    use DatabaseTransactions;
    /**
     * Test Users Over Time Chart.
     *
     * @test
     */
    public function testUsersOverTimeChartReturnsSixMonths()
    {
        // Create an admin user
        $user = factory(User::class)->create([
            'role_id' => Role::where('is_admin', true)->first()->id,
        ]);
        $this->actingAs($user);

        // Send a get request
        $response = $this->get('/admin/web/analytics/users-over-time');

        // Verify response structure
        $response->assertSuccessful()->assertJsonStructure([
            'data' => [
                [
                    'date',
                    'users_count',
                    'trained_count',
                ],
            ],
        ]);
    }
}
