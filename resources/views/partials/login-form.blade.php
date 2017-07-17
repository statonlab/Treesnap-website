{{ csrf_field() }}

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