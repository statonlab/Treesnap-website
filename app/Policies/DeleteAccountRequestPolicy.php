<?php

namespace App\Policies;

use App\DeleteAccountRequest;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DeleteAccountRequestPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param \App\User $user
     * @return bool
     */
    public function viewAny(User $user): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param \App\User $user
     * @param \App\DeleteAccountRequest $deleteAccountRequest
     * @return bool
     */
    public function view(User $user, DeleteAccountRequest $deleteAccountRequest): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can create models.
     *
     * @param \App\User $user
     * @return bool
     */
    public function create(User $user): bool
    {
        return !!$user;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param \App\User $user
     * @param \App\DeleteAccountRequest $deleteAccountRequest
     * @return bool
     */
    public function update(User $user, DeleteAccountRequest $deleteAccountRequest): bool
    {
        return $user->isAdmin() || $user->id === $deleteAccountRequest->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param \App\User $user
     * @param \App\DeleteAccountRequest $deleteAccountRequest
     * @return bool
     */
    public function delete(User $user, DeleteAccountRequest $deleteAccountRequest): bool
    {
        return $this->update($user, $deleteAccountRequest);
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param \App\User $user
     * @param \App\DeleteAccountRequest $deleteAccountRequest
     * @return bool
     */
    public function restore(User $user, DeleteAccountRequest $deleteAccountRequest): bool
    {
        return $this->update($user, $deleteAccountRequest);
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param \App\User $user
     * @param \App\DeleteAccountRequest $deleteAccountRequest
     * @return bool
     */
    public function forceDelete(User $user, DeleteAccountRequest $deleteAccountRequest): bool
    {
        return $this->update($user, $deleteAccountRequest);
    }
}
