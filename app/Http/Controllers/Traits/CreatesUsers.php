<?php

namespace App\Http\Controllers\Traits;

use App\Rules\Provider;
use ReCaptcha\ReCaptcha;
use Validator;
use App\User;
use App\Role;

trait CreatesUsers
{
    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */

    protected function validator(array $data)
    {

        $validator_array = [
            'name' => 'required|max:255',
            'email' => [
                'required',
                'email',
                'max:255',
                new Provider(),
                'unique:users',
            ],
            'password' => 'required|min:6|confirmed',
            'agreement' => 'required|boolean|in:1',
            'birth_year' => 'required|integer',
            'is_anonymous' => 'boolean',
            'share' => 'nullable|boolean',
            'zipcode' => [
                'nullable',
                'min:5',
                'max:10',
                'regex:/^([0-9]{5})(-[0-9]{4})?$/i',
            ],
            'recaptcha' => [
                'g-required',
                function ($attribute, $value, $fail) {
                    $recaptcha = new ReCaptcha(config('services.google.recaptcha'));
                    $verify = $recaptcha->verify($value, \Request::ip());
                    if (! $verify->isSuccess()) {
                        return $fail('Please verify you are not a robot');
                    }
                },
            ],
        ];

        $current_date = date("Y");

        if ($current_date - intval($data['birth_year'] < 13)) {
            array_merge($validator_array, ['minorConsent' => 'required|boolean|in:1',]);
        }

        return Validator::make($data, $validator_array, [
            'zipcode' => 'Please enter a valid zip code',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array $data
     * @return User|\Illuminate\Database\Eloquent\Model
     */
    protected function create(array $data)
    {
        $role = Role::where('name', 'User')->first();

        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'birth_year' => $data['birth_year'],
            'api_token' => $this->generateAPIToken(),
            'zipcode' => isset($data['zipcode']) ? $data['zipcode'] : '',
            'is_private' => false,
            'role_id' => $role->id,
            'units' => 'US',
        ]);
    }

    /**
     * Find the user with the given email or create a new one.
     *
     * @param $user
     * @return User|\Illuminate\Database\Eloquent\Model
     */
    protected function findOrCreateUser($user)
    {
        $role = Role::where('name', 'User')->first();

        return User::firstOrCreate([
            'email' => $user['email'],
        ], [
            'name' => $user['name'],
            'api_token' => $this->generateAPIToken(),
            'birth_year' => $user['birth_year'],
            'is_private' => false,
            'is_anonymous' => false,
            'role_id' => $role->id,
            'avatar' => null, // isset($user['avatar']) ? $user['avatar'] : null,
            'units' => 'US',
            'provider' => $user['provider'],
            'provider_id' => $user['provider_id'],
        ]);
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
