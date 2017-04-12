@extends('layout.app')

@section('content')
    <div class="container">
        <div class="columns">
            <div class="column is-8 is-offset-2">
                <div class="box">
                    <h3 class="title is-4">Login</h3>
                    <div class="box-body">
                        <form class="form-horizontal" role="form" method="POST" action="{{ route('login') }}">
                            {{ csrf_field() }}

                            <div class="field">
                                <label for="email" class="label">E-Mail Address</label>

                                <div class="control flex-grow">
                                    <input id="email" type="email"
                                           class="input{{ $errors->has('email') ? ' is-danger' : '' }}" name="email"
                                           value="{{ old('email') }}"
                                           required autofocus>

                                    @if ($errors->has('email'))
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
                                           class="input{{ $errors->has('password') ? ' is-danger' : '' }}"
                                           name="password" required>

                                    @if ($errors->has('password'))
                                        <span class="help is-danger">
                                        {{ $errors->first('password') }}
                                    </span>
                                    @endif
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <label class="checkbox">
                                        <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}>
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
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
