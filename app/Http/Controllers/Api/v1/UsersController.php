<?php

namespace App\Http\Controllers\Api\v1;

use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\v1\Responds;
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
          'is_over_thirteen' => $user->is_over_thirteen,
          'zipcode' => $user->zipcode,
          'email' => $user->email,
          'is_anonymous' => $user->is_anonymous,
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
            return $this->error($validator->errors(), 200);
        }

        $api_token = $this->generateAPIToken();

        $user = User::create([
          'name' => $request->name,
          'email' => $request->email,
          'password' => bcrypt($request->password),
          'is_over_thirteen' => $request->is_over_thirteen,
          'is_anonymous' => $request->is_anonymous,
          'zipcode' => $request->zipcode,
          'api_token' => $api_token,
        ]);

        if (!$user) {
            return $this->error('Unable to create new user.', 100);
        }

        return $this->created([
          'user_id' => $user->id,
          'name' => $user->name,
          'email' => $user->email,
          'is_over_thirteen' => $user->is_over_thirteen,
          'is_anonymous' => $user->is_anonymous,
          'zipcode' => $user->zipcode,
          'api_token' => $api_token,
        ]);
    }

    /**
     * Update an existing user.
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
            return $this->error($validator->errors(), 200);
        }

        $update = $user->update([
          'name' => $request->name,
          'email' => $request->email,
          'password' => bcrypt($request->password),
          'is_over_thirteen' => $request->is_over_thirteen,
          'is_anonymous' => $request->is_anonymous,
          'zipcode' => $request->zipcode,
        ]);

        if (!$update) {
            return $this->error('Unable to update record.', 101);
        }

        return $this->created([
          'name' => $user->name,
          'email' => $user->email,
          'is_over_thirteen' => $user->is_over_thirteen,
          'is_anonymous' => $user->is_anonymous,
          'zipcode' => $user->zipcode,
        ]);
    }

    /**
     * Generates a validator.
     *
     * @param $data
     * @param bool $is_update
     * @param null $user
     * @return mixed
     */
    protected function makeValidation($data, $is_update = false, $user = null)
    {
        $rules = [
          'email' => 'required|email',
        ];

        if ($is_update) {
            if ($data['email'] != $user->email) {
                $rules['email'] .= '|unique:users';
            }
        } else {
            $rules['email'] .= '|unique:users';
        }

        return Validator::make($data, array_merge([
          'name' => 'required|min:3',
          'password' => 'required|min:6',
          'is_over_thirteen' => 'required|boolean',
          'is_anonymous' => 'boolean',
          'zipcode' => [
            'min:5',
            'max:10',
            'regex:/^([0-9]{5})(-[0-9]{4})?$/i',
          ],
        ], $rules));
    }

    /**
     * Generates a unique API Token
     * @return string
     */
    protected function generateAPIToken()
    {
        // Make sure the random string is 100% unique to our database
        $str = str_random(60);
        while (!User::where('api_token', $str)->get()->isEmpty()) {
            $str = str_random(60);
        }

        return $str;
    }
}
