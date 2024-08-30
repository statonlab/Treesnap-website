<?php
/**
 * Created by PhpStorm.
 * User: Almsaeed
 * Date: 7/17/17
 * Time: 8:38 AM
 */

namespace App\Http\Controllers\Traits;
use App\Invite;
use Carbon\Carbon;

trait InvitesToGroups
{
    /**
     * Number of invitations allowed to be send by regular users.
     * Scientists and admins are not throttled.
     *
     * @var int
     */
    protected $throttle = 10;

    /**
     * Status interpreter.
     *
     * @var array
     */
    protected $status = [
        'pending' => 0,
        'accepted' => 1,
        'rejected' => 2,
    ];

    /**
     * Create an invitation record.
     *
     * @param $user
     * @param $group
     * @param $request
     * @return mixed
     */
    protected function createInvitation($user, $group, $request)
    {
        $rand = str_random(60);
        while (Invite::where('token', $rand)->first()) {
            // Key already exists so generate a new one
            $rand = str_random(60);
        }

        return Invite::create([
            'user_id' => $user->id,
            'group_id' => $group->id,
            'email' => $request->email,
            'status' => 0,
            'token' => $rand,
            'expires_at' => Carbon::now()->addYear(),
        ]);
    }

    /**
     * Check if there is an invitation pending or
     *
     * @param $user
     * @param $request
     * @return mixed
     */
    protected function checkExistingInvitation($user, $request)
    {
        // Make sure there isn't an newly sent invitation
        // and that the invitee hasn't accepted the
        // invitation already.
        $invite = Invite::where(function ($query) use ($user, $request) {
            $query->where('user_id', $user->id);
            $query->where('group_id', $request->group_id);
            $query->where('email', $request->email);
        })->first();

        if (! $invite) {
            return false;
        }

        if (($invite->status === $this->status['pending'] && ! $this->hasExpired($invite->expires_at)) || $invite->status === $this->status['pending']) {
            return $invite;
        }

        return false;
    }

    /**
     * Check whether invitation is expired.
     *
     * @param $expires_at
     * @return bool
     */
    protected function hasExpired($expires_at)
    {
        return Carbon::now()->gte($expires_at);
    }

    /**
     * Handle invitation exists errors.
     *
     * @param $invite
     * @return \Illuminate\Http\JsonResponse
     */
    protected function handleUnableToSendInvitationErrors($invite)
    {
        if ($invite->status === $this->status['accepted']) {
            return $this->error('The email entered already accepted this invitation.', 300, 400);
        }

        if ($invite->status === $this->status['rejected']) {
            return $this->error('The user has previously rejected this invitation.', 300, 400);
        }

        return $this->error('Invitation already sent to this email. You must wait at least 24 hours before sending another invitation.', 300, 400);
    }

    /**
     * Check throttle limit.
     *
     * @param $user
     * @return bool
     */
    protected function exceededThrottleLimit($user)
    {
        // Throttle invitations for non-admins
        if (! $user->isAdmin() && ! $user->isScientist()) {
            // Count the invitations sent within the last 24 hours
            $count = Invite::where(function ($query) use ($user) {
                $query->where('user_id', $user->id);
                $query->where('created_at', '>=', Carbon::now()->subDay());
            })->count();

            return $count >= $this->throttle;
        }

        return false;
    }
}
