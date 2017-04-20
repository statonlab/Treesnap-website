<?php

namespace App\Listeners;

use App\Events\ObservationCreated;
use App\Services\Geocoder;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class AddAddressToObservation implements ShouldQueue
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
        $observation = $event->observation;
        $address = Geocoder::address($observation->latitude, $observation->longitude);
        if (! $address) {
            return;
        }

        $observation->fill([
            'address' => [
                'components' => $address->results[0]->address_components,
                'formatted' => $address->results[0]->formatted_address,
            ],
        ])->save();
    }
}
