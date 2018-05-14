<?php

namespace App\Services\Analytics;

use DB;
use App\User;
use Carbon\Carbon;

class UserStatistics
{
    /**
     * Get an indexed by date array of users count.
     *
     * @param int $months number of months.
     * @param bool|null $trained Specify null if you want all users. Specify true/false
     *                           for trained/untrained
     * @return array
     */
    public function aggregateUsersCountByMonth($months = 6, $trained = null)
    {
        $limit = Carbon::now()->firstOfMonth()->subMonth($months - 1);
        $users = User::select([
            DB::raw('COUNT(*) AS users_count'),
            DB::raw('MONTH(created_at) AS created_at_month'),
            DB::raw('YEAR(created_at) AS created_at_year'),
        ])->groupBy([DB::raw('MONTH(created_at)'), DB::raw('YEAR(created_at)')])->whereDate('created_at', '>=', $limit);

        if ($trained === true) {
            $users->where('class', 'Trained');
        } elseif ($trained === false) {
            $users->where('class', 'Untrained');
        }

        $users = $users->get();

        $indexed = [];
        foreach ($users as $user) {
            $date = Carbon::create($user->created_at_year, $user->created_at_month);

            $indexed[$date->format('M, Y')] = [
                'date' => $date,
                'users_count' => $user->users_count,
            ];
        }

        return $indexed;
    }
}
