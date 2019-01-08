<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Traits\DealsWithObservationPermissions;
use App\Http\Controllers\Traits\FiltersObservations;
use App\Http\Controllers\Traits\Observes;
use App\Http\Controllers\Traits\Responds;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Validation\Rule;

class ObservationsController extends Controller
{
    use DealsWithObservationPermissions, Observes, FiltersObservations, Responds;

    /**
     * @param \Illuminate\Http\Request $request
     * @return mixed
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function index(Request $request)
    {
        $this->validate($request, [
            'per_page' => 'nullable|integer|min:6|max:100',
            'search' => 'nullable',
            'collection_id' => 'nullable|exists:collections,id',
            'category' => ['nullable', Rule::in($this->observation_categories)],
            'group_id' => 'nullable|exists:groups,id',
            'advanced_filters' => 'nullable|json',
            'advanced_filter' => 'nullable|integer|exists:filters,id',
            'status' => 'nullable|in:marked_correct_by_anyone,marked_correct_by_me',
            'view_type' => 'nullable|in:full,partial',
        ]);

        $limit = $request->per_page ?: 6;
        $user = $request->user();
        $admin = User::hasRole(['scientist', 'admin'], $user);

        $observations = $this->getFilteredObservations($request)->withCount([
            'confirmations as correct_marks' => function ($query) {
                return $query->where('confirmations.correct', true);
            },
            'confirmations as incorrect_marks' => function ($query) {
                return $query->where('confirmations.correct', false);
            },
        ])->paginate($limit);

        $data = [];
        foreach ($observations as $observation) {
            $datum = $this->getObservationJson($observation, $admin, $user);
            $datum['correct_marks'] = $observation->correct_marks;
            $datum['incorrect_marks'] = $observation->incorrect_marks;
            $data[] = $datum;
        }

        return $this->success(array_merge($observations->toArray(), [
            'data' => $data,
            'per_page' => $limit,
            'has_more_pages' => $observations->hasMorePages(),
            'collection_id' => $request->collection_id,
            'group_id' => $request->group_id,
            'filter_id' => $request->advanced_filter,
        ]));
    }
}
