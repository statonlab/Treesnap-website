<?php

namespace App\Http\Controllers\Traits;

use App\Observation;
use App\User;
use Illuminate\Support\Facades\Validator;

trait MapQuery
{
    function queryObservations(array $parameters, User $user, $bounds)
    {
        $isAdmin = $user->isAdmin();
        $isScientist = $user->isScientist();
        $friends = $user->friends() + [$user->id];

        $observations = Observation::query()
            ->with('user', function ($query) {
//            $query->select([
//                'id',
//                'name',
//                'is_anonymous'
//            ]);
            })->withCount([
                'confirmations' => function ($query) {
                    $query->where('correct', true);
                },
            ])
            ->bounds($bounds)
            ->when($isAdmin || $isScientist, function ($query) {
                // Admin logic
                $query->select(['id', 'latitude', 'longitude']);
            }, function ($query) use ($friends) {
                // Non-admin logic
                // If the user is in the same group and is sharing then get latitude and longitude
                // If the user owns the observation, same as above
                // Otherwise, get fuzzy coords
                $query->selectRaw('id, IF(user_id in (?), latitude, null) as latitude, IF(user_id in (?), longitude, null) as longitude, fuzzy_coords',
                    [
                        $friends,
                        $friends,
                    ]);
            })
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
                $query->whereHas('user', function ($query) use ($parameters) {
                    $query->whereHas('confirmations', function ($query) use ($parameters) {
                        $query->where('correct');
                    });
                });
            });

        return $observations->orderBy('observations.id', 'desc');
    }
}
