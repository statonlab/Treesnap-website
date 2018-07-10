<?php

namespace App\Http\Controllers\WebServices\v1;

use App\Filter;
use App\Http\Controllers\Traits\FiltersObservations;
use App\Http\Controllers\Traits\Responds;
use App\Http\Controllers\WebServices\v1\ResponseFormatters\ObservationResponse;
use App\Observation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\Rule;

class ObservationsServiceController extends Controller
{
    use Responds;

    protected $sortable_fields = [
        'category' => 'observation_category',
        'collection_date' => 'collection_date',
    ];

    /**
     * Get a list of the current user's observations.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function myObservations(Request $request)
    {
        $paginated = $this->getPaginatedObservations($request, true);

        return $this->success($paginated);
    }

    /**
     * Get all available observations.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function observations(Request $request)
    {
        $paginated = $this->getPaginatedObservations($request);

        return $this->success($paginated);
    }

    /**
     * Get the observation from the database.
     *
     * @param \Illuminate\Http\Request $request
     * @param bool $current_user_only
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    protected function getPaginatedObservations(Request $request, $current_user_only = false)
    {
        /** @var \App\User $user */
        $user = $request->user();

        $this->validate($request, [
            'page' => 'nullable|integer|min:1',
            'per_page' => 'nullable|integer|min:1|max:100',
            'order_by' => ['nullable', Rule::in($this->sortable_fields)],
            'order_direction' => 'nullable|in:desc,asc',
            'filters' => 'nullable|json',
        ]);

        $per_page = $request->per_page ?: 25;
        $order_by = $request->order_by ?: 'id';
        $order_direction = $request->order_direction ?: 'asc';

        $observations = Observation::with([
            'user' => function ($query) {
                $query->select(['users.id', 'users.name', 'is_anonymous']);
            },
            'latinName',
        ])->orderBy($order_by, $order_direction);

        if ($current_user_only) {
            $observations->where('user_id', $user->id);
        }

        if ($request->filters) {
            $observations = Filter::apply($request->filters, $observations);
        }

        /** @var \Illuminate\Pagination\LengthAwarePaginator $paginated */
        $paginated = $observations->paginate($per_page);
        $formatter = new ObservationResponse($user);
        $paginated->getCollection()->transform(function (Observation $observation) use ($formatter) {
            return $formatter->format($observation);
        });

        return $paginated;
    }
}
