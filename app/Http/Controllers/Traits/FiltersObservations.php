<?php

namespace App\Http\Controllers\Traits;

use App\Filter;
use App\Observation;
use App\User;
use Illuminate\Http\Request;

trait FiltersObservations
{
    /**
     * Apply observation filters.
     *
     * @param Request $request
     * @return \Illuminate\Database\Query\Builder
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    protected function getFilteredObservations(Request $request)
    {
        $user = $request->user();
        $is_admin = User::hasRole(['Scientist', 'Admin'], $user);
        $with = [
            'collections' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            },
            'flags' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            },
            'confirmations' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            },
            'user',
            'latinName',
        ];

        // Cannot mix group and collection, must be either or
        if (! empty($request->collection_id)) {
            $observations = $user->collections()
                ->findOrFail($request->collection_id)
                ->observations()
                ->with($with);
        } elseif (! empty($request->group_id)) {
            $observations = $user->groups()
                ->findOrFail($request->group_id)
                ->observations()
                ->with($with);
        } else {
            $observations = Observation::with($with);
            if (! $request->view_type || ! $is_admin) {
                $observations->where('user_id', $user->id);
            }
        }

        // Handle manual filters entry (ie, unsaved filters)
        if (! empty($request->advanced_filters)) {
            $rules = json_decode($request->advanced_filters, true);
            $observations = Filter::apply((array)$rules, $observations);
        }

        // Handle the species
        if (! empty($request->category)) {
            $observations->where('observation_category', $request->category);
        }

        // Handle keyword search
        if (! empty($request->search)) {
            //make term an array and replace term below with an iterable
            $terms = explode(" ", $request->search);

            foreach($terms as $term){

                $observations->where(function ($query) use ($term, $is_admin) {
                    $query->where('observation_category', 'like', "%$term%");
                    $query->orWhereRaw('data->"$.otherLabel" like ?', '%'.strtolower($term).'%');
                    $query->orWhere('address->formatted', 'like', "%$term%");
                    $query->orWhere('mobile_id', 'like', "%$term%");
                    $query->orWhere('custom_id', 'like', "%$term%");
                    
                    if ($is_admin) {
                        $query->orWhereHas('user', function ($query) use ($term) {
                            $query->where('users.name', 'like', "%$term%");
                        });
                    }
                });
            }
        }

        // Handle confirmation status
        $status = $request->status;
        if (! empty($status)) {
            $user = $request->user();

            $observations->whereHas('confirmations',
                function ($query) use ($status, $user) {
                    if ($status === 'marked_correct_by_me') {
                        /** @var $query \Illuminate\Database\Query\Builder */
                        $query->where('confirmations.user_id', $user->id);
                    }
                    $query->where('confirmations.correct', true);
                });
        }

        // Apply any advanced filter. This makes sure the user has access to the filter.
        if (! empty($request->advanced_filter)) {
            $observations = $this->applyAdvancedFilter($request, $observations);
        }

        // Add the privacy class if the user is not a scientist or an admin
        if (! $is_admin) {
            $observations = $this->addPrivacyClause($observations, $user);
        }

        return $observations->orderBy('id', 'desc');
    }

    /**
     * Apply advanced filters.
     *
     * @param \Illuminate\Http\Request $request
     * @param Observation $observations
     * @return \App\Observation
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    protected function applyAdvancedFilter(Request $request, $observations)
    {
        $filter = Filter::find($request->advanced_filter);
        $this->authorize('view', $filter);

        return Filter::apply($filter->rules, $observations);
    }
}
