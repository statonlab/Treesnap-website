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

        return $this->success($observations);
    }

    /**
     * If observations exist in cache, retrieve them. Otherwise, rerun the DB query.
     *
     * @param $isAdmin
     * @param $user
     * @return mixed
     */
    public function getCachedObservations($isAdmin, $user)
    {
        $cache_key = "map_ready_observations_";
        $cache_key .= $user ? $user->id : 'guest';

        //return Cache::tags('observations')->remember($cache_key, 60 * 24, function () use ($user, $isAdmin) {
            return $this->getObservationsFromDB($user, $isAdmin);
        //});
    }

    /**
     * Query the database for observations.
     *
     * @param $user
     * @param $isAdmin
     * @return $this|\Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Collection|static|static[]
     */
    public function getObservationsFromDB($user, $isAdmin)
    {
        $observations = Observation::with('user')->withCount([
            'confirmations' => function ($query) {
                $query->where('correct', true);
            },
        ]);

        if (! $isAdmin) {
            $observations = $observations->where('is_private', false);
        }

        $observations = $observations->orderBy('observations.id', 'desc')->get();

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

        return $this->prepForMap($observations, $isAdmin, $user);
    }
}
