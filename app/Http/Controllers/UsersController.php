<?php

namespace App\Http\Controllers;

use App\Collection;
use App\Filter;
use App\Group;
use App\Http\Controllers\Traits\DealsWithObservationPermissions;
use App\Http\Controllers\Traits\FiltersObservations;
use App\User;
use App\Email;
use App\Http\Controllers\Traits\Observes;
use App\Http\Controllers\Traits\Responds;
use App\Observation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UsersController extends Controller
{
    use Responds, Observes, DealsWithObservationPermissions, FiltersObservations;

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
            'id' => $user->id,
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
            'birth_year' => $request->birth_year,
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

    /**
     * Get paginated observations for a user.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     *
     * @throws \Exception
     */
    public function observations(Request $request)
    {
        $this->validate($request, [
            'per_page' => 'nullable|in:6,12,24,48,96',
            'search' => 'nullable',
            'collection_id' => 'nullable|exists:collections,id',
            'category' => ['nullable', Rule::in($this->observation_categories)],
            'group_id' => 'nullable|exists:groups,id',
            'advanced_filter' => 'nullable|json',
        ]);

        $user = $request->user();
        $admin = User::hasRole(['scientist', 'admin'], $user);

        $observations = $this->getFilteredObservations($request)->paginate($request->per_page);;

        $data = [];
        foreach ($observations as $observation) {
            $data[] = $this->getObservationJson($observation, $admin, $user);
        }

        return $this->success(array_merge($observations->toArray(), [
            'data' => $data,
            'per_page' => $request->per_page,
            'count' => $observations->count(),
            'has_more_pages' => $observations->hasMorePages(),
            'collection_id' => $request->collection_id,
            'group_id' => $request->group_id,
        ]));
    }

    /**
     * Log users out.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function logout()
    {
        Auth::logout();

        return redirect()->to('/');
    }
}
