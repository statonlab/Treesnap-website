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
     * The body of the message.
     *
     * @var string
     */
    public $_message = '';

    /**
     * The subject.
     *
     * @var string
     */
    public $_subject = '';

    /**
     * Create a new message instance.
     *
     * @param Contact $contact
     * @param String $subject
     * @param String $message
     *
     * @return void
     */
    public function __construct(Contact $contact, $subject, $message, $_to = null)
    {
        // Set the queue
        $this->queue = 'contact';
        $this->contact = $contact;

        $receiver = $contact->recipient;
        $this->_to = ! is_null($_to) ? $_to : $receiver->email;
        $this->_message = $message;
        $this->_subject = $subject;

        if ($contact->include_observation) {
            $this->table = [];

            $observation = $contact->observation;

            $category = $observation->observation_category;
            if ($category === 'Other' && isset($observation->data['otherLabel'])) {
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
        return $this->from(config('mail.from.address'))
            ->replyTo($this->contact->from)
            ->to($this->_to)
            ->subject($this->_subject)
            ->markdown('emails.contact-user');
    }
}
