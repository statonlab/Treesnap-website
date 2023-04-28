<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\DealsWithObservationPermissions;
use App\Http\Controllers\Traits\Responds;
use App\Http\Controllers\Traits\Observes;
use App\Observation;
use App\Services\MetaLabels;
use App\User;
use App\ShareToken;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;
use App\Events\ObservationDeleted;
use Storage;

class ObservationsController extends Controller
{
    use Responds, Observes, DealsWithObservationPermissions;

    /**
     * Get all public observations.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request, $limit = null)
    {
        $data = $this->getObservationsFromDB($request, $limit);

        return $this->success($data);
    }

    /**
     * Get observation records from the DB.
     *
     * @param Request $request
     * @param int|null $limit
     * @return array
     */
    public function getObservationsFromDB($request, $limit = null)
    {
        $user = $request->user();
        $is_admin = false;

        $observations = Observation::with('user');

        if ($user) {
            $is_admin = User::hasRole(['admin', 'scientist'], $user);
        }

        if (! $user) {
            $observations = $observations->where('is_private', false);
        } elseif (! $is_admin) {
            // Remove private observations that don't belong to the current user
            // from the results but keep private observations that the user owns
            $observations = $this->addPrivacyClause($observations, $user);
        }

        $observations->orderBy('observations.id', 'desc');

        $data = [];

        $mapper = function ($observations) use (&$data, $user, $is_admin) {
            if ($user) {
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
            }

            foreach ($observations as $observation) {
                // Compile the data into a standardized response
                // Remove the is_private value from the response
                $data[] = array_except($this->getObservationJson($observation, $is_admin,
                    $user), ['is_private']);
            }
        };

        if ($limit) {
            $observations = $observations->paginate(intval($limit));
            $mapper($observations);
            $data = [
                'observations' => $data,
                'currentPage' => $observations->currentPage(),
                'perPage' => $observations->perPage(),
                'hasMorePages' => $observations->hasMorePages(),
                'total' => $observations->total(),
                'nextPageUrl' => $observations->nextPageUrl(),
                'previousPageUrl' => $observations->previousPageUrl(),
            ];
        } else {
            $observations->chunk(100, $mapper);
        }

        return $data;
    }

    /**
     * Show observation page.
     *
     * @param $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id, Request $request)
    {
        $user = $request->user();
        $is_admin = false;

        if ($user) {
            $is_admin = User::hasRole(['Admin', 'Scientist'], $user);
        }

        /** @var \App\Observation $observation */
        $observation = Observation::with('user')->findOrFail($id);

        if ($observation->is_private) {
            if (! $this->hasPrivilegedPermissions($user, $observation)) {
                return $this->unauthorized();
            }
        }

        if ($user) {
            $observation->load([
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
        }

        $info = $this->getObservationJson($observation, $is_admin, $user);
        $token = $request->token;

        if ($token)
        {
            $share_token = ShareToken::where('value', $token)
                ->where('observation_id', $id)
                ->first();

            if ($share_token && $share_token->expired_at >= Carbon::now())
            {
                $info['location']['latitude'] = $observation->latitude;
                $info['location']['longitude'] = $observation->longitude;
            }
        }

        return $this->success($info);
    }

    /**
     * Pre-fetched observation data to provide to open graph.
     *
     * @param $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function showPreFetch($id, Request $request)
    {
        $user = $request->user();
        $observation = Observation::with('user')->findOrFail($id);

        if ($observation->is_private) {
            if (! $this->hasPrivilegedPermissions($user, $observation)) {
                return abort(403);
            }
        }

        $user = auth()->check() ? auth()->user() : false;

        $TreeSnap = [
            'csrfToken' => csrf_token(),
            'loggedIn' => $user ? true : false,
            'role' => $user ? $user->role->name : null,
            'user' => false,
            'metaLabels' => (new MetaLabels())->toObject(),
        ];

        if ($user) {
            $TreeSnap['user'] = [
                'name' => $user->name,
                'id' => $user->id,
            ];
        }

        $title = $observation->observation_category === 'Other' ? $observation->data['otherLabel'] : $observation->observation_category;
        $meta = [
            'title' => $title." ($observation->id) | TreeSnap",
            'description' => "$title was observed and shared with scientists on TreeSnap",
            'image' => url($observation->thumbnail),
            'url' => "https://treesnap.org/observation/$observation->id",
        ];

        return view('home')->with(compact('TreeSnap', 'meta'));
    }

    /**
     * Return available categories.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCategories()
    {
        return $this->success($this->observation_categories);
    }

    /**
     * Delete observations.
     * Admin and owner only can delete observations.
     *
     * @param $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id, Request $request)
    {
        $user = $request->user();
        $isAdmin = $user->isAdmin();

        // Make sure the user is deleting a record that they own
        $observation = Observation::where('id', $id)->first();

        if (! $observation) {
            return $this->notFound('The observation you requested was not found.');
        }

        if (! $isAdmin && $observation->user_id != $user->id) {
            return $this->unauthorized();
        }

        // Delete All Images
        foreach ($observation->images as $images) {
            foreach ($images as $image) {
                $image = str_replace('/storage/', 'public/', $image);
                $image = trim($image, '/');
                if (Storage::exists($image)) {
                    Storage::delete($image);
                }
            }
        }

        // Broadcast that an observation has been deleted
        event(new ObservationDeleted([
            'id' => $observation->id,
            'user_id' => $observation->user_id,
        ]));

        $observation->delete();

        return $this->success('Observation has been deleted successfully');
    }

    /**
     * Get the latest observations for the home page feed.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getObservationFeed(Request $request)
    {
        $this->validate($request, [
            'limit' => 'nullable|integer|min:6|max:90',
        ]);

        $limit = $request->limit ?: 10;

        $observations = Observation::with([
            'user' => function ($query) {
                $query->select(['id', 'is_anonymous', 'name']);
            },
        ])
            ->select(['id', 'user_id', 'observation_category', 'created_at', 'thumbnail'])
            ->orderBy('created_at', 'desc')
            ->where('is_private', false)
            ->limit($limit)
            ->get();

        $observations->map(function ($observation) {
            if ($observation->user->is_anonymous) {
                $observation->user->name = 'Anonymous User';
            }

            $observation->date = $observation->created_at->diffForHumans();
        });

        return $this->success($observations);
    }
}
