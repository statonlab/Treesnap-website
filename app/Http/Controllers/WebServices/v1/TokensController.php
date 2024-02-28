<?php

namespace App\Http\Controllers\WebServices\v1;

use App\Http\Controllers\Traits\Responds;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\AccessToken;
use Illuminate\Http\JsonResponse;

class TokensController extends Controller
{
    use Responds;

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

        // Make sure the tokens exist
        if (!$accessToken || !$accessToken->OAuthToken) {
            return $this->error('Tokens not found', 1000, 404);
        }

        // Verify that the authentication access code is the one being renewed
        // This automatically guarantees that we are not renewing already expired tokens
        if ($accessToken->token !== $request->bearerToken()) {
            return response()->json([
                'error_code' => 1100,
                'message' => 'Tokens mismatch',
            ], 401);
        }

        // Generate new tokens
        $token = $user->createToken($accessToken->OAuthToken->name);
        $accessToken->OAuthToken->delete();

        // Update the token and token id to match the new one
        $accessToken->fill([
            'token_id' => $token->token->id,
            'token' => $token->accessToken,
        ])->save();

        return response()->json([
            'access_token' => $token->accessToken,
            'expires_at' => $token->token->expires_at,
            'error_code' => 0,
            'message' => 'Tokens updated successfully',
        ], 201);
    }
}
