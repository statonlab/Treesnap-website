<?php

namespace App\Events;

use App\Group;
use App\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;

class UserJoinedGroup implements ShouldQueue
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * User who joined.
     *
     * @var \App\User
     */
    public $user;

    /**
     * Group that got joined.
     *
     * @var \App\Group
     */
    public $group;

    /**
     * Create a new event instance.
     *
     * @param  User $user
     * @param Group $group
     * @return void
     */
    public function __construct(User $user, Group $group)
    {
        $this->user = $user;
        $this->group = $group;
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
