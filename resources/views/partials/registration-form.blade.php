{{ csrf_field() }}

<div class="field">
    <label for="name" class="label">Name</label>
    <div class="control">
        <input id="name"
               type="text"
               class="input{{ $errors->has('name') &&  $validate ? ' is-danger' : '' }}"
               name="name" value="{{ old('name') }}"
               required>

        @if ($errors->has('name') &&  $validate)
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
               class="input{{ $errors->has('email') && $validate ? ' is-danger' : '' }}"
               name="email"
               value="{{ old('email', isset($email) ? $email : '') }}"
               required>

        @if ($errors->has('email') &&  $validate)
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
               class="input{{ $errors->has('password') && $validate ? ' is-danger' : '' }}"
               name="password"
               required>

        @if ($errors->has('password') &&  $validate)
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
        <input type="text"
               name="zipcode"
               class="input"
               placeholder="Optional"
               maxlength="10"
               minlength="5"
               value="{{ old('zipcode') }}">
    </div>
    @if ($errors->has('zipcode') &&  $validate)
        <p class="help is-danger">
            {{ $errors->first('zipcode') }}
        </p>
    @endif
</div>

<div class="field">
    <label for="birth_year" class="label">Year of birth</label>
    <div class="control">
        <span class="select">
            <select type="select"
                    name="birth_year"
                    id="birth-year-dropdown"
                    onChange="checkAge()">
                <option value="">Select Year</option>
                @for ($year = intval(date('Y')); $year > intval(date('Y')) - 100; $year--)
                    <option value="{{ $year }}"{{intval(old('birth_year', 0)) === $year ? ' selected' : ''}}>
                        {{ $year }}
                    </option>
                @endfor
            </select>
        </span>
    </div>
    @if ($errors->has('birth_year') &&  $validate)
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
    @if ($errors->has('agreement') &&  $validate)
        <p class="help is-danger">
            {{ $errors->first('agreement') }}
        </p>
    @endif
</div>

<div class="field" id="minor-consent-box" style="display: none">
    <div class="control">
        <label class="checkbox">
            <input type="checkbox"
                   name="minorConsent"
                   value="1"
                   {{ old('minorConsent') ? 'checked' : '' }}
                   class="mr-0">
            <strong>Minors:</strong> I affirm that I am registering with parental or guardian consent.
        </label>
    </div>
    @if ($errors->has('minorConsent') &&  $validate)
        <p class="help is-danger">
            {{ $errors->first('minorConsent') }}
        </p>
    @endif
</div>


<div class="field">
    <div class="control">
        <button type="submit" class="button is-primary">
            Register
        </button>
    </div>
</div>

<script>
    checkAge()
    function checkAge() {
        var date            = new Date()
        var currentYear     = date.getFullYear()
        var selectedYear    = (document.getElementById('birth-year-dropdown').value)
        var minorConsentBox = document.getElementById('minor-consent-box')

        if (selectedYear.length > 0) {
            selectedYear = parseInt(selectedYear)
        }

        var currentAge = currentYear - selectedYear

        if (currentAge <= 13) {
            console.log('I confirm I am using this app under the guidance of my parent or guardian.')
            minorConsentBox.style = 'display: true'
            return
        }

        minorConsentBox.style = 'display: none'
    }
</script>