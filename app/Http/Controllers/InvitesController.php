<?php

namespace App\Http\Controllers;

use App\Events\InvitationCreated;
use App\Group;
use App\Http\Controllers\Traits\CreatesUsers;
use App\Http\Controllers\Traits\InvitesToGroups;
use App\Http\Controllers\Traits\Responds;
use App\Invite;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\In;

class InvitesController extends Controller
{
    use Responds, InvitesToGroups, CreatesUsers, RegistersUsers, ThrottlesLogins;

    /**
     * Create and send a new invitation.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function newInvitation(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'group_id' => 'required|integer',
        ]);

        $user = $request->user();
        $group = Group::findOrFail($request->group_id);

        // Make sure the user owns the group
        if ($group->user_id !== $user->id) {
            return $this->unauthorized();
        }

        $invite = $this->checkExistingInvitation($user, $request);
        if ($invite) {
            return $this->handleUnableToSendInvitationErrors($invite);
        }

        if ($this->exceededThrottleLimit($user)) {
            return $this->error('You have reached the limit of invitations you may send per day. Please allow 24 hours before attempting again.', 300, 400);
        }

        // User may create an invitation.
        $invite = $this->createInvitation($user, $group, $request);

        event(new InvitationCreated($invite));

        return $this->success([
            'email' => $invite->email,
            'created_at' => $invite->created_at->toDateTimeString(),
        ]);
    }

    /**
     * Get group specific pending invites.
     *
     * @param int $group_id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function showPendingInvitations($group_id, Request $request)
    {
        $invites = Invite::select(['email', 'created_at'])->where([
            'user_id' => $request->user()->id,
            'status' => $this->status['pending'],
            'group_id' => $group_id,
        ])->whereDate('expires_at', '>', Carbon::now())->orderBy('id', 'desc')->get();

        return $this->success($invites);
    }

    /**
     * Accept an invitation.
     *
     * @param $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\View\View
     */
    public function accept($id, Request $request)
    {
        $this->validate($request, [
            '_t' => 'required',
        ]);

        $invite = Invite::with(['group', 'user'])->where('token', $request->_t)->findOrFail($id);

        if ($invite->status !== $this->status['pending']) {
            return view('invitations.handled')->with([
                'status' => $this->status['accepted'] ? 'accepted' : 'rejected',
                'invite' => $invite,
            ]);
        }

        return view('invitations.accept')->with([
            'invite' => $invite,
        ]);
    }

    protected function username()
    {
        return 'email';
    }

    /**
     * Accept invitation via login.
     *
     * @param $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function acceptLogin($id, Request $request)
    {
        session()->flash('login_attempt', true);

        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required|min:6',
            '_t' => 'required',
        ]);

        if ($this->hasTooManyLoginAttempts($request)) {
            return $this->sendLockoutResponse($request);
        }

        if (! auth()->attempt(['email' => $request->email, 'password' => $request->password])) {
            $this->incrementLoginAttempts($request);

            return redirect()->back()->withInput($request->only('email', 'remember'))->withErrors([
                'email' => 'Invalid credentials',
            ]);
        }

        $this->clearLoginAttempts($request);

        $user = auth()->user();
        $invite = Invite::where('token', $request->_t)->findOrFail($id);
        $invite->status = $this->status['accepted'];
        $invite->save();

        // Make sure the group exists
        Group::findOrFail($invite->group_id);

        $user->groups()->syncWithoutDetaching([$invite->group_id]);

        return redirect()->to("/account/group/{$invite->group_id}");
    }

    /**
     * Create a user then accept invitation.
     *
     * @param $id
     * @param \Illuminate\Http\Request $request
     */
    public function acceptRegister($id, Request $request)
    {
        session()->flash('login_attempt', false);

        $invite = Invite::where('token', $request->_t)->findOrFail($id);

        $user = $this->register($request);

        $invite->status = $this->status['accepted'];
        $invite->save();

        // Make sure the group exists
        Group::findOrFail($invite->group_id);

        $user->groups()->syncWithoutDetaching([$invite->group_id]);

        return redirect()->to("/account/group/{$invite->group_id}");
    }

    /**
     * Handle registered user.
     *
     * @param \Illuminate\Http\Request $request
     * @param $user
     * @return mixed
     */
    protected function registered(Request $request, $user)
    {
        return $user;
    }
}
