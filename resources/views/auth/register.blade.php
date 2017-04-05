@extends('layout.auth')

@section('content')
    <div class="container">
        <div class="columns">
            <div class="column is-8 is-offset-2">
                <div class="box">
                    <h3 class="title is-4">Register</h3>
                    <div class="box-body">
                        <form class="form-horizontal" role="form" method="POST" action="{{ route('register') }}">
                            {{ csrf_field() }}

                            <div class="field">
                                <label for="name" class="label">Name</label>
                                <div class="control">
                                    <input id="name"
                                           type="text"
                                           class="input{{ $errors->has('name') ? ' is-danger' : '' }}"
                                           name="name" value="{{ old('name') }}"
                                           required
                                           autofocus>

                                    @if ($errors->has('name'))
                                        <p class="help is-danger">
                                            {{ $errors->first('name') }}
                                        </p>
                                    @endif
                                </div>
                            </div>

                            <div class="field">
                                <label for="email" class="label">E-Mail Address</label>
                                <div class="control">
                                    <input id="email"
                                           type="email"
                                           class="input{{ $errors->has('email') ? ' is-danger' : '' }}"
                                           name="email"
                                           value="{{ old('email') }}"
                                           required>

                                    @if ($errors->has('email'))
                                        <p class="help is-danger">
                                            {{ $errors->first('email') }}
                                        </p>
                                    @endif
                                </div>
                            </div>

                            <div class="field">
                                <label for="password" class="label">Password</label>
                                <div class="control">
                                    <input id="password"
                                           type="password"
                                           class="input{{ $errors->has('password') ? ' is-danger' : '' }}"
                                           name="password"
                                           required>

                                    @if ($errors->has('password'))
                                        <p class="help is-danger">
                                            {{ $errors->first('password') }}
                                        </p>
                                    @endif
                                </div>
                            </div>

                            <div class="field">
                                <label for="password-confirm" class="label">Confirm Password</label>
                                <div class="control">
                                    <input id="password-confirm"
                                           type="password"
                                           class="input"
                                           name="password_confirmation"
                                           required>
                                </div>
                            </div>

                            <div class="field">
                                <label for="zipcode" class="label">Zipcode</label>
                                <div class="control">
                                    <input type="text" name="zipcode" class="input" placeholder="Optional" maxlength="10" minlength="5">
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <label class="checkbox">
                                        <input type="checkbox" name="is_over_thirteen" value="1" {{ old('is_over_thirteen') ? 'checked' : '' }}>
                                        I am over 13 years old
                                    </label>
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <button type="submit" class="button is-primary">
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
