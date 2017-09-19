<?php

namespace App\Listeners;

use App\Action;
use App\Events\ObservationUpdated;
use App\Http\Controllers\Traits\Observes;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class BroadcastObservationUpdated implements ShouldQueue
{
    use InteractsWithQueue, Observes;

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
     * @param  ObservationUpdated  $event
     * @return void
     */
    public function handle(ObservationUpdated $event)
    {
        if(!$event->broadcast) {
            return;
        }

        Action::create([
            'user_id' => $event->observation->user->id,
            'name' => 'observation_updated',
            'data' => $this->getObservationJson($event->observation, true, $event->observation->user)
        ]);
    }
}
