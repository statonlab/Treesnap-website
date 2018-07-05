<?php

namespace App\Http\Controllers\WebServices\v1;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\AccessToken;
use Illuminate\Http\JsonResponse;

class TokensController extends Controller
{
    /**
     * Allow users to refresh their own tokens.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function refreshTokens(Request $request)
    {
        /** @var \App\User $user */
        $user = $request->user();

        $this->validate($request, [
            'access_token' => 'required',
        ]);

        // Get old tokens
        $accessToken = AccessToken::with('OAuthToken')->where([
            'user_id' => $user->id,
            'token' => $request->access_token,
        ])->first();

        if (! $accessToken || ! $accessToken->OAuthToken) {
            return JsonResponse::create([
                'error_code' => 1000,
                'message' => 'Tokens not found',
            ], 404);
        }

        // Generate new tokens
        $token = $user->createToken($accessToken->OAuthToken->name);
        $accessToken->OAuthToken->delete();

        // Update the token and token id to match the new one
        $accessToken->fill([
            'token_id' => $token->token->id,
            'token' => $token->accessToken,
        ])->save();

        return JsonResponse::create([
            'access_token' => $token->accessToken,
            'expires_at' => $token->token->expires_at,
            'error_code' => 0,
            'message' => 'Tokens updated successfully',
        ]);
    }
}
