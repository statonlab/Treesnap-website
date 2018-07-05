<?php

namespace App\Http\Controllers\WebServices\v1\ResponseFormatters;

use App\Observation;
use App\User;

class ObservationResponse
{
    /**
     * The authenticated user.
     *
     * @var \App\User
     */
    protected $user;

    /**
     * ObservationResponse constructor.
     *
     * @param \App\User $user The authenticated user.
     * @param \App\Observation $observation The observation to format.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Get a formatted observation array.
     * TODO: Implement this
     * @param \App\Observation $observation
     * @return array
     */
    public function format(Observation $observation) {
        return $observation->toArray();
    }

    /**
     * Whether the user has privileged access to the observation.
     *
     * @param \App\Observation $observation
     * @return bool
     */
    protected function hasPrivilegedAccess(Observation $observation)
    {
        $role = $this->user->role->name;

        if (in_array(strtolower($role), ['admin', 'scientist'])) {
            return true;
        }

        if ($this->user->hasFriend($observation->user_id)) {
            return true;
        }

        return false;
    }
}
