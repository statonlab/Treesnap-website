@component('mail::message')
{{ $contact->message }}

@if(!empty($table))
@component('mail::table')
| Observation details |       |
|:--------------------|:------|
@foreach($table as $key => $value)
|**{{ $key }}**|{{$value}}|
@endforeach
@endcomponent
@endif

@component('mail::button', ['url' => url("/observation/{$contact->observation_id}")])
    Visit Observation Page
@endcomponent

**Please reply to this email directly**
@endcomponent
