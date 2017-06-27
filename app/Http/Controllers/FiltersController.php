<?php

namespace App\Http\Controllers;

use App\Filter;
use App\Http\Controllers\Traits\Observable;
use App\Http\Controllers\Traits\Responds;
use App\Observation;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Cache;

class FiltersController extends Controller
{
    use Responds, Observable;

    protected $filterMapper = [
        'Ash' => 'ash',
        'American Chestnut' => 'americanChestnut',
        'Hemlock' => 'hemlock',
        'White Oak' => 'whiteOak',
        'American Elm' => 'americanElm',
        'Other' => 'other',
    ];

    /**
     * Get all available filters.
     *
     * @param \Illuminate\Http\Request $request
     */
    public function index(Request $request)
    {
        return $this->success($request->user()->filters);
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
    public function create(Request $request)
    {
        $this->validate($request, [
            'categories' => 'required',
            'categories.*' => [
                'required',
                Rule::in($this->observation_categories),
            ],
            'name' => 'nullable|max:255',
        ]);

        $filter = null;
        $user = $request->user();

        // Save the filter if a name is provided
        if (! empty($request->name)) {
            $filter = Filter::create([
                'user_id' => $user->id,
                'name' => $request->name,
                'rules' => $request->all(),
                'notify_user' => false,
            ]);
        }

        return $this->success([
            'filter' => $filter,
            'observations' => $this->getCachedFilteredObservations($request, $filter),
        ]);
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
        $isAdmin = $user->isAdmin() || $user->isScientist();

        if (! $filters) {
            $filters = $request->all();
        }

        $filtered = $this->apply($filters);

        $filtered->chunk(200, function ($observations) use (&$all, $isAdmin, $user) {
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
                $all[] = array_merge($this->getObservationJson($observation, $isAdmin), [
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

        $filtered = $this->apply($request->all());

        return $this->success([
            'count' => $filtered->count(),
        ]);
    }

    /**
     * Apply a certain filter.
     *
     * @param $filters
     */
    protected function apply($filters)
    {
        $observations = Observation::with('user');

        // Apply address
        if (isset($filters['address'])) {
            $nulls = 0;
            foreach ($filters['address'] as $key => $value) {
                if (empty($value)) {
                    $nulls++;
                    continue;
                }

                $observations->where('address->components', 'like', "%$value%");
            }
            if ($nulls < 3) {
                $observations->whereNotNull('address');
            }
        }

        $observations->where(function ($DB) use ($filters) {
            // Apply per category filters.
            foreach ($filters['categories'] as $key => $category) {
                $where = function ($query) use ($category, $filters) {
                    $query->where('observation_category', $category);
                    if (! isset($filters[$this->filterMapper[$category]])) {
                        return;
                    }

                    foreach ($filters[$this->filterMapper[$category]] as $filter => $value) {
                        if (is_array($value)) {
                            $query->where(function ($q) use ($filter, $value) {
                                foreach ($value as $index => $one) {
                                    // For the first filter, apply only a WHERE statement instead of an OR WHERE
                                    if ($index === 0) {
                                        $q->where("data->$filter", $one);
                                    } else {
                                        $q->orWhere("data->$filter", $one);
                                    }
                                }
                            });
                        } else {
                            $sub = substr($filter, -3);
                            if ($sub === 'Min' || $sub === 'Max') {
                                // Ignore max
                                if ($sub === 'Max') {
                                    continue;
                                }

                                // Extract the filter name
                                $filterName = substr($filter, 0, strlen($filter) - 3);
                                $filterMax = "{$filterName}Max";
                                $allFilters = $filters[$this->filterMapper[$category]];

                                // If the filter is not complete, ignore it
                                if (! isset($allFilters[$filterMax])) {
                                    continue;
                                }

                                // Apply the min/max filter
                                $query->whereBetween("data->$filterName", [
                                    intVal($value),
                                    intval($allFilters[$filterMax]),
                                ]);
                            } else {
                                $query->where("data->$filter", $value);
                            }
                        }
                    }
                };

                // For the first filter, apply only a WHERE statement instead of an OR WHERE
                if ($key === 0) {
                    $DB->where($where);
                } else {
                    $DB->orWhere($where);
                }
            }
        });

        $observations->orderBy('collection_date', 'DESC');

        return $observations;
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

        return Cache::tags('observations')->remember($cache_key, 60 * 24, function () use ($request, $filter) {
            return $this->getFilteredObservations($request, $filter->rules);
        });
    }
}
