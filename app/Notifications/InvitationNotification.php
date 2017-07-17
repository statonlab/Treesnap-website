<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use App\Invite;

class InvitationNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * The invitation request.
     *
     * @var \App\Invite
     */
    public $invite;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Invite $invite)
    {
        $this->invite = $invite;
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
     * @param  mixed $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $sender = $this->invite->user->name;
        $group = $this->invite->group->name;
        $token = $this->invite->token;
        $id = $this->invite->id;

        return (new MailMessage)->subject('You received an invitation on TreeSnap')
                                ->line("$sender invited you to join the group \"$group\" on TreeSnap. By accepting this invitation, you will be able to view, and contribute observations to the group.")
                                ->action('Accept Invitation', url("/invitations/accept/$id/?_t=$token"))
                                ->line('Thank you for using TreeSnap!');
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
