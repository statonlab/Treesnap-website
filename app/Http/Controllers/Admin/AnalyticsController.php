<?php

namespace App\Http\Controllers\Admin;

use App\DownloadStatistic;
use App\Http\Controllers\Traits\Observes;
use App\Http\Controllers\Traits\Responds;
use App\Observation;
use App\Services\Analytics\ObservationStatistics;
use App\Services\Analytics\UserStatistics;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    use Responds, Observes;

    /**
     * Count the number of registered users.
     *
     * @return mixed
     */
    public function usersCount()
    {
        return $this->success(User::count());
    }

    /**
     * Count the number of trained Users.
     *
     * @return mixed
     */
    public function usersTrainedCount()
    {
        return $this->success(User::where('class', 'Trained')->count());
    }

    /**
     * Count the number of trained Users.
     *
     * @return mixed
     */
    public function usersWithObservations()
    {
        return $this->success(User::whereHas('observations')->count());
    }

    /**
     * Count the number of observations.
     *
     * @return mixed
     */
    public function observationsCount()
    {
        return $this->success(Observation::count());
    }

    /**
     * Get the count for each available category.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function observationsDistribution()
    {
        $observations = Observation::select([
            'observation_category',
            DB::raw('COUNT(*) as count'),
        ])->groupBy('observation_category')->orderBy('observation_category')->get();

        $data = [
            'labels' => [],
            'dataset' => [],
        ];

        foreach ($observations as $observation) {
            $data['labels'][] = $observation->observation_category;
            $data['dataset'][] = $observation->count;
        }

        return $this->success($data);
    }

    /**
     * Get observations count per state.
     *
     * @param int $limit
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function observationsCountByState($limit = 5)
    {
        $observations = Observation::select('address')->get();

        $states = [];

        foreach ($observations as $observation) {
            if (empty($observation->address)) {
                continue;
            }

            foreach ($observation->address['components'] as $component) {
                if (in_array('administrative_area_level_1', $component['types'])) {
                    if (isset($states[$component['long_name']])) {
                        $states[$component['long_name']]++;
                    } else {
                        $states[$component['long_name']] = 1;
                    }
                }
            }
        }

        arsort($states);

        return $this->success(array_slice($states, 0, $limit, true));
    }

    /**
     * Create data for users over time chart
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function usersOverTime()
    {
        $stats = new UserStatistics();
        $users = $stats->aggregateUsersCountByMonth(6);
        $trained_users = $stats->aggregateUsersCountByMonth(6, true);

        $data = [];
        for ($i = 5; $i >= 0; $i--) {
            $date = Carbon::now()->firstOfMonth()->subMonths($i);
            $formatted = $date->format('M, Y');
            $datum = [
                'date' => $formatted,
                'users_count' => 0,
                'trained_count' => 0,
            ];

            if (isset($users[$formatted])) {
                $datum['users_count'] = $users[$formatted]['users_count'];
            }

            if (isset($trained_users[$formatted])) {
                $datum['trained_count'] = $users[$formatted]['users_count'];
            }

            $data[] = $datum;
        }

        return $this->success($data);
    }

    /**
     * Get observations over time.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function observationsOverTime()
    {
        $stats = new ObservationStatistics();
        $observations = $stats->aggregateObservationsByMonth(6);
        $data = [];
        $categories = $this->observation_categories;
        sort($categories);
        for ($i = 5; $i >= 0; $i--) {
            $date = Carbon::now()->firstOfMonth()->subMonths($i);
            $formatted = $date->format('M, Y');
            $category_datum = [];
            foreach ($categories as $category) {
                $datum = [
                    'date' => $formatted,
                    'observations_count' => 0,
                    'observation_category' => $category,
                ];

                if (isset($observations[$formatted]) && isset($observations[$formatted][$category])) {
                    $record = $observations[$formatted][$category];
                    $datum['observations_count'] = $record['observations_count'];
                }

                $category_datum[] = $datum;
            }

            $data[] = [
                'label' => $formatted,
                'data' => $category_datum,
            ];
        }

        return $this->success($data);
    }

    /**
     * Construct downloads data.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function downloads(Request $request)
    {
        $this->validate($request, [
            'per_page' => 'nullable|int|min:6|max:25',
            'page' => 'nullable|int',
        ]);

        $per_page = $request->per_page ?: 10;

        $downloads = DownloadStatistic::orderBy('created_at', 'desc')
            ->with('user')
            ->paginate($per_page);

        return $this->success($downloads);
    }
}
