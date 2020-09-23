{{ csrf_field() }}

<div class="columns mb-none">
    <div class="column">
        <div class="field">
            <label for="email" class="label">E-Mail Address</label>

            <div class="control flex-grow">
                <input id="email" type="email"
                       class="input{{ $errors->has('email') && $validate ? ' is-danger' : '' }}" name="email"
                       value="{{ old('email', isset($email) ? $email : '') }}"
                       required>

                @if ($errors->has('email') && $validate)
                    <span class="help is-danger">
                        {{ $errors->first('email') }}
                    </span>
                @endif
            </div>
        </div>

        <div class="field">
            <label for="password" class="label">Password</label>

            <div class="control">
                <input id="password" type="password"
                       class="input{{ $errors->has('password') && $validate ? ' is-danger' : '' }}"
                       name="password" required>

                @if ($errors->has('password') && $validate)
                    <span class="help is-danger">
                        {{ $errors->first('password') }}
                    </span>
                @endif
            </div>
        </div>

        @if(isset($fields))
            {!! $fields !!}
        @endif

        <div class="field">
            <div class="control">
                <label class="checkbox">
                    <input type="checkbox"
                           name="remember" {{ old('remember') ? 'checked' : '' }}>
                    Remember Me
                </label>
            </div>
        </div>

        <div class="field">
            <div class="col-md-8 col-md-offset-4">
                <button type="submit" class="button is-primary">
                    Login
                </button>

                <a class="button is-link" href="{{ route('password.request') }}">
                    Forgot Your Password?
                </a>
            </div>
        </div>
    </div>

    @if(isset($show_social_login) && $show_social_login)
        <div class="column is-3">
            <h4 class="title is-6 has-text-centered mb-1">Connect With</h4>
            <a href="/login/google" class="is-block button is-danger has-text-left mb-1">
                <span class="icon">
                    <i class="fa fa-google"></i>
                </span>
                <span>Google</span>
            </a>

            <a href="/login/apple"
               style="display: block; font-family='SF Pro Text'; text-align: center; width: 100%; background-color: #000; border: none; padding: .5em 1em; border-radius: 2px; color: #fff;"
               id="sign-in-with-apple">
                 Sign in with Apple
            </a>
        </div>
    @endif
</div>
