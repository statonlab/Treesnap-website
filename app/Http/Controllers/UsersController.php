<?php

namespace App\Http\Controllers;

use App\Email;
use App\Http\Controllers\Traits\Responds;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    use Responds;

    /**
     * Get the user logged in status.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function status(Request $request)
    {
        if (! $request->wantsJson() || ! $request->ajax()) {
            return abort(401, 'Unauthorized');
        }

        $data = [];

        if (auth()->check()) {
            $data['logged_in'] = true;
            if (auth()->user()->isAdmin()) {
                $data['is_admin'] = true;
            }
        }

        return $this->success($data);
    }

    /**
     * Subscribe users to the mailing list.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function subscribe(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email|unique:emails,email',
        ]);

        Email::create([
            'email' => $request->email,
        ]);

        return $this->success('Subscribed successfully');
    }
}
