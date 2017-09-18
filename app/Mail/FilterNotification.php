<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class FilterNotification extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * User to notify.
     *
     * @var \App\User
     */
    public $user;

    /**
     * Observations to include in notification.
     *
     * @var mixed
     */
    public $observations;

    /**
     * Filter.
     *
     * @var \App\Filter
     */
    public $filter;

    /**
     * Total observations.
     *
     * @var int
     */
    public $total;

    public $i = 0;

    /**
     * Create a new message instance.
     *
     * @param \App\User $user The user to send to.
     * @param  mixed $observations observations collection to include in the email.
     * @param int $total total number of available observations.
     * @param \App\Filter $filter the filter in question.
     * @return void
     */
    public function __construct($user, $observations, $total, $filter)
    {
        $this->user = $user;
        $this->observations = $observations;
        $this->total = $total;
        $this->filter = $filter;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $this->from(config('mail.from.address'));
        $this->to($this->user->email);

        return $this->markdown('emails.filter_notification');
    }
}
