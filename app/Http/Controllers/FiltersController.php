<?php

namespace App\Http\Controllers;

use App\Filter;
use App\Http\Controllers\Traits\Observes;
use App\Http\Controllers\Traits\Responds;
use App\Observation;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Cache;

class FiltersController extends Controller
{
    use Responds, Observes;

    /**
     * Get all available filters.
     *
     * @param \Illuminate\Http\Request $request
     */
    public function index(Request $request)
    {
        $user = $request->user();
        if (! $user) {
            return $this->unauthorized();
        }

        return $this->success($user->filters);
    }

    /**
     * Get and apply filter.
     *
     * @param $id
     * @param \Illuminate\Http\Request $request
     */
    public function show($id, Request $request)
    {
        $user = $request->user();
        $filter = Filter::where('user_id', $user->id)->findOrFail($id);

        return $this->success([
            'filter' => $filter,
            'observations' => $this->getCachedFilteredObservations($request, $filter),
        ]);
    }

    /**
     * Create a new filter, apply it and return the results.
     *
     * @param \Illuminate\Http\Request $request
     */
    public function create(Request $request, $with_observations = false)
    {
        $this->validate($request, [
            'categories' => 'required',
            'categories.*' => [
                'required',
                Rule::in($this->observation_categories),
            ],
            'name' => 'nullable|max:255',
        ], [
            'categories.required' => 'The species field is required'
        ]);

        $filter = null;
        $user = $request->user();

        // Save the filter if a name is provided
        if ($user && ! empty($request->name)) {
            $filter = Filter::create([
                'user_id' => $user->id,
                'name' => $request->name,
                'rules' => $request->all(),
                'notify_user' => false,
            ]);
        }

        $data = [
            'filter' => $filter,
        ];

        if ($with_observations) {
            $data['observations'] = $this->getCachedFilteredObservations($request, $filter);
        }

        return $this->success($data);
    }

    /**
     * Apply filters and clean up observations data structure.
     *
     * @param Request $request
     * @param array|null $filters
     * @return array
     */
    protected function getFilteredObservations($request, $filters = null)
    {
        $all = [];
        $user = $request->user();
        $isAdmin = false;
        if ($user) {
            $isAdmin = $user->isAdmin() || $user->isScientist();
        }

        if (! $filters) {
            $filters = $request->all();
        }

        $filtered = Filter::apply($filters)->orderBy('collection_date', 'DESC');
        if (! empty($request->map) && $request->map) {
            if ($user) {
                $filtered = $filtered->get()->load([
                    'flags' => function ($query) use ($user) {
                        $query->where('user_id', $user->id);
                    },
                    'collections' => function ($query) use ($user) {
                        $query->where('user_id', $user->id);
                    },
                ]);
            } else {
                $filtered = $filtered->get();
            }

            return $this->prepForMap($filtered, $isAdmin, $user);
        }

        $filtered->chunk(1000, function ($observations) use (&$all, $isAdmin, $user) {
            $observations->load([
                'confirmations' => function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                },
                'flags' => function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                },
                'collections' => function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                },
            ]);

            foreach ($observations as $observation) {
                $all[] = array_merge($this->getObservationJson($observation, $isAdmin, $user), [
                    'user' => [
                        'name' => $observation->user->name,
                        'id' => $observation->user->id,
                    ],
                ]);
            }
        });

        return $all;
    }

    /**
     * Delete a filter.
     *
     * @param $id
     * @param \Illuminate\Http\Request $request
     */
    public function delete($id, Request $request)
    {
        $filter = Filter::where('user_id', $request->user()->id)->findOrFail($id);

        $filter->delete();

        return $this->success('Filter deleted successfully');
    }

    /**
     * Count the available observations.
     *
     * @param \Illuminate\Http\Request $request
     */
    public function count(Request $request)
    {
        $this->validate($request, [
            'categories' => 'nullable',
            'categories.*' => [
                'required',
                Rule::in($this->observation_categories),
            ],
        ]);

        if (empty($request->categories)) {
            return $this->success(0);
        }

        $filtered = Filter::apply($request->all())->orderBy('collection_date', 'DESC');

        return $this->success([
            'count' => $filtered->count(),
        ]);
    }

    /**
     * Retrieve filtered observations from cache.
     *
     * @param Request $request
     * @param \App\Filter $filter
     * @return mixed
     */
    protected function getCachedFilteredObservations($request, $filter)
    {
        if (! $filter) {
            return $this->getFilteredObservations($request);
        }

        $cache_key = "filtered_observations_{$filter->id}";
        if (! empty($request->map) && $request->map) {
            $cache_key .= '_map';
        }

        return Cache::tags('observations')->remember($cache_key, 60 * 24, function () use ($request, $filter) {
            return $this->getFilteredObservations($request, $filter->rules);
        });
    }
}
