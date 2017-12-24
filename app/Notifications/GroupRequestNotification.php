<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class GroupRequestNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Group request.
     *
     * @var \App\GroupRequest
     */
    protected $group_request;

    /**
     * Create a new notification instance.
     *
     * @param \App\GroupRequest $group_request
     * @return void
     */
    public function __construct($group_request)
    {
        $this->group_request = $group_request;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  \App\User $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $user = $this->group_request->user;
        $group = $this->group_request->group;
        $sub_name = strlen($group->name) > 15 ? substr($group->name, 0, 15).'...' : $group->name;

        return (new MailMessage)->subject("{$user->name} Wants to Join {$sub_name}")
            ->greeting('Hello '.$notifiable->name)
            ->line("{$user->name} would like to join your group \"{$group->name}\". You can choose to accept or reject the request from your group's page.")
            ->action('Show All Requests', url("/account/group/{$group->id}"))
            ->line('Thank you for using our TreeSnap!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [//
        ];
    }
}
