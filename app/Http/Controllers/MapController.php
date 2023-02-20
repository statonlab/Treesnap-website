<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\DealsWithObservationPermissions;
use App\Http\Controllers\Traits\Observes;
use App\Http\Controllers\Traits\Responds;
use App\Observation;
use App\User;
use Illuminate\Http\Request;
use Cache;

class MapController extends Controller
{
    use Responds, Observes, DealsWithObservationPermissions;

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
        $user = $request->user();
        $bounds = json_decode($request->bounds);
        $observations = $this->queryObservations($request->all(), $user, $bounds);

        return $this->success($observations->get());
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
     * Loads data for a selected observation within the map.
     * @param Request $request
     * @param Observation $observation
     * @return array
     */
    public function showObservation(Request $request, Observation $observation): array
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

    /**
     * Loads data for all observations visible within bounds of the map.
     * @param array $parameters
     * @param User $user
     * @param $bounds
     * @return mixed
     */
    function queryObservations(array $parameters, ?User $user, $bounds)
    {
        $isAdmin = $user?->isAdmin();
        $isScientist = $user?->isScientist();
        $friends = [];
        if ($user) {
            $friends = $user->friends() + [$user->id];
        }

        $observations = Observation::query()
            ->bounds($bounds)
            ->when($isAdmin || $isScientist, function ($query) {
                // Admin logic
                $query->select(['id', 'latitude', 'longitude']);
            }, function ($query) use ($friends) {
                // Non-admin logic
                // If the user is in the same group and is sharing then get latitude and longitude
                // If the user owns the observation, same as above
                // Otherwise, get fuzzy coords
                if (!empty($friends)) {
                    $query->selectRaw('id, IF(user_id in (?), latitude, null) as latitude, IF(user_id in (?), longitude, null) as longitude, fuzzy_coords',
                        [
                            $friends,
                            $friends,
                        ]);
                }
                else {
                    $query->addSelect(['id','fuzzy_coords']);
                }
            })
            ->addSelect(['thumbnail', 'observation_category as title'])
            ->when(!$user, function ($query) {
                $query->where('is_private', false);
            })
            ->when(!empty($parameters['searchTerm']), function ($query) use ($parameters) {
                $query->where(function ($query) use ($parameters) {
                    $query->whereHas('user', function ($query) use ($parameters) {
                        $query->where('users.name', 'like', "%{$parameters['searchTerm']}%");
                    });
                    $query->orWhere('observation_category', 'like', "%{$parameters['searchTerm']}%");
                    if (isset($observation->data['otherLabel'])) {
                        $query->orWhereJsonContains('otherLabel', ["%{$parameters['searchTerm']}%"]);
                    }
                    $query->orWhere('custom_id', 'like', "%{$parameters['searchTerm']}%");
                    $query->orWhere('mobile_id', 'like', "%{$parameters['searchTerm']}%");
                });
            })
            ->when(!empty($parameters['selectedCategories']), function ($query) use ($parameters) {
                $query->whereIn('observation_category', $parameters['selectedCategories']);
            })
            ->when(!empty($parameters['selectedCollection']), function ($query) use ($parameters) {
                $query->whereHas('collections', function ($query) use ($parameters) {
                    $query->where('id', $parameters['selectedCollection']);
                });
            })
            ->when(!empty($parameters['selectedConfirmation']), function ($query) use ($parameters) {
                $query->whereHas('confirmations');
            });

        return $observations->orderBy('observations.id', 'desc');
    }
}
