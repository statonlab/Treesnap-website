<?php

namespace App\Listeners;

use App\Events\UserJoinedGroup;
use App\Notifications\UserJoinedGroupNotification;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifyGroupLeaderOfNewUser
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  UserJoinedGroup $event
     * @return void
     */
    public function handle($event)
    {
        $user = $event->user;
        $group = $event->group;

        $group->owner->notify(new UserJoinedGroupNotification($user, $group));
    }
}
