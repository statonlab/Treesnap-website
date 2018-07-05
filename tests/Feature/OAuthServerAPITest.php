<?php

namespace Tests\Feature;

use App\AccessToken;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class OAuthServerAPITest extends TestCase
{
    use DatabaseTransactions;

    /** @test */
    public function testCreatingTokens()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $response = $this->post('/web/oauth/personal-tokens', [
            'name' => 'test_token',
        ]);

        $response->assertSuccessful();

        $response->assertJsonStructure([
            'data' => [
                'access_token',
                'name',
                'active',
                'expires_at',
            ],
        ]);
    }

    /** @test */
    public function testListingTokens()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        // First create a tokens for the current user
        $token_name = uniqid();

        $response = $this->post('/web/oauth/personal-tokens', [
            'name' => $token_name,
        ]);

        $response->assertSuccessful();

        // Get all tokens
        $response = $this->get('/web/oauth/personal-tokens');

        $response->assertSuccessful();
        $response->assertJsonStructure([
            'data' => [
                [
                    'access_token',
                    'name',
                    'active',
                    'expires_at',
                ],
            ],
        ]);

        // Verify that the token we just created exists
        $tokens = $response->json('data');

        $names = collect($tokens)->map(function ($token) {
            return $token['name'];
        });

        $this->assertContains($token_name, $names);
    }

    /** @test */
    public function testRefreshingTokens()
    {
        /** @var User $user */
        $user = factory(User::class)->create();
        $token = $user->createToken(uniqid());

        AccessToken::create([
            'user_id' => $user->id,
            'token_id' => $token->token->id,
            'token' => $token->accessToken,
        ]);

        $response = $this->withHeader('Authorization', "Bearer $token->accessToken")
            ->post('/web-services/v1/refresh-tokens', [
                'access_token' => $token->accessToken,
            ]);

        $response->assertSuccessful();
        $response->assertJsonStructure([
            'access_token',
            'expires_at',
            'error_code',
            'message',
        ]);

        $this->assertEquals($response->json('error_code'), 0);
    }
}
