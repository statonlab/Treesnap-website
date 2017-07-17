<?php

namespace App\Listeners;

use App\Events\InvitationCreated;
use App\Mail\InvitationMail;
use App\Notifications\InvitationNotification;
use App\User;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Mail;

class SendInvitation implements ShouldQueue
{
    use InteractsWithQueue;

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  InvitationCreated $event
     * @return void
     */
    public function handle(InvitationCreated $event)
    {
        $invite = $event->invite;

        $user = User::where('email', $invite->email)->first();
        if($user) {
            $user->notify(new InvitationNotification($invite));
            return;
        }

        Mail::queue(new InvitationMail($invite));
    }
}
