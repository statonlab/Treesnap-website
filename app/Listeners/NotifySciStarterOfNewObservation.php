<?php

namespace App\Listeners;

use App\Http\Resources\SciStarterResource;
use Illuminate\Contracts\Queue\ShouldQueue;
use Exception;

class NotifySciStarterOfNewObservation implements ShouldQueue
{
    /**
     * NotifySciStarterOfNewObservation constructor.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\ObservationCreated $event
     * @return void
     */
    public function handle($event)
    {
        $observation = $event->observation;
        $sci_starter = new SciStarterResource();
        $profile_id = $sci_starter->profile($observation->user);

        if ($profile_id) {
            try {
                $sci_starter->event($profile_id, 'collection', [
                    'when' => $observation->collection_date->format('Y-MM-DD\THH:mm:ss'),
                    'extra' => json_encode([
                        'title' => $observation->observation_category === 'Other' ? $observation->data['otherLabel'] : $observation->observation_category,
                    ]),
                ]);
            } catch (Exception $exception) {
                \Log::error($exception->getMessage());
            }
        }
    }
}
