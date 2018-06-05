<?php

namespace App\Http\Controllers;

use App\Collection;
use App\Filter;
use App\Group;
use App\Http\Controllers\Traits\DealsWithObservationPermissions;
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
    use Responds, Observes, DealsWithObservationPermissions;

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

        $observations = $this->getFilteredObservations($request);

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
     * Apply observation filters.
     *
     * @param Request $request
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    protected function getFilteredObservations(Request $request)
    {
        $user = $request->user();

        if (empty($request->per_page)) {
            $request->per_page = 6;
        }

        $with = [
            'collections' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            },
            'flags' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            },
            'confirmations' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            },
            'user',
        ];

        if (! empty($request->collection_id)) {
            $observations = $user->collections()->findOrFail($request->collection_id)->observations();
            $observations = $this->addPrivacyClause($observations, $user);
            $observations = $observations->with($with);
        } elseif (! empty($request->group_id)) {
            $observations = $user->groups()
                ->wherePivot('share', true)
                ->findOrFail($request->group_id)
                ->observations()
                ->with($with);
        } else {
            $observations = Observation::with($with)->where('user_id', $user->id);
        }

        if (! empty($request->advanced_filters)) {
            $rules = json_decode($request->advanced_filters);
            $observations = Filter::apply((array)$rules, $observations);
        }

        if (! empty($request->category)) {
            $observations->where('observation_category', $request->category);
        }

        if (! empty($request->search)) {
            $term = $request->search;
            $observations->where(function ($query) use ($term) {
                $query->where('observation_category', 'like', "%$term%");
                $query->orWhere('data->otherLabel', 'like', "%$term%");
                $query->orWhere('address->formatted', 'like', "%$term%");
            });
        }

        if (! empty($request->advanced_filter)) {
            $observations = $this->applyAdvancedFilter($request, $observations);
        }

        return $observations->orderBy('id', 'desc')->paginate($request->per_page);
    }

    /**
     * Apply advanced filters.
     *
     * @param \Illuminate\Http\Request $request
     * @param Observation $observations
     * @return \App\Observation
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    protected function applyAdvancedFilter(Request $request, $observations)
    {
        $filter = Filter::find($request->advanced_filter);
        $this->authorize('view', $filter);

        return Filter::apply($filter->rules, $observations);
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
