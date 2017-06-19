<?php

namespace App\Http\Controllers;

use App\Filter;
use App\Http\Controllers\Traits\Observable;
use App\Http\Controllers\Traits\Responds;
use App\Observation;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

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
        $filters = Filter::where('user_id', $user->id)->findOrFail($id);

        return $this->success([
            'filter' => $filters,
            'observations' => $this->getFilteredObservations($request, $filters->rules),
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
            'observations' => $this->getFilteredObservations($request),
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

        $this->apply($filters)->chunk(200, function ($observations) use (&$all, $isAdmin) {
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

        $filtered = $this->apply($request->all())->count();

        return $this->success($filtered);
    }

    /**
     * Apply a certain filter.
     *
     * @param $filters
     */
    protected function apply($filters)
    {
        $observations = Observation::with('user');

        foreach ($filters['categories'] as $key => $category) {
            $where = function ($query) use ($category, $filters) {
                $query->where('observation_category', $category);
                if (isset($filters[$this->filterMapper[$category]])) {
                    foreach ($filters[$this->filterMapper[$category]] as $filter => $value) {
                        $filter = "data->$filter";
                        if (is_array($value)) {
                            $query->where(function ($q) use ($filter, $value) {
                                foreach ($value as $index => $one) {
                                    if ($index === 0) {
                                        $q->where($filter, $one);
                                    } else {
                                        $q->orWhere($filter, $one);
                                    }
                                }
                            });
                        } else {
                            $query->where($filter, $value);
                        }
                    }
                }
            };

            if ($key === 0) {
                $observations->where($where);
            } else {
                $observations->orWhere($where);
            }
        }

        return $observations;
    }
}
