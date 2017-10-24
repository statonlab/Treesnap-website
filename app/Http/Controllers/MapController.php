<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\Observes;
use App\Http\Controllers\Traits\Responds;
use App\Observation;
use Illuminate\Http\Request;
use Cache;

class MapController extends Controller
{
    use Responds, Observes;

    public function index(Request $request)
    {

        $this->validate($request, [
            'bounds' => 'nullable|json',
        ]);

        $user = $request->user();
        $isAdmin = false;
        if ($user) {
            $isAdmin = $user->isScientist() || $user->isAdmin();
        }

        $observations = $this->getObservationsFromDB($user, $isAdmin, $request->bounds);

        return $this->success($observations);
    }

    /**
     * Get total observations count.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function countObservations(Request $request)
    {
        $user = $request->user();
        $isAdmin = false;
        if ($user) {
            $isAdmin = $user->isScientist() || $user->isAdmin();
        }

        if ($isAdmin) {
            return $this->success([
                'count' => Observation::count(),
            ]);
        }

        return $this->success([
            'count' => Observation::where('is_private', false)->count(),
        ]);
    }

    /**
     * Query the database for observations.
     *
     * @param $user
     * @param $isAdmin
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Collection
     */
    public function getObservationsFromDB($user, $isAdmin, $bounds)
    {

        $observations = Observation::with('user')->withCount([
            'confirmations' => function ($query) {
                $query->where('correct', true);
            },
        ]);

        if ($bounds) {
            $bounds = json_decode($bounds);

            $observations->bounds($bounds);
        }

        if (! $isAdmin) {
            $observations = $observations->where('is_private', false);
        }

        $observations = $observations->orderBy('observations.id', 'desc')->get();

        if ($user) {
            $collections = $user->collections->map(function ($collection) {
                return $collection->id;
            });

            $observations->load([
                'flags' => function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                },
                'collections' => function ($query) use ($collections) {
                    $query->whereIn('collections.id', $collections);
                },
            ]);
        }

        return $this->prepForMap($observations, $isAdmin, $user);
    }
}
