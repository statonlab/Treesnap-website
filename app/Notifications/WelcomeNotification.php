<?php

namespace App\Notifications;

use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class WelcomeNotification extends Notification implements ShouldQueue
{
    use Queueable;

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
        return (new MailMessage)
            ->success()
            ->subject('Welcome to TreeSnap')
            ->greeting("Hello $notifiable->name,")
            ->line('Thank you for registering with TreeSnap!')
            ->line('TreeSnap offers users a variety of tools to track observations of interest. For
                    Example, you can add observations to collections, join groups to share collected data
                    and use the online map to find recorded observations based on location. TreeSnap
                    also allows users to set up notifications to stay up to date with new observations
                    based on a set of filtering criteria.')
            ->line('Scientists are provided with advanced tools to help them in identifying,
                    saving and exporting data. Scientists require privileged accounts to access
                    accurate locations to all available observations. Please contact us to request
                    scientist accounts.')
            ->action('Learn More About TreeSnap', url('/'))
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
