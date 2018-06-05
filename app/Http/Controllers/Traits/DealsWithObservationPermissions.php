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
     * NOTE: this query does not consider groups! We can add groups
     * support by getting all friends' ids and adding a WHERE IN
     *
     * @param \Eloquent $observations
     * @param \App\User $user
     * @return mixed
     */
    protected function addPrivacyClause(&$observations, User $user)
    {
        // WHERE (user_id = $user->id AND is_private BETWEEN [0, 1])
        //    OR (user_id != $user->id AND is_private = 0)
        return $observations->where(function ($query) use ($user) {
            $query->where(function ($query) use ($user) {
                /** @var \Eloquent $query */
                $query->where('user_id', $user->id);
                $query->whereBetween('is_private', [0, 1]);
            })->orWhere(function ($query) use ($user) {
                /** @var \Eloquent $query */
                $query->where('user_id', '!=', $user->id);
                $query->where('is_private', false);
            });
        });
    }
}
