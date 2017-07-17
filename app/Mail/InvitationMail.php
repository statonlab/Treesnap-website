<?php

namespace App\Mail;

use App\Invite;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class InvitationMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $sender;

    public $group;

    public $token;

    public $id;

    protected $invite;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Invite $invite)
    {
        $this->invite = $invite;
        $this->sender = $invite->user->name;
        $this->group = $invite->group->name;
        $this->token = $invite->token;
        $this->id = $invite->id;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('noreply@treesnap.com')
                    ->to($this->invite->email)
                    ->subject("$this->sender Sent You an Invite on TreeSnap")
                    ->markdown('emails.group-invitation');
    }
}
