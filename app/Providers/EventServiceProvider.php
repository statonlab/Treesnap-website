<?php

namespace App\Providers;

use App\Listeners\AddAddressToObservation;
use App\Listeners\BroadcastObservationDeleted;
use App\Listeners\BroadcastObservationUpdated;
use App\Listeners\ClearObservationsCache;
use App\Listeners\CreateObservationThumbnails;
use App\Listeners\SendInvitation;
use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'App\Events\ObservationCreated' => [
            AddAddressToObservation::class,
            ClearObservationsCache::class,
            CreateObservationThumbnails::class,
        ],
        'App\Events\ObservationUpdated' => [
            CreateObservationThumbnails::class,
            BroadcastObservationUpdated::class,
        ],
        'App\Events\ObservationDeleted' => [
            ClearObservationsCache::class,
            BroadcastObservationDeleted::class,
        ],
        'App\Events\InvitationCreated' => [
            SendInvitation::class,
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();
        //
    }
}
