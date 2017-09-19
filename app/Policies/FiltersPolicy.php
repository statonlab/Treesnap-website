<?php

namespace App\Policies;

use App\User;
use App\Filter;
use Illuminate\Auth\Access\HandlesAuthorization;

class FiltersPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the filter.
     *
     * @param  \App\User  $user
     * @param  \App\Filter  $filter
     * @return mixed
     */
    public function view(User $user, Filter $filter)
    {
        return $user->id === $filter->user_id;
    }

    /**
     * Determine whether the user can create filters.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can update the filter.
     *
     * @param  \App\User  $user
     * @param  \App\Filter  $filter
     * @return mixed
     */
    public function update(User $user, Filter $filter)
    {
        return $user->id === $filter->user_id;
    }

    /**
     * Determine whether the user can delete the filter.
     *
     * @param  \App\User  $user
     * @param  \App\Filter  $filter
     * @return mixed
     */
    public function delete(User $user, Filter $filter)
    {
        return $user->id === $filter->user_id;
    }
}
