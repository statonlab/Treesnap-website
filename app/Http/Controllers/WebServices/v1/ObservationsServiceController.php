<?php

namespace App\Http\Controllers\WebServices\v1;

use App\Http\Controllers\Traits\Responds;
use App\Http\Controllers\WebServices\v1\ResponseFormatters\ObservationResponse;
use App\Observation;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ObservationsServiceController extends Controller
{
    use Responds;

    public function myObservations(Request $request)
    {
        /** @var \App\User $user */
        $user = $request->user();

        $paginated = Observation::where('user_id', $user->id)->paginate(25);
        $formatter = new ObservationResponse($user);
        $data = collect($paginated->items())->map(function (Observation $observation) use ($formatter) {
            return $formatter->format($observation);
        });
        $paginated->data = $data;

        return $paginated;
    }
}
