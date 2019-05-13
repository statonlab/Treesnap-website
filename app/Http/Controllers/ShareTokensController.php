<?php

namespace App\Http\Controllers;

use App\Observation;
use App\ShareToken;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ShareTokensController extends Controller
{
    public function newShareToken(Request $request)
    {
        $user = $request->user();
        $observation = Observation::findOrFail($request->observation_id);

        if ($observation->user_id !== $user->id) {
            return $this->unauthorized();
        }

        // User may create an invitation.
        $share_token = $this->createToken($user, $observation, $request);

        return $this->success(
            "https://treesnap.org/observation/$observation?token=$share_token->value"
        );
    }

    protected function createShareToken($user, $observation, $request)
    {
        $rand = Str::random(60);
        while (ShareToken::where('value', $rand)->first()) {
            // Key already exists so generate a new one
            $rand = Str::random(60);
        }

        return ShareToken::create([
            'user_id' => $user->id,
            'email' => $request->email,
            'observation_id' => $observation->id,
            'value' => $rand,
            'expires_at' => Carbon::now()->addYear(),
        ]);
    }
}