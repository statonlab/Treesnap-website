<?php

namespace App\Listeners;

use App\Events\ObservationCreated;
use App\Events\ObservationDeleted;
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
     * @param  ObservationCreated|ObservationDeleted $event
     * @return void
     */
    public function handle($event)
    {
        Cache::tags('observations')->flush();
    }
}
