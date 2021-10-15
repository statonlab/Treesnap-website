<?php

namespace App\Http\Controllers;

use App\Observation;
use App\ShareToken;
use App\Http\Controllers\Traits\Responds;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ShareTokensController extends Controller
{
    use Responds;

    /**
     * Attempts to create a share link if the user is authorized to do so.
     *
     * @param \App\Observation $observation
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function share(Observation $observation, Request $request): JsonResponse
    {
        $user = $request->user();

        if ($observation->user_id !== $user->id) {
            return $this->unauthorized();
        }

        $share_token = $this->createShareToken($user, $observation, $request);

        return $this->success(
            "https://treesnap.org/observation/$observation->id?token=$share_token->value"
        );
    }

    /**
     * Creates a token for the share URL.
     *
     * @param $user
     * @param $observation
     * @param $request
     * @return \App\ShareToken|\Illuminate\Database\Eloquent\Model
     */
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
            'expired_at' => Carbon::now()->addYear(),
        ]);
    }
}
