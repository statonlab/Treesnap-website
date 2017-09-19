<?php

namespace App\Listeners;

use App\Action;
use App\Events\ObservationDeleted;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class BroadcastObservationDeleted implements ShouldQueue
{
    use InteractsWithQueue;

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
     * @param  ObservationDeleted $event
     * @return void
     */
    public function handle(ObservationDeleted $event)
    {
        $observation = $event->observation;

        if ($observation === null) {
            return;
        }

        Action::create([
            'user_id' => $observation['user_id'],
            'name' => 'observation_deleted',
            'data' => [
                'observation_id' => $observation['id'],
            ]
        ]);
    }
}
