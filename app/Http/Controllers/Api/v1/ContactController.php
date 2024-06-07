<?php

namespace App\Http\Controllers\Api\v1;

use App\Contact;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\Responds;
use App\Mail\ContactRequest;
use App\Mail\ContactUser;
use App\User;
use Illuminate\Http\Request;
use ReCaptcha\ReCaptcha;
use Illuminate\Support\Facades\Mail;

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

        Mail::to($this->getSubscribedAdmins())->queue(new ContactRequest((object)$request->all()));

        return $this->success('Message Sent');
    }

    /**
     * Get all admin users who subscribed to contact requests.
     *
     * @return \App\User[]|\Illuminate\Database\Eloquent\Collection
     */
    protected function getSubscribedAdmins()
    {
        return User::with('role')->whereHas('subscriptionTopics', function ($query) {
            $query->where('key', 'contact');
        })->get()->reject(function ($user) {
            return $user->role->name !== 'Admin';
        })->map(function ($user) {
            return $user->email;
        });
    }
}
