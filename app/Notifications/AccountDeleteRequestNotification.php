<?php

namespace App\Notifications;

use App\DeleteAccountRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AccountDeleteRequestNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(protected DeleteAccountRequest $request)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param mixed $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->replyTo($this->request->user->email)
            ->line($this->request->user->name.' has requested to delete their account.')
            ->when($this->request->reason, function ($message) {
                $message->line('Reason: "'.$this->request->reason.'"');
            })
            ->action('View Request',
                url('/admin/delete-account-requests/'.$this->request->id))
            ->line('Thank you for using our application!');
    }
}
