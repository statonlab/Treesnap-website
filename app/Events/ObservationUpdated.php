<?php

namespace App\Events;

use App\Observation;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ObservationUpdated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * The updated observation.
     *
     * @var \App\Observation
     */
    public $observation;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Observation $observation)
    {
        $this->observation = $observation;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
