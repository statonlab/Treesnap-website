<?php

namespace App\Http\Controllers\Api\v1;

use App\Notifications\WelcomeNotification;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\Responds;
use Validator;

class UsersController extends Controller
{
    use Responds;

    /**
     * Get a user record.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request)
    {
        $user = $request->user();

        return $this->success([
            'id' => $user->id,
            'name' => $user->name,
            'zipcode' => $user->zipcode,
            'email' => $user->email,
            'is_anonymous' => $user->is_anonymous,
            'is_private' => $user->is_private,
            'birth_year' => $user->birth_year,
            'units' => $user->units,
        ]);
    }

    /**
     * Create a new user.
     * This method does not require an api_key to access.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        $validator = $this->makeValidation($request->all());

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $api_token = $this->generateAPIToken();

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'is_anonymous' => $request->is_anonymous !== null ? $request->is_anonymous : false,
            'is_private' => $request->is_private ? 1 : 0,
            'zipcode' => $request->zipcode,
            'api_token' => $api_token,
            'birth_year' => $request->birth_year,
            'units' => $request->units ? $request->units : 'US',
        ]);

        if (! $user) {
            return $this->error('Unable to create new user.', 100);
        }

        $user->notify(new WelcomeNotification());

        return $this->created([
            'user_id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'is_anonymous' => $user->is_anonymous,
            'is_private' => $user->is_private,
            'zipcode' => $user->zipcode,
            'birth_year' => $user->birth_year,
            'api_token' => $api_token,
            'units' => $user->units,
        ]);
    }

    /**
     * Update an existing user. This method does not allow password updates.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request)
    {
        $user = $request->user();

        $validator = $this->makeValidation($request->all(), true, $user);
        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $update = $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'is_anonymous' => $request->is_anonymous,
            'is_private' => $request->is_private ? 1 : 0,
            'birth_year' => $request->birth_year,
            'zipcode' => $request->zipcode,
            'units' => $request->units ? $request->units : 'US',
        ]);

        if (! $update) {
            return $this->error('Unable to update record.', 101);
        }

        return $this->created([
            'name' => $user->name,
            'email' => $user->email,
            'is_anonymous' => $user->is_anonymous,
            'is_private' => $user->is_private,
            'birth_year' => $user->birth_year,
            'zipcode' => $user->zipcode,
            'units' => $user->units,
        ]);
    }

    /**
     * Update an existing user's password.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updatePassword(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'new_password' => 'required|min:6|confirmed',
            'old_password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        if (! auth('web')->once(['email' => $user->email, 'password' => $request->old_password])) {
            return $this->validationError(['old_password' => ['Password does not match our records']]);
        }

        $user->update([
            'password' => bcrypt($request->new_password),
            'api_token' => $this->generateAPIToken(),
        ]);

        return $this->created(['api_token' => $user->api_token]);
    }

    /**
     * Authenticates a user using email and password.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        // Authenticate the user using email and password
        if (! auth()->attempt(['email' => $request->email, 'password' => $request->password])) {
            return $this->error('Invalid Credentials', 200);
        }

        // Return the api token to the user on success
        $user = auth()->user();

        return $this->success([
            'name' => $user->name,
            'api_token' => $user->api_token,
            'email' => $user->email,
            'zipcode' => $user->zipcode,
            'birth_year' => $user->birth_year,
            'is_anonymous' => $user->is_anonymous,
            'is_private' => $user->is_private,
            'units' => $user->units,
        ]);
    }

    /**
     * Update a single field.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function patchSingleField(Request $request)
    {
        $fields = $request->all();
        if (count($fields) !== 2) {
            return $this->error('Please provide a valid field');
        }

        $user = $request->user();
        $fields = collect(array_keys($fields));
        $field = $fields->filter(function ($f) {
            return $f !== 'api_token';
        })->first();
        $rules = $this->validationRules($fields, true, $user);

        if (isset($rules[$field])) {
            $this->validate($request, [
                $field => $rules[$field],
            ]);
        }

        $user->fill([
            $field => $request->{$field},
        ])->save();

        return $this->success([
            $field => $request->{$field},
        ]);
    }

    /**
     * Generates a validator.
     *
     * @param $data
     * @param bool $is_update
     * @param User $user
     * @return mixed
     */
    protected function makeValidation($data, $is_update = false, $user = null)
    {
        return Validator::make($data, $this->validationRules($data, $is_update, $user));
    }

    /**
     * @param $data
     * @param bool $is_update
     * @param User $user
     * @return array
     */
    protected function validationRules($data, $is_update = false, $user = null)
    {
        $rules = [
            'email' => 'required|email',
        ];

        if ($is_update && isset($data['email'])) {
            if ($data['email'] != $user->email) {
                $rules['email'] .= '|unique:users';
            }
        } else {
            $rules['password'] = 'required|min:6';
            $rules['email'] .= '|unique:users';
        }

        return array_merge([
            'name' => 'required|min:3',
            'is_anonymous' => 'nullable|boolean',
            'is_private' => 'nullable|boolean',
            'zipcode' => [
                'nullable',
                'min:5',
                'max:10',
                'regex:/^([0-9]{5})(-[0-9]{4})?$/i',
            ],
            'units' => 'nullable|in:US,metric',
        ], $rules);
    }

    /**
     * Generates a unique API Token
     *
     * @return string
     */
    protected function generateAPIToken()
    {
        // Make sure the random string is 100% unique to our database
        $str = str_random(60);
        while (! User::where('api_token', $str)->get()->isEmpty()) {
            $str = str_random(60);
        }

        return $str;
    }
}
