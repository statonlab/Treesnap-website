<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class UsersAPITest extends TestCase
{
    use WithoutMiddleware, DatabaseTransactions;

    /**
     * Test the ability to create a new user.
     */
    public function testCreatingUser()
    {
        $response = $this->post('/api/v1/users', [
            'name' => 'Test User',
            'password' => 'TestPass123',
            'email' => 'example@email.com',
            'zipcode' => '37906',
            'is_anonymous' => true,
            'birth_year' => 1990,
            'is_private' => true,
        ]);

        $response->assertJsonStructure([
            'data' => [
                'user_id',
                'name',
                'email',
                'zipcode',
                'api_token',
                'is_anonymous',
                'is_private',
                'birth_year',
            ],
        ])->assertStatus(201);
    }

    /**
     * Test updating a user.
     */
    public function testUpdatingUser()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $response = $this->put('/api/v1/user', [
            'name' => 'Test User',
            'email' => 'example2@email.com',
            'zipcode' => '37919',
            'is_anonymous' => false,
            'birth_year' => 1980,
            'is_private' => true,
        ]);

        $response->assertJsonStructure([
            'data' => [
                'name',
                'email',
                'zipcode',
                'is_anonymous',
                'birth_year',
                'is_private',
            ],
        ])->assertStatus(201);
    }

    /**
     * Test retrieving a user's record.
     */
    public function testGettingUser()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $response = $this->get('/api/v1/user');

        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'zipcode',
                'email',
                'is_anonymous',
            ],
        ])->assertStatus(200);
    }

    /**
     * Tests user authentication/login.
     */
    public function testAuthenticatingAUser()
    {
        $user = factory(User::class)->create([
            'email' => 'test@example.com',
            'password' => bcrypt('testpass')
        ]);

        $response = $this->post('/api/v1/user/login', [
            'email' => 'test@example.com',
            'password' => 'testpass',
        ]);

        $response->assertJsonStructure([
            'data' => ['api_token'],
        ])->assertStatus(200);
    }
}
