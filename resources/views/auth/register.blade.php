@extends('layout.app')

@section('content')
    <div class="short-content">
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
                                        <span class="select">
                                            <select type="select"
                                                    name="birth_year"
                                                    id="birth-year-dropdown"
                                                    onChange="checkAge()">
                                                <option value="-1">Select Year</option>
                                                @for ($year = intval(date('Y')); $year > intval(date('Y')) - 100; $year--)
                                                    <option value="{{ $year }}"{{old('birth_year', -1) === $year ? ' selected="selected"' : ''}}>
                                                        {{ $year }}
                                                    </option>
                                                @endfor
                                            </select>
                                        </span>
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
                                                   value="1" {{ old('agreement') ? 'checked' : '' }}
                                                   class="mr-0"
                                            >
                                            I agree to the &nbsp;<a href="/terms-of-use">TreeSnap license and terms of service</a>
                                        </label>
                                    </div>
                                    @if ($errors->has('agreement'))
                                        <p class="help is-danger">
                                            {{ $errors->first('agreement') }}
                                        </p>
                                    @endif
                                </div>

                                <div class="field" id="minor-consent-box" style="display: none">
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
    </div>
@endsection

@section('js')
    <script>
        function checkAge() {
            var date            = new Date()
            var currentYear     = date.getFullYear()
            var selectedYear    = document.getElementById('birth-year-dropdown').value
            var currentAge      = currentYear - selectedYear
            var minorConsentBox = document.getElementById('minor-consent-box')

            if (currentAge <= 13) {
                console.log('I confirm I am using this app under the guidance of my parent or guardian.')
                minorConsentBox.style = 'display: true'
                return
            }

            minorConsentBox.style = 'display: none'
        }
    </script>
@endsection
