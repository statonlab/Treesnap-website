<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class UsersAPITest extends TestCase
{
    use WithoutMiddleware;

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
          'is_over_thirteen' => true,
        ]);

        $response->assertJsonStructure([
          'data' => [
            'user_id',
            'name',
            'email',
            'zipcode',
            'api_token',
            'is_anonymous',
            'is_over_thirteen',
          ],
        ])->assertStatus(201);
    }

    /**
     * Test updating a user.
     */
    public function testUpdatingUser()
    {
        // Get the last user created
        $user = User::orderBy('id', 'desc')->first();
        $this->actingAs($user);

        $response = $this->put('/api/v1/user', [
          'name' => 'Test User',
          'password' => 'TestPass321',
          'email' => 'example2@email.com',
          'zipcode' => '37919',
          'is_anonymous' => false,
          'is_over_thirteen' => false,
        ]);

        $response->assertJsonStructure([
          'data' => [
            'name',
            'email',
            'zipcode',
            'is_anonymous',
            'is_over_thirteen',
          ],
        ])->assertStatus(201);
    }

    /**
     * Test retrieving a user's record.
     */
    public function testGettingUser()
    {
        $user = User::orderBy('id', 'desc')->first();
        $this->actingAs($user);

        $response = $this->get('/api/v1/user');

        $response->assertJsonStructure([
          'data' => [
            'id',
            'name',
            'is_over_thirteen',
            'zipcode',
            'email',
            'is_anonymous',
          ],
        ])->assertStatus(200);

        // Testing finished ... delete the user.
        $user->delete();
    }
}
