<?php

namespace App\Http\Controllers;

use App\Collection;
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
    use Responds, Observes;

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
            'per_page' => 'nullable|in:6,12,24,48',
            'search' => 'nullable',
            'collection_id' => 'nullable|exists:collections,id',
            'category' => ['nullable', Rule::in($this->observation_categories)],
            'group_id' => 'nullable|exists:groups,id'
        ]);

        $user = $request->user();

        $observations = $this->getFilteredObservations($request);

        $data = [];
        foreach ($observations as $observation) {
            $json = $this->getObservationJson($observation, true, $user);
            $data[] = array_merge($json, ['user' => ['name' => $user->name, 'id' => $user->id]]);
        }

        return $this->success(array_merge($observations->toArray(), [
            'data' => $data,
            'per_page' => $request->per_page,
            'count' => $observations->count(),
            'has_more_pages' => $observations->hasMorePages(),
        ]));
    }

    /**
     * Apply observation filters.
     *
     * @param $request
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    protected function getFilteredObservations($request)
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
        ];

        if (! empty($request->collection_id)) {
            $observations = Collection::findOrFail($request->collection_id)->observations()->with($with);
        } else {
            $observations = Observation::with($with);
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

        return $observations->where('user_id', $user->id)->orderBy('id', 'desc')->paginate($request->per_page);
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
