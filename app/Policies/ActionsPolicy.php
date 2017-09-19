<?php

namespace App\Policies;

use App\User;
use App\Action;
use Illuminate\Auth\Access\HandlesAuthorization;

class ActionsPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the action.
     *
     * @param  \App\User $user
     * @param  \App\Action $action
     * @return mixed
     */
    public function view(User $user, Action $action)
    {
        return $user->id === $action->user_id;
    }

    /**
     * Determine whether the user can create actions.
     *
     * @param  \App\User $user
     * @return mixed
     */
    public function create(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can update the action.
     *
     * @param  \App\User $user
     * @param  \App\Action $action
     * @return mixed
     */
    public function update(User $user, Action $action)
    {
        return $user->id === $action->user_id;
    }

    /**
     * Determine whether the user can delete the action.
     *
     * @param  \App\User $user
     * @param  \App\Action $action
     * @return mixed
     */
    public function delete(User $user, Action $action)
    {
        return $user->id === $action->user_id;
    }
}
