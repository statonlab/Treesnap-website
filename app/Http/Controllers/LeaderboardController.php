<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\Responds;
use App\Observation;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;

class LeaderboardController extends Controller
{
    use Responds;

    /**
     * Gets a list of all time top users based on number of
     * observations submitted.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $limit
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request, $limit = 5)
    {
        /** @var \App\User $user */
        $user = $request->user();

        // Get observations grouped by user sorted by date and limited the last 30 days
        // If null or less than $limit is available, get the next 30 days until $limit is reached
        $leaders = [];

        $observations = Observation::select([
            'user_id',
            DB::raw('COUNT(*) as observations_count'),
        ])
            ->with([
                'user' => function ($query) {
                    $query->select(['id', 'name', 'is_anonymous']);
                },
            ])
            ->when($limit > 0, function ($query) use ($limit) {
                $query->limit($limit);
            })
            ->where('created_at', '>', Carbon::now()->subDays(30))
            ->groupBy('user_id')
            ->orderBy('observations_count', 'desc')
            ->get();

        $isAdmin = $user ? $user->isAdmin() || $user->isScientist() : false;
        foreach ($observations as $observation) {
            $leaders[] = [
                'name' => $observation->user->is_anonymous && ! $isAdmin ? 'Anonymous User' : $observation->user->name,
                'observations_count' => $observation->observations_count,
                'thumbnail' => $this->getThumbnail($observation),
            ];
        }

        return $this->success($leaders);
    }

    /**
     * Get thumbnail for an observation.
     *
     * @param Observation $observation
     * @return array
     */
    protected function getThumbnail($observation)
    {
        $observation = $observation->user->observations()->orderBy('created_at', 'desc')->first();

        return [
            'src' => $observation ? $observation->thumbnail : '',
            'alt' => $observation ? $observation->observation_category : '',
        ];
    }
}
