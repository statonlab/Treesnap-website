<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Traits\Responds;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Mail;
use App\Mail\ContactUser;
use App\Contact;

class ContactController extends Controller
{
    use Responds;

    /**
     * Contact a user about an observation.
     *
     * @param \Illuminate\Http\Request $request
     */
    public function contactUser(Request $request)
    {
        $this->validate($request, [
            'recipient' => 'required|integer|exists:users,id',
            'from' => 'required|email',
            'observation_id' => 'nullable|exists:observations,id',
            'cc' => 'nullable',
            'subject' => 'required|max:100',
            'message' => 'required',
            'include_observation' => 'required|boolean',
        ]);

        // Validate CC
        $all_cc = [];
        if (! empty($request->cc)) {
            $cc = explode(',', $request->cc);
            if (count($cc) > 0) {
                foreach ($cc as $email) {
                    $email = trim($email);
                    if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
                        return $this->validationError(['cc' => ["The field cc/bcc contains {$email}, which is an invalid email address."]]);
                    }
                    $all_cc[] = $email;
                }
            }
        }

        $user = $request->user();

        $contact = Contact::create([
            'user_id' => $user->id,
            'from' => $request->from,
            'recipient_id' => $request->recipient,
            'observation_id' => $request->observation_id,
            'cc' => $all_cc,
            'include_observation' => $request->include_observation,
        ]);

        Mail::queue(new ContactUser($contact, $request->subject, $request->message));

        return $this->success('Message sent successfully');
    }
}
