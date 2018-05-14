<?php

namespace App\Services\Analytics;

use App\Observation;
use Carbon\Carbon;
use DB;

class ObservationStatistics
{
    /**
     * Get a list of observation counts aggregated by category and month.
     *
     * @param int $months
     * @return array
     */
    public function aggregateObservationsByMonth($months = 6)
    {
        $limit = Carbon::now()->firstOfMonth()->subMonth($months - 1);
        $observations = Observation::select([
            DB::raw('COUNT(*) as observations_count'),
            DB::raw('MONTH(collection_date) as month'),
            DB::raw('YEAR(collection_date) as year'),
            'observation_category',
        ])
            ->groupBy(DB::raw('MONTH(collection_date)'))
            ->groupBy(DB::raw('YEAR(collection_date)'))
            ->groupBy('observation_category')
            ->whereDate('collection_date', '>=', $limit)
            ->get();

        $indexed = [];

        foreach ($observations as $observation) {
            $date = Carbon::create($observation->year, $observation->month);
            $formatted = $date->format('M, Y');
            $indexed[$formatted][$observation->observation_category] = [
                'date' => $formatted,
                'observations_count' => $observation->observations_count,
                'category' => $observation->observation_category,
            ];
        }

        return $indexed;
    }
}
