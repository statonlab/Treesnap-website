<?php

namespace App\Listeners;

use App\Http\Resources\SciStarterResource;
use Carbon\Carbon;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Exception;

class AddUserToSciStarter implements ShouldQueue
{
    /**
     * Handle the event.
     *
     * @param  \Illuminate\Auth\Events\Registered $event
     * @return void
     */
    public function handle($event)
    {
        // Don't run this code in tests
        if (app()->environment() === 'testing') {
            return;
        }

        /** @var \App\User $user */
        $user = $event->user;
        $sci_starter = new SciStarterResource();
        $profile_id = $sci_starter->profile($user);
        if ($profile_id) {
            try {
                $sci_starter->event($profile_id, 'signup', [
                    'when' => Carbon::now('UTC')->format('Y-MM-DD\THH:mm:ss'),
                ]);
            } catch (Exception $exception) {
                // ignore for now. nothing to report to.
            }
        }
    }
}
