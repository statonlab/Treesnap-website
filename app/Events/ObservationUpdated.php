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
     * Whether to broadcast the action.
     *
     * @var bool
     */
    public $broadcast;

    /**
     * Create a new event instance.
     *
     * @param Observation $observation The updated observation
     * @param bool $broadcast Whether to broadcast the update event. This allows
     *                          the mobile app to update their local records.
     * @return void
     */
    public function __construct(Observation $observation, $broadcast = false)
    {
        $this->observation = $observation;
        $this->broadcast = $broadcast;
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
