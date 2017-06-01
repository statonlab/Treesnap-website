<?php

namespace App\Http\Controllers;

use App\Email;
use App\Http\Controllers\Traits\Responds;
use App\User;
use Carbon\Carbon;
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

    /**
     * Get authenticated user information.
     *
     * @param \Illuminate\Http\Request $request
     * @return mixed
     */
    public function show(Request $request)
    {
        $user = $request->user();

        return $this->success([
            'name' => $user->name,
            'email' => $user->email,
            'is_anonymous' => $user->is_anonymous,
            'birth_year' => $user->birth_year,
        ]);
    }

    /**
     * Update user info.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request)
    {
        $user = $request->user();

        $rules = '';

        if ($user->email !== $request->email) {
            $rules = '|unique:users,email';
        }

        $today = Carbon::now()->year;
        $century = $today - 101;

        $this->validate($request, [
            'name' => 'required|min:3',
            'email' => 'required|email'.$rules,
            'is_anonymous' => 'required|boolean',
            'birth_year' => "required|integer|max:{$today}|min:{$century}",
        ]);

        $user->fill([
            'name' => $request->name,
            'email' => $request->email,
            'is_anonymous' => $request->is_anonymous,
            'birth_year' => $request->birth_year
        ])->save();

        return $this->success([
            'name' => $user->name,
            'email' => $user->email,
            'is_anonymous' => $user->is_anonymous,
        ]);
    }

    /**
     * Update user password.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updatePassword(Request $request)
    {
        $user = $request->user();

        $this->validate($request, [
            'old_password' => 'required',
            'new_password' => 'required|min:6|confirmed',
        ]);

        if (auth()->attempt(['email' => $user->email, 'password' => $request->old_password])) {
            $user->password = bcrypt($request->new_password);

            return $this->success('Password updated successfully.');
        }

        return $this->validationError(['password' => ['Incorrect old password']]);
    }
}
