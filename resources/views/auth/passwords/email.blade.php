@extends('layout.app')

@section('content')
    <div class="container">
        <div class="columns">
            <div class="column is-8 is-offset-2">
                <div class="box panel-default">
                    <div class="title is-4">Reset Password</div>
                    <div class="panel-body">
                        @if (session('status'))
                            <div class="alert is-success">
                                <p>{{ session('status') }}</p>
                                <p>Please allow at least 30 minutes for your request to be completed.</p>
                            </div>
                        @endif

                        <form role="form" method="POST" action="{{ route('password.email') }}">
                            {{ csrf_field() }}

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
                                <button type="submit" class="button is-primary">
                                    Send Password Reset Link
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
