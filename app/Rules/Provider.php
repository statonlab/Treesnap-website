<?php

namespace App\Rules;

use App\User;
use Illuminate\Contracts\Validation\Rule;

class Provider implements Rule
{
    /**
     * Checks if the user exists.
     *
     * @var User
     */
    protected $user;

    /**
     * Determine if the validation rule passes.
     * If the user has signed up using a different provider (e.g, google),
     * Let the user know they can't sign in using email and password
     * and must use the same provider again.
     *
     * @param  string $attribute
     * @param  string $email
     * @return bool
     */
    public function passes($attribute, $email)
    {
        $user = User::where('email', $email)->whereNull('password')->first();

        $this->user = $user;

        if (! $user) {
            return true;
        }

        if ($user->provider !== 'treesnap') {

            return false;
        }

        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        $platform = ucwords($this->user->provider);

        return "You've previously used $platform to login. Please use $platform again.";
    }
}
