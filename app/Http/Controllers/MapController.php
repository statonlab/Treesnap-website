<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\DealsWithObservationPermissions;
use App\Http\Controllers\Traits\MapQuery;
use App\Http\Controllers\Traits\Observes;
use App\Http\Controllers\Traits\Responds;
use App\Observation;
use Illuminate\Http\Request;
use Cache;

class MapController extends Controller
{
    use Responds, Observes, DealsWithObservationPermissions, MapQuery;

    public function simpleMap(Request $request)
    {
        $this->validate($request, [
            'bounds' => 'nullable|json',
        ]);

        $user = $request->user();
        $bounds = json_decode($request->bounds);

        $observations = $this->queryObservations($request->all(), $user, $bounds);

        return $observations->get();
    }

    /**
     * Load observations for the map.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $this->validate($request, [
            'bounds' => 'nullable|json',
            'search' => 'nullable|max:255',
            'selectedCategories' => 'nullable|array',
            'selectedCollection' => 'nullable|integer',
            'selectedFilter' => 'nullable|integer',
            'selectedConfirmation' => 'nullable|integer',
        ]);
        info($request);
        $user = $request->user();
        $bounds = json_decode($request->bounds);
        $observations = $this->queryObservations($request->all(), $user, $bounds);

        return $this->success($observations->get());
//        info($request->selectedCategories);
//        info($request->selectedCollection);
//        info($request->selectedFilter);
//        info($request->selectedConfirmation);
        $user = $request->user();
        $isAdmin = false;
        if ($user) {
            $isAdmin = $user->isScientist() || $user->isAdmin();
        }

        $observations = $this->getObservationsFromDB($user, $isAdmin, $request->bounds);

        return $this->success($observations);
    }

    /**
     * Get total observations count.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function countObservations(Request $request)
    {
        $user = $request->user();
        $isAdmin = false;
        if ($user) {
            $isAdmin = $user->isScientist() || $user->isAdmin();
        }

        if ($isAdmin) {
            return $this->success([
                'count' => Observation::count(),
            ]);
        }

        return $this->success([
            'count' => Observation::where('is_private', false)->count(),
        ]);
    }

    /**
     * Query the database for observations.
     *
     * @param $user
     * @param $isAdmin
     * @param $bounds
     * @return array
     */
    public function getObservationsFromDB($user, $isAdmin, $bounds): array
    {
        $observations = Observation::select([
            'observations.id',
            'observations.user_id',
            'observation_category',
//            'observations.images',
            'observations.thumbnail',
            'observations.longitude',
            'observations.latitude',
            'observations.data',
            'observations.collection_date',
//            'observations.location_accuracy',
            'observations.is_private',
//            'observations.address',
            'observations.fuzzy_coords',
            'observations.mobile_id',
//            'observations.latin_name_id',
//            'observations.has_private_comments',
            'observations.custom_id',
        ])->with('user', function ($query) {
            $query->select([
                'id',
                'name',
                'is_anonymous'
            ]);
        })->withCount([
            'confirmations' => function ($query) {
                $query->where('correct', true);
            },
        ]);

        if ($bounds) {
            $bounds = json_decode($bounds);
            $observations->bounds($bounds);
        }

        if (!$user) {
            $observations = $observations->where('is_private', false);
        } elseif (!$isAdmin) {
            $observations = $this->addPrivacyClause($observations, $user);
        }

        $observations = $observations->orderBy('observations.id', 'desc')->get();

        if ($user) {
            $collections = $user->collections->map(function ($collection) {
                return $collection->id;
            });

            $observations->load([
                'flags' => function ($query) use ($user) {
                    $query->select([
                        'id',
                        'user_id',
                        'observation_id'
                    ]);
                    $query->where('user_id', $user->id);
                },
                'collections' => function ($query) use ($collections) {
                    $query->select([
                        'id',
                        'user_id',
                    ]);
                    $query->whereIn('collections.id', $collections);
                },
            ]);
        }

        return $this->prepForMap($observations, $isAdmin, $user);
    }

    /**
     * Loads data for a single observation.
     * @param Request $request
     * @param Observation $observation
     * @return array
     */
    public function getObservationData(Request $request, Observation $observation): array
    {
        $user = $request->user();
        $isAdmin = false;
        if ($user) {
            $isAdmin = $user->isScientist() || $user->isAdmin();
        }

        $flattenedImages = [];
        foreach ($observation->images as $images) {
            foreach ($images as $image) {
                $flattenedImages[] = $image;
            }
        }
        if (empty($observation->fuzzy_coords)) {
            $observation->fuzzy_coords = $this->fuzifyCoorinates($observation->latitude,
                $observation->longitude);
        }

        $inGroup = false;
        $owner = false;

        if ($user) {
            $owner = $observation->user_id === $user->id;
        }
        if ($user && !$isAdmin && !$owner) {
            $inGroup = $user->hasFriend($observation->user_id);
        }

        $title = $observation->observation_category;
        $title = $title === 'Other' && isset($observation->data['otherLabel']) ? "{$title} ({$observation->data['otherLabel']})" : $title;
        $shareData = $isAdmin || $inGroup || $owner;

        if (!$observation->has_private_comments || ($user && $user->id === $observation->user_id)) {
            $data = $observation->data;
        } else {
            $data = array_except($observation->data, ['comment']);
        }

        $owner = $this->getUserDetails($observation, $user, $inGroup,
            $isAdmin);

        $data = [
            'id' => $observation->id,
            'title' => $title,
            'category' => $observation->observation_category,
            'images' => $flattenedImages,
            'position' => [
                'latitude' => $shareData ? $observation->latitude : $observation->fuzzy_coords['latitude'],
                'longitude' => $shareData ? $observation->longitude : $observation->fuzzy_coords['longitude'],
                'address' => $shareData ? $observation->address : [],
                'accuracy' => $observation->location_accuracy,
            ],
            'owner' => $owner['name'],
            'user_id' => $owner['id'],
            'date' => $observation->collection_date->toDateString(),
            'data' => $data,
            'ref' => null,
            'flags' => $user ? $observation->flags : [],
            'collections' => $user ? $observation->collections : [],
            'confirmations_count' => $observation->confirmations_count,
            'thumbnail' => $observation->thumbnail,
            'has_private_comments' => $observation->has_private_comments,
            'custom_id' => $observation->custom_id,
            'mobile_id' => $observation->mobile_id,
        ];

        return $data;
    }
}
