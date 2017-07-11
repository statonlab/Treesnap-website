<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Traits\Responds;
use App\Observation;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    use Responds;

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
    public function usersTrainedPercentage()
    {
        $all = User::count();
        $trained = User::where('class', 'Trained')->count();

        if ($all === 0) {
            return $this->success("0%");
        }

        return $this->success(number_format(($trained / $all) * 100, 0)."%");
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

    public function observationsCountByState()
    {
        $observations = Observation::select('address')->get();

        $states = [
            'Tennessee' => 1,
        ];

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

        return $this->success($states);
    }
}
