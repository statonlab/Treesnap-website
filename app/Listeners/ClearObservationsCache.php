<?php

namespace App\Listeners;

use App\Events\ObservationCreated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Cache;

class ClearObservationsCache implements ShouldQueue
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
     * @param  ObservationCreated $event
     * @return void
     */
    public function handle(ObservationCreated $event)
    {
        Cache::tags('observations')->flush();
    }
}
