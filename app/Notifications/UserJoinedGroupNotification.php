<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class UserJoinedGroupNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * User who joined.
     *
     * @var \App\User
     */
    protected $user;

    /**
     * Group that the user joined.
     *
     * @var \App\Group
     */
    protected $group;

    /**
     * Create a new notification instance.
     *
     * @param \App\User $user
     * @param \App\Group $group
     * @return void
     */
    public function __construct($user, $group)
    {
        $this->user = $user;
        $this->group = $group;
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
        // Get the sharing permissions
        $group = $this->user->groups()->where('groups.id', $this->group->id)->first();

        $line = '';
        if ($group->pivot->share) {
            $line = ' and view each other\'s observations';
        }

        return (new MailMessage)->subject("{$this->user->name} Accepted Your Invite.")
            ->greeting("Hello  {$notifiable->name}")
            ->line("{$this->user->name} has accepted your invitation to join your group \"{$this->group->name}\".")
            ->line("You can now share collections on TreeSnap.org{$line}")
            ->action('Visit Group Page', url("/account/group/{$this->group->id}"))
            ->line('Thank you for using our application!');
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
