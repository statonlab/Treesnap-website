<?php

namespace Tests\Feature;

use App\Role;
use App\SubscriptionTopic;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class AdminNotificationsTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * Test index page.
     */
    public function testNotificationsIndexPage()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'Admin')->first()->id,
        ]);

        $topics = factory(SubscriptionTopic::class, 2)->create();
        $user->subscriptionTopics()->sync($topics);
        $this->actingAs($user);

        $response = $this->get('/admin/web/notifications');
        $response->assertSuccessful()->assertJsonStructure([
            'data' => [
                'users',
                'topics' => [
                    [
                        'description',
                    ],
                ],
            ],
        ]);
    }

    /** @test */
    public function testToggleNotifications()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'Admin')->first()->id,
        ]);

        $topics = factory(SubscriptionTopic::class, 2)->create();
        $user->subscriptionTopics()->sync($topics);
        $this->actingAs($user);

        $response = $this->post('/admin/web/notifications/toggle', [
            'user_id' => $user->id,
            'topic_id' => $topics[0]->id,
        ]);

        $response->assertSuccessful()->assertJsonStructure([
            'data' => [
                'users',
                'topics' => [
                    [
                        'description',
                    ],
                ],
            ],
        ]);

        $this->assertTrue($user->subscriptionTopics()->where('subscription_topics.id', $topics[0]->id)->count() === 0);
    }
}
