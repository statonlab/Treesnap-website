<?php

namespace Tests\Feature;

use App\Flag;
use App\Observation;
use App\Role;
use App\User;
use Tests\TestCase;

class AdminFlagsTest extends TestCase
{
    /**
     * Test API structure
     */
    public function testFlagsAPIStructure()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'Admin')->first()->id,
        ]);

        $observation = factory(Observation::class)->create();

        factory(Flag::class)->create([
            'observation_id' => $observation->id,
        ]);

        $this->actingAs($user);

        $response = $this->get('/admin/web/flags');

        $response->assertJsonStructure([
            'data' => [
                'next_page_url',
                'prev_page_url',
                'current_page',
                'data' => [
                    [
                        'reason',
                        'observation' => [
                            'id',
                            'observation_category',
                        ],
                        'user' => [
                            'id',
                            'name',
                        ],
                    ],
                ],
            ],
        ]);
    }
}
