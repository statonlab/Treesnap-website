<?php

namespace App\Listeners;

use App\Events\UserJoinedGroup;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class ShareCollectionsWithNewGroupMember implements ShouldQueue
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

        // Find collections shared with this group
        $group->collections->map(function ($collection) use ($user) {
            $collection->users()->detach($user->id);
            $collection->users()->attach($user->id, [
                'can_customize' => $collection->pivot->can_customize,
                'is_shared_with_group' => true,
            ]);
        });
    }
}
