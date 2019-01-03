<?php

namespace App\Http\Controllers\Traits;

use App\Observation;
use App\User;

trait DealsWithObservationPermissions
{
    /**
     * Checks if a user has privileged access to an observation.
     *
     * @param User $user
     * @param Observation $observation
     * @return bool True if user has privileged access or false otherwise.
     */
    protected function hasPrivilegedPermissions($user, Observation $observation)
    {
        // Non-authenticated users can't access private information
        if (! $user) {
            return false;
        }

        // Owners can access the observation private information
        if ($user->id === $observation->user_id) {
            return true;
        }

        // Admins and scientists can access the observation
        if ($user->isAdmin() || $user->isScientist()) {
            return true;
        }

        // Check if the owner has shared this observation with the user
        return $user->hasFriend($observation->user_id);
    }

    /**
     * Removes private observations that don't belong to the current user
     * from the results but keep private observations that the user owns
     *
     * NOTE: this query does consider groups! Members of the same group
     * have the ability to see each others observations if the member
     * is sharing the observation with the user.
     *
     * @param \Illuminate\Database\Eloquent\Model $observations
     * @param \App\User $user
     * @return mixed
     */
    protected function addPrivacyClause(&$observations, User $user)
    {
        $friends = array_unique($user->friends() + [$user->id]);

        // WHERE (user_id IN ($user->id, FRIENDS_IDS) AND is_private BETWEEN [0, 1])
        //    OR (user_id NOT IN ($user->id, FRIENDS_IDS) AND is_private = 0)
        return $observations->where(function ($query) use ($user, $friends) {
            $query->where(function ($query) use ($user, $friends) {
                /** @var \Eloquent $query */
                $query->whereIn('user_id', $friends);
                $query->whereBetween('is_private', [0, 1]);
            })->orWhere(function ($query) use ($user, $friends) {
                /** @var \Eloquent $query */
                $query->whereNotIn('user_id', $friends);
                $query->where('is_private', false);
            });
        });
    }
}
