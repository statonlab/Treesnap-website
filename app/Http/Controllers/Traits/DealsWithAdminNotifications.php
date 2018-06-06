<?php

namespace App\Http\Controllers\Traits;

trait DealsWithAdminNotifications
{
    protected $topics = [
        'flags' => 'Receive notifications when an observation is flagged',
        'contact' => 'Receive emails from Contact Us page',
    ];

    /**
     * Check if a user is subscribed to a topic.
     *
     * @param string $topic Topic
     * @param \App\User $user
     * @return bool
     */
    protected function isSubscribedTo($topic, $user)
    {

    }
}
