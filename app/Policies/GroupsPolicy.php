<?php

namespace App\Policies;

use App\User;
use App\Group;
use Illuminate\Auth\Access\HandlesAuthorization;

class GroupsPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the group.
     *
     * @param  \App\User $user
     * @param  \App\Group $group
     * @return mixed
     */
    public function view(User $user, Group $group)
    {
        return $group->users()->where('users.id', $user->id)->count() > 0;
    }

    /**
     * Determine whether the user can create groups.
     *
     * @param  \App\User $user
     * @return mixed
     */
    public function create(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can update the group.
     *
     * @param  \App\User $user
     * @param  \App\Group $group
     * @return mixed
     */
    public function update(User $user, Group $group)
    {
        return $group->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the group.
     *
     * @param  \App\User $user
     * @param  \App\Group $group
     * @return mixed
     */
    public function delete(User $user, Group $group)
    {
        return $group->user_id === $user->id;
    }

    /**
     * Determine whether the user can exit the group.
     *
     * @param  \App\User $user
     * @param  \App\Group $group
     * @return mixed
     */
    public function exit(User $user, Group $group)
    {
        if(!$this->view($user, $group)) {
            return false;
        }

        if($group->user_id === $user->id) {
            return false;
        }

        return true;
    }
}
