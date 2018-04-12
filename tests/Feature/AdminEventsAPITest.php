<?php

namespace Tests\Feature;

use App\Event;
use App\Role;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AdminEventsAPITest extends TestCase
{
    use DatabaseTransactions;

    /**
     * A basic test example.
     *
     * @test
     */
    public function testGettingEventsPage()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::where('is_admin', true)->first()->id,
        ]);
        factory(Event::class, 10)->create();

        $this->actingAs($user);

        $response = $this->get("/admin/web/events");

        $response->assertJsonStructure([
            'data' => [
                'current_page',
                'from',
                'to',
                'last_page',
                'per_page',
                'next_page_url',
                'prev_page_url',
                'total',
                'path',
                'data' => [
                    [
                        'start_date',
                        'end_date',
                        'id',
                        'user_id',
                        'user' => [
                            'id',
                            'name',
                        ],
                        'timezone',
                        'title',
                        'description',
                    ],
                ],
            ],
        ])->assertStatus(200);
    }

    /**
     * Test unauthorized anonymous user access to page.
     *
     * @test
     */
    public function testAnonymousUserAccessToEvents()
    {
        // Should redirect to login
        $this->get('/admin/web/events')->assertStatus(302);
    }

    /**
     * Test unauthorized scientist user access to page.
     *
     * @test
     */
    public function testAuthenticatedScientistAccessToEvents()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'Scientist')->first()->id,
        ]);
        $this->actingAs($user);
        $this->get('/admin/web/events')->assertStatus(401);
    }

    /**
     * Test unauthorized regular user access to page.
     *
     * @test
     */
    public function testAuthenticatedUserAccessToEvents()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::whereNotIn('name', ['Scientist', 'Admin'])->first()->id,
        ]);
        $this->actingAs($user);
        $this->get('/admin/web/events')->assertStatus(401);
    }

    /**
     * Test creating a new event.
     *
     * @test
     */
    public function testCreatingAnEvent()
    {
        $user = factory(User::class)->create([
            'role_id' => Role::where('is_admin', true)->first()->id,
        ]);

        $this->actingAs($user);

        $response = $this->post('/admin/web/events', [
            'title' => 'The title of the event',
            'location' => "8732 Fake St.\nKnoxville, TN 37916",
            'start_date' => '2018-09-12 08:00:00',
            'end_date' => '2018-09-12 08:00:00',
            'timezone' => 'EST',
            'link' => 'https://facebook.com',
            'platform' => 'facebook',
            'description' => 'Some long text about the event goes here.',
        ]);

        $response->assertStatus(201);

        $response->assertJsonStructure([
            'data' => [
                'start_date',
                'end_date',
                'id',
                'user_id',
                'user' => [
                    'id',
                    'name',
                ],
                'timezone',
                'title',
                'description',
            ],
        ]);
    }
}
