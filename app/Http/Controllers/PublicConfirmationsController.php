<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\Responds;
use App\Observation;

class PublicConfirmationsController extends Controller
{
    use Responds;

    /**
     * Count number of confirmed observations.
     *
     * @param $observation_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function count($observation_id)
    {
        $observation = Observation::findOrFail($observation_id);

        $correct = $observation->confirmations()->where('correct', true)->count();
        $incorrect = $observation->confirmations()->where('correct', false)->count();

        return $this->success([
            'correct' => $correct,
            'incorrect' => $incorrect,
        ]);
    }
}
