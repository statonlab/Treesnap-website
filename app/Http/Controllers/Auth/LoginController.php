<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\CreatesUsers;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Socialite;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers, CreatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/account';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest', ['except' => 'logout']);
    }

    /**
     * Redirect the user to the authentication screen where
     * users can authorize TreeSnap to get their info.
     *
     * @param string $provider name of provider.
     * @return \Illuminate\Http\RedirectResponse
     */
    public function redirectToSocialProvider($provider)
    {
        $validator = \Validator::make(['provider' => $provider], [
            'provider' => 'required|in:google',
        ]);

        if ($validator->fails()) {
            return abort(404);
        }

        $scopes = [];
        if ($provider === 'google') {
            $scopes = ['email', 'profile'];
        }

        return Socialite::driver($provider)->setScopes($scopes)->redirect();
    }

    /**
     * Handles the response from the authentication service.
     *
     * @param string $provider
     * @return \Illuminate\Http\RedirectResponse
     */
    public function handleSocialProviderCallback($provider)
    {
        $validator = \Validator::make(['provider' => $provider], [
            'provider' => 'required|in:google',
        ]);

        if ($validator->fails()) {
            return abort(404);
        }

        $response = Socialite::driver($provider)->user();

        if ($provider === 'google') {
            return $this->handleGoogleResponse($response);
        }

        return abort(404);
    }

    /**
     * @param $response
     * @return \Illuminate\Http\RedirectResponse
     */
    protected function handleGoogleResponse($response)
    {
        $birth_year = isset($response->user['birthday']) ? intval(explode('-', $response->user['birthday'])[0]) : 0;

        $user = $this->findOrCreateUser([
            'email' => $response->getEmail(),
            'name' => $response->getName(),
            'avatar' => $response->avatar,
            'birth_year' => $birth_year,
            'provider' => 'google',
            'provider_id' => $response->getId(),
        ]);

        auth()->login($user, true);

        return redirect()->to($this->redirectTo);
    }
}
