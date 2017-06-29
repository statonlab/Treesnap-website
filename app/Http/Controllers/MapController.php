<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\Observable;
use App\Http\Controllers\Traits\Responds;
use App\Observation;
use Illuminate\Http\Request;
use Cache;

class MapController extends Controller
{
    use Responds, Observable;

    public function index(Request $request)
    {
        $user = $request->user();
        $isAdmin = false;
        if ($user) {
            $isAdmin = $user->isScientist() || $user->isAdmin();
        }

        $observations = $this->getCachedObservations($isAdmin, $user);

        return $this->success($this->prepForMap($observations, $isAdmin));
    }

    public function getCachedObservations($isAdmin, $user)
    {
        $cache_key = "map_observations_";
        $cache_key .= $isAdmin ? 1 : 0;

        return Cache::tags(['observations'])->remember($cache_key, 60 * 24 * 356, function () use ($user, $isAdmin) {
            return $this->getObservationsFromDB($user, $isAdmin);
        });
    }

    public function getObservationsFromDB($user, $isAdmin)
    {
        $observations = Observation::with('user');

        if (! $isAdmin) {
            $observations = $observations->where('is_private', false);
        }

        $observations = $observations->get();

        if ($user) {
            $observations->load([
                'flags' => function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                },
                'collections' => function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                },
            ]);
        }

        return $observations;
    }
}
