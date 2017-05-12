@component('mail::message')
# Contact Request

#### From: {{ $request->name }} <{{ $request->email }}>

{{ $request->message }}

Thanks,<br>
{{ config('app.name') }}
@endcomponent
