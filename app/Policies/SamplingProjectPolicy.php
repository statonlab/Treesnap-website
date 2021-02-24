<?php

namespace App\Policies;

use App\User;
use App\SamplingProject;
use Illuminate\Auth\Access\HandlesAuthorization;

class SamplingProjectPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can delete the sampling project.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can update the sampling project.
     *
     * @param  \App\User  $user
     * @param  \App\SamplingProject  $project
     * @return mixed
     */
    public function update(User $user, SamplingProject $project)
    {
        return $project->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the sampling project.
     *
     * @param  \App\User  $user
     * @param  \App\SamplingProject  $project
     * @return mixed
     */
    public function delete(User $user, SamplingProject $project)
    {
        return $project->user_id === $user->id;
    }
}
