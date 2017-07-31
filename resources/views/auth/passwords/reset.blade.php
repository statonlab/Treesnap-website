@extends('layout.app')

@section('content')
    <div class="container">
        <div class="columns">
            <div class="column is-8 is-offset-2">
                <div class="box">
                    <div class="title is-4">Reset Password</div>

                    @if (session('status'))
                        <div class="alert is-success">
                            {{ session('status') }}
                        </div>
                    @endif

                    <form class="form-horizontal"
                          method="POST"
                          action="{{ route('password.request') }}">
                        {{ csrf_field() }}

                        <input type="hidden" name="token" value="{{ $token }}">

                        <div class="field">
                            <label for="email" class="col-md-4 control-label">E-Mail Address</label>

                            <div class="control">
                                <input id="email"
                                       type="email"
                                       class="input{{ $errors->has('email') ? ' is-danger' : '' }}"
                                       name="email"
                                       value="{{ $email or old('email') }}"
                                       required
                                       autofocus>

                                @if ($errors->has('email'))
                                    <span class="help is-danger">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="field">
                            <label for="password" class="col-md-4 control-label">Password</label>

                            <div class="control">
                                <input id="password"
                                       type="password"
                                       class="input{{ $errors->has('password') ? ' is-danger' : '' }}"
                                       name="password"
                                       required>

                                @if ($errors->has('password'))
                                    <span class="help is-danger">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="field">
                            <label for="password-confirm" class="col-md-4 control-label">Confirm Password</label>
                            <div class="control">
                                <input id="password-confirm"
                                       type="password"
                                       class="input{{ $errors->has('password_confirmation') ? ' is-danger' : '' }}"
                                       name="password_confirmation"
                                       required>

                                @if ($errors->has('password_confirmation'))
                                    <span class="help is-danger">
                                        <strong>{{ $errors->first('password_confirmation') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="field">
                            <div class="control col-md-offset-4">
                                <button type="submit" class="button is-primary">
                                    Reset Password
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
