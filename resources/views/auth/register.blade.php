@extends('layout.app')

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
                                    <input type="text" name="zipcode" class="input" placeholder="Optional"
                                           maxlength="10" minlength="5">
                                </div>
                            </div>

                            <div class="field">
                                <label for="birth_year" class="label">Year of birth</label>
                                <div class="control">
                                    <select type="select" name="birth_year" id="birth_year" class="select is-small" value="" {{old('birth_year') ? : ''}}
                                            onChange="checkAge()">
                                        <option value=""></option>
                                        <?php for ($year = date('Y'); $year > date('Y') - 100; $year--) { ?>
                                        <option value="<?php echo $year; ?>"><?php echo $year; ?></option>
                                        <?php } ?>
                                    </select>
                                </div>
                                @if ($errors->has('birth_year'))
                                    <p class="help is-danger">
                                        Please indicate your year of birth.
                                    </p>
                                @endif
                            </div>

                            <div class="field">
                                <div class="control">
                                    <label class="checkbox">
                                        <input type="checkbox" name="agreement"
                                               value="1" {{ old('agreement') ? 'checked' : '' }}>
                                        I agree to the &nbsp;<a href="/policy">TreeSnap license and terms of service</a>
                                    </label>
                                </div>
                                @if ($errors->has('agreement'))
                                    <p class="help is-danger">
                                        {{ $errors->first('agreement') }}
                                    </p>
                                @endif
                            </div>

                            <div class="field" id="minorBox" style="display: none">
                                <div class="control">
                                    <label class="checkbox">
                                        <input type="checkbox" name="minorConsent"
                                               value="1" {{ old('minorConsent') ? 'checked' : '' }}>
                                        <strong>Minors:</strong> I affirm that I am registering with parental or guardian consent.
                                    </label>
                                </div>
                            </div>
                            @if ($errors->has('minorConsent'))
                                <p class="help is-danger">
                                    {{ $errors->first('minorConsent') }}
                                </p>
                            @endif

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

@section('js')
    <script>
        var date = new Date();
        var currentYear = date.getFullYear();
        var checkAge = function () {
            var yearSelect = document.getElementById("birth_year").value;
            var currentAge = currentYear - yearSelect;
            if (currentAge <= 13) {
                console.log("i confirm i am using this app under the guidance of my parent/guardian or something")
                document.getElementById("minorBox").style = "display: true";
                return
            }
            document.getElementById("minorBox").style = "display: none";
            return
        }


    </script>
@endsection
