<?php

namespace App\Http\Controllers;

use App\Contact;
use App\Http\Controllers\Traits\Responds;
use App\Mail\ContactRequest;
use App\Mail\ContactUser;
use Illuminate\Http\Request;
use ReCaptcha\ReCaptcha;
use Mail;

class ContactController extends Controller
{
    use Responds;

    /**
     * Contact administrators.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function send(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|min:3',
            'email' => 'required|email',
            'subject' => 'required',
            'message' => 'required',
            'recaptcha' => 'required',
        ]);

        $recaptcha = new ReCaptcha(config('services.google.recaptcha'));
        $verify = $recaptcha->verify($request->recaptcha, $request->ip());

        if (! $verify->isSuccess()) {
            return $this->validationError([
                'recaptcha' => ['Please verify you are not a robot.'],
            ]);
        }

        Mail::to(config('mail.from.address'))->queue(new ContactRequest((object) $request->all()));
    }
}
