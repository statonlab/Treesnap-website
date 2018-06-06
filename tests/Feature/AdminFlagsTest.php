<?php

namespace Tests\Feature;

use App\Flag;
use App\Notifications\FlagCreatedNotification;
use App\Observation;
use App\Role;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class AdminFlagsTest extends TestCase
{
    use DatabaseTransactions, WithFaker;

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

    /** @test */
    public function testNotificationIsSentWhenFlagIsCreated()
    {
        Notification::fake();

        $user = factory(User::class)->create();
        $observation = factory(Observation::class)->create();

        $this->actingAs($user);

        $response = $this->post('/web/flag', [
            'reason' => $this->faker->sentence,
            'comments' => $this->faker->sentence,
            'observation_id' => $observation->id,
        ]);
        $response->assertSuccessful();

        $users = User::whereHas('subscriptionTopics', function ($query) {
            $query->where('key', 'flags');
        })->get();

        Notification::assertSentTo($users, FlagCreatedNotification::class);
    }
}
