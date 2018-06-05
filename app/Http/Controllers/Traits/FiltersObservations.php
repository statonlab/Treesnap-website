<?php

namespace App\Http\Controllers\Traits;

use App\Filter;
use App\Observation;
use Illuminate\Http\Request;

trait FiltersObservations
{

    /**
     * Apply observation filters.
     *
     * @param Request $request
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    protected function getFilteredObservations(Request $request)
    {
        $user = $request->user();

        if (empty($request->per_page)) {
            $request->per_page = 6;
        }

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
        ];

        if (! empty($request->collection_id)) {
            $observations = $user->collections()->findOrFail($request->collection_id)->observations();
            $observations = $this->addPrivacyClause($observations, $user);
            $observations = $observations->with($with);
        } elseif (! empty($request->group_id)) {
            $observations = $user->groups()
                ->wherePivot('share', true)
                ->findOrFail($request->group_id)
                ->observations()
                ->with($with);
        } else {
            $observations = Observation::with($with)->where('user_id', $user->id);
        }

        if (! empty($request->advanced_filters)) {
            $rules = json_decode($request->advanced_filters);
            $observations = Filter::apply((array)$rules, $observations);
        }

        if (! empty($request->category)) {
            $observations->where('observation_category', $request->category);
        }

        if (! empty($request->search)) {
            $term = $request->search;
            $observations->where(function ($query) use ($term) {
                $query->where('observation_category', 'like', "%$term%");
                $query->orWhere('data->otherLabel', 'like', "%$term%");
                $query->orWhere('address->formatted', 'like', "%$term%");
            });
        }

        if (! empty($request->advanced_filter)) {
            $observations = $this->applyAdvancedFilter($request, $observations);
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
