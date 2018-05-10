<?php

namespace App\Listeners;

use App\Events\ObservationCreated;
use App\Services\Thumbnail;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class CreateObservationThumbnails implements ShouldQueue
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
     * @param $event
     * @return void
     */
    public function handle($event)
    {
        $observation = $event->observation;
        $thumbnail = new Thumbnail($observation);
        $observation->thumbnail = $thumbnail->make();
        $observation->save();
    }
}
