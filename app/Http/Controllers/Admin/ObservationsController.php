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
            'per_page' => 'nullable|in:6,12,24,48,96',
            'search' => 'nullable',
            'collection_id' => 'nullable|exists:collections,id',
            'category' => ['nullable', Rule::in($this->observation_categories)],
            'group_id' => 'nullable|exists:groups,id',
            'advanced_filters' => 'nullable|json',
            'advanced_filter' => 'nullable|integer|exists:filters,id'
        ]);

        $limit = $request->per_page ?: 6;
        $user = $request->user();
        $admin = User::hasRole(['scientist', 'admin'], $user);

        $observations = $this->getFilteredObservations($request)->paginate($limit);

        $data = [];
        foreach ($observations as $observation) {
            $data[] = $this->getObservationJson($observation, $admin, $user);
        }

        return $this->success(array_merge($observations->toArray(), [
            'data' => $data,
            'per_page' => $request->per_page,
            'has_more_pages' => $observations->hasMorePages(),
            'collection_id' => $request->collection_id,
            'group_id' => $request->group_id,
            'filter_id' => $request->advanced_filter
        ]));
    }
}
