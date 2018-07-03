<?php

namespace App\Http\Controllers;

use App\AccessToken;
use App\Http\Controllers\Traits\Responds;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OAuthController extends Controller
{
    use Responds;

    public function createTokens(Request $request)
    {
        /** @var \App\User $user */
        $user = $request->user();

        $this->validate($request, [
            'name' => 'required|min:3',
        ]);

        if ($user->tokens()->where('name', $request->name)->count() > 0) {
            return $this->validationError([
                'name' => ['The name already exists. Please choose a unique name.'],
            ]);
        }

        if ($user->tokens()->count() >= 10) {
            return $this->validationError([
                'name' => ['You have exceeded the number of authorized tokens. You are allowed up to 10 tokens. Please delete a token before creating a new one.'],
            ]);
        }

        $token = $user->createToken($request->name);

        $access_token = AccessToken::create([
            'token_id' => $token->token->id,
            'user_id' => $user->id,
            'token' => $token->accessToken,
        ]);

        return $this->success($this->formatTokenResponse($access_token, $token->token));
    }

    /**
     * Get all tokens for a given user.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function tokens(Request $request)
    {
        /** @var \App\User $user */
        $user = $request->user();

        $tokens = $user->accessTokens()->with('OAuthToken')->get();

        return $this->success($tokens->map(function ($token) {
            return $this->formatTokenResponse($token, $token->OAuthToken);
        }));
    }

    /**
     * Delete a token.
     *
     * @param $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function deleteToken($id, Request $request)
    {
        /** @var \App\User $user */
        $user = $request->user();

        $token = $user->tokens()->findOrFail($id);
        $accessToken = $user->accessTokens()->where('token_id', $id)->first();

        $token->delete();

        if ($accessToken) {
            $accessToken->delete();
        }

        return $this->created();
    }

    /**
     * Create a formatted response.
     *
     * @param AccessToken $accessToken
     * @param \Laravel\Passport\Token $OAuthToken
     * @return array
     */
    protected function formatTokenResponse($accessToken, $OAuthToken)
    {
        return [
            'name' => $OAuthToken->name,
            'access_token' => $accessToken->token,
            'id' => $accessToken->token_id,
            'expires_at' => $OAuthToken->expires_at->format('d M, Y H:m:s'),
            'active' => $OAuthToken->expires_at->gt(Carbon::now()),
        ];
    }
}
