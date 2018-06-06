<?php

namespace App\Notifications;

use App\Flag;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class FlagCreatedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * The created flag.
     *
     * @var \App\Flag
     */
    protected $flag;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Flag $flag)
    {
        $this->flag = $flag;
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
        return (new MailMessage)->greeting('Hello '.$notifiable->name.',')
            ->error()
            ->line('An observation has been flagged. The reason specified is:')
            ->line($this->flag->reason)
            ->line($this->flag->comments)
            ->action('See All Flags', url('/'))
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
        return [
        ];
    }
}
