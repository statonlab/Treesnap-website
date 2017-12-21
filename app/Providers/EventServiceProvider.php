<?php

namespace App\Providers;

use App\Events\InvitationCreated;
use App\Events\ObservationCreated;
use App\Events\ObservationDeleted;
use App\Events\ObservationUpdated;
use App\Events\UserJoinedGroup;
use App\Listeners\AddAddressToObservation;
use App\Listeners\BroadcastObservationDeleted;
use App\Listeners\BroadcastObservationUpdated;
use App\Listeners\ClearObservationsCache;
use App\Listeners\CreateObservationThumbnails;
use App\Listeners\NotifyGroupLeaderOfNewUser;
use App\Listeners\SendInvitation;
use App\Listeners\ShareCollectionsWithNewGroupMember;
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
        ObservationCreated::class => [
            AddAddressToObservation::class,
            ClearObservationsCache::class,
            CreateObservationThumbnails::class,
        ],
        ObservationUpdated::class => [
            CreateObservationThumbnails::class,
            BroadcastObservationUpdated::class,
        ],
        ObservationDeleted::class => [
            ClearObservationsCache::class,
            BroadcastObservationDeleted::class,
        ],
        InvitationCreated::class => [
            SendInvitation::class,
        ],
        UserJoinedGroup::class => [
            ShareCollectionsWithNewGroupMember::class,
            NotifyGroupLeaderOfNewUser::class,
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
