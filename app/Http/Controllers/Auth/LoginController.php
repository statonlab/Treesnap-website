<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\CreatesUsers;
use App\Http\Controllers\Traits\HandlesMobileSchemes;
use App\Role;
use App\Rules\Provider;
use App\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Socialite;
use Illuminate\Http\Request;
use Validator;

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

    use AuthenticatesUsers, CreatesUsers, HandlesMobileSchemes;

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
        $this->middleware('guest', [
            'except' => [
                'logout',
                'redirectToSocialProvider',
                'handleSocialProviderCallback',
            ],
        ]);
    }

    /**
     * Validate the user login request.
     *
     * @param \Illuminate\Http\Request $request
     * @return void
     */
    protected function validateLogin(Request $request)
    {
        $this->validate($request, [
            $this->username() => [
                'required',
                'email',
                new Provider(),
            ],
            'password' => 'required|string',
        ]);
    }

    /**
     * Redirect the user to the authentication screen where
     * users can authorize TreeSnap to get their info.
     *
     * @param Request $request
     * @param string $provider name of provider.
     * @return \Illuminate\Http\RedirectResponse
     */
    public function redirectToSocialProvider(Request $request, $provider)
    {
        if ($request->has('redirect_to')) {
            session()->put('social_redirect_to', $request->redirect_to);
        }

        $validator = Validator::make(['provider' => $provider], [
            'provider' => 'required|in:google,apple',
        ]);

        if ($validator->fails()) {
            return abort(404);
        }

        $scopes = [];
        if ($provider === 'google') {
            $scopes = ['email', 'profile'];
        }

        if ($provider === 'apple') {
            $provider = 'sign-in-with-apple';
            $scopes = ['email', 'name'];
        }

        return Socialite::driver($provider)->setScopes($scopes)->redirect();
    }

    /**
     * Handles the response from the authentication service.
     *
     * @param string $provider
     * @return \Illuminate\Http\RedirectResponse|void
     */
    public function handleSocialProviderCallback(string $provider)
    {
        $validator = \Validator::make(['provider' => $provider], [
            'provider' => 'required|in:google,apple',
        ]);

        if ($validator->fails()) {
            return abort(404);
        }

        if ($provider === 'google') {
            $response = Socialite::driver($provider)->user();

            return $this->handleGoogleResponse($response);
        } elseif ($provider === 'apple') {
            // get abstract user object, not persisted
            $user = Socialite::driver("sign-in-with-apple")->user();

            return $this->handleAppleResponse($user);
        }

        return abort(404);
    }

    /**
     * Handle the response obtained from google.
     *
     * @param object $response
     * @return \Illuminate\Http\RedirectResponse
     */
    protected function handleAppleResponse($response)
    {
        $role = Role::where('name', 'User')->first();

        $user = User::firstOrCreate([
            'provider' => 'apple',
            'provider_id' => $response->getId(),
        ], [
            'email' => $response->getEmail(),
            'name' => $response->getName(),
            'api_token' => $this->generateAPIToken(),
            'birth_year' => 0,
            'is_private' => false,
            'is_anonymous' => false,
            'role_id' => $role->id,
            'avatar' => isset($response->avatar) ? $response->avatar : null,
            'units' => 'US',
        ]);

        auth()->login($user, true);

        $this->setRedirectPath($user);

        return $this->redirect($this->redirectTo);
    }

    /**
     * Handle the response obtained from google.
     *
     * @param object $response
     * @return \Illuminate\Http\RedirectResponse
     */
    protected function handleGoogleResponse($response)
    {
        $birth_year = isset($response->user['birthday']) ? intval(explode('-',
            $response->user['birthday'])[0]) : 0;

        $user = $this->findOrCreateUser([
            'email' => $response->getEmail(),
            'name' => $response->getName(),
            'avatar' => $response->avatar,
            'birth_year' => $birth_year,
            'provider' => 'google',
            'provider_id' => $response->getId(),
        ]);

        auth()->login($user, true);

        $this->setRedirectPath($user);

        return $this->redirect($this->redirectTo);
    }

    /**
     * Handle mobile app opening.
     *
     * @param $path
     * @return \Illuminate\Http\RedirectResponse
     */
    protected function redirect($path)
    {
        if (starts_with($path, 'treesnap://')) {
            return redirect()->away($path);
        }

        return redirect()->to($path);
    }

    /**
     * Handle social redirects after authentication has completed.
     *
     * @param \App\User $user
     */
    protected function setRedirectPath($user)
    {
        $path = session('social_redirect_to', false);

        if ($path === false) {
            return;
        }

        if (starts_with($path, 'http')) {
            $url = parse_url($path);
            if ($url === false) {
                $this->redirectTo = $path;

                return;
            }

            $url_path = strtolower($url['path']);

            if (str_contains($url_path, 'mobile/login/ios')) {
                $this->redirectTo = "{$this->iosScheme}/social-login/{$user->api_token}";

                return;
            }

            if (str_contains($url_path, 'mobile/login/android')) {
                $this->redirectTo = "{$this->androidScheme}/social-login/{$user->api_token}";

                return;
            }
        }

        $this->redirectTo = $path;
    }
}
