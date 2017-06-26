<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Traits\Observable;
use App\Http\Controllers\Traits\Responds;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Observation;
use Illuminate\Validation\Rule;

class CurationsController extends Controller
{
    use Observable, Responds;

    /**
     * Get only the fields that we need from the DB.
     * This also allows join statements to be predictable.
     *
     * @var array
     */
    protected $observationSelectFields;

    /**
     * CurationsController constructor.
     */
    public function __construct()
    {
        $this->observationSelectFields = [
            'observations.id',
            'observations.user_id',
            'observation_category',
            'observations.data',
            'observations.longitude',
            'observations.latitude',
            'observations.location_accuracy',
            'observations.address',
            'observations.images',
            'observations.collection_date',
            'observations.is_private',
            'observations.mobile_id',
        ];
    }

    /**
     * Get filtered and paged observations.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $limit
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request, $limit = 3)
    {
        $user = $request->user();
        $observations = Observation::with([
            'confirmations' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            },
            'flags' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            },
            'collections' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            },
        ])->select($this->observationSelectFields);

        $observations = $this->applySQLFilters($observations, $request, $user);
        $observations->orderBy('observations.id', 'desc');

        $data = [];

        $sql = $observations->toSql();
        $observations = $observations->paginate(intval($limit));

        foreach ($observations as $observation) {
            // Compile the data into a standardized response
            $oUser = $observation->user;
            $data[] = array_merge($this->getObservationJson($observation, true), [
                'user' => [
                    'id' => $oUser->id,
                    'name' => $oUser->name,
                ],
            ]);
        }

        $data = [
            'observations' => $data,
            'currentPage' => $observations->currentPage(),
            'perPage' => $observations->perPage(),
            'hasMorePages' => $observations->hasMorePages(),
            'total' => $observations->total(),
            'nextPageUrl' => $observations->nextPageUrl(),
            'previousPageUrl' => $observations->previousPageUrl(),
            'query' => $sql,
        ];

        return $this->success($data);
    }

    /**
     * Apply SQL where and join statements as needed after validating the filters request.
     *
     * @param $observations
     * @param $request
     * @param $user
     * @return mixed
     */
    protected function applySQLFilters($observations, $request, $user)
    {
        $this->validate($request, [
            'category' => [
                'nullable',
                Rule::in($this->observation_categories),
            ],
            'status' => 'nullable|in:marked_correct_by_anyone,marked_correct_by_me',
            'search' => 'nullable|max:200',
        ]);

        if (! empty($request->category)) {
            $observations->where('observation_category', $request->category);
        }

        if (! empty($request->status)) {
            $observations->join('confirmations', 'observations.id', '=', 'confirmations.observation_id');

            switch ($request->status) {
                case "marked_correct_by_anyone":
                    $observations->where('confirmations.correct', true);
                    break;
                case "marked_correct_by_me":
                    $observations->where([
                        'confirmations.user_id' => $user->id,
                        'confirmations.correct' => true,
                    ]);
                    break;
            }
        }

        if (! empty($request->search)) {
            $observations->join('users', 'observations.user_id', '=', 'users.id');
            $observations->where(function ($query) use ($request) {
                $query->where('observation_category', 'like', "%{$request->search}%");
                $query->orWhere('data->otherLabel', 'like', "%{$request->search}%");
                $query->orWhere('name', 'like', "%{$request->search}%");
            });
        }

        return $observations;
    }
}
