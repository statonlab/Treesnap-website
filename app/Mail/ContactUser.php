<?php

namespace App\Mail;

use App\Contact;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ContactUser extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Contact request.
     *
     * @var \App\Contact
     */
    public $contact;

    /**
     * Observation information table.
     *
     * @var array
     */
    public $table = [];

    /**
     * Email of receiver.
     *
     * @var string
     */
    protected $_to = '';

    /**
     * CC
     *
     * @var array
     */
    protected $_cc = [];

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Contact $contact)
    {
        $this->contact = $contact;

        $receiver = $contact->recipient;
        $this->_to = $receiver->email;

        if ($contact->include_observation) {
            $this->table = [];

            $observation = $contact->observation;

            $category = $observation->observation_category;
            if ($category === 'Other') {
                $category .= " ({$observation->data['otherLabel']})";
            }
            $this->table['Category'] = $category;

            if ($observation->address) {
                $this->table['Found Near'] = $observation->address['formatted'];
            }

            $this->table['Date Collected'] = $observation->collection_date->toFormattedDateString();
        }
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from($this->contact->from)
            ->replyTo($this->contact->from)
            ->to($this->_to)
            ->cc($this->_cc)
            ->markdown('emails.contact-user');
    }
}
