<?php

namespace App\Policies;

use App\Treet;
use App\User;
use Illuminate\Auth\Access\Response;

class TreetPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Treet $treet): bool
    {
        //
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->isAdmin();

    }

    /**
     * Determine whether the user can update the model.
     */
    public function edit(User $user): bool
    {
        return $user->isAdmin();

    }

    /**
     * Determine whether the user can delete the model.
     */
    public function destroy(User $user): bool
    {
        return $user->isAdmin();

    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Treet $treet): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Treet $treet): bool
    {
        //
    }
}
