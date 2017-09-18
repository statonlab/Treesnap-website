@component('mail::message')
# Hello {{ $user->name }},

There {{ $total }} new observations that match your filter "{{ $filter->name }}"

<table border="0" cellspacing="0" cellpadding="0" valign="top" align="left" style="margin-bottom: 15px;">
    <tr>
        @foreach($observations as $observation)
        <td style="padding-bottom: 10px;">
            <div style="padding: 5px; margin: 0 5px; border: 1px solid #EDEFF2; border-radius: 4px;">
                <a style="text-decoration: none;" href="{{ url('/observation/' . $observation->id) }}">
                    <img src="{{ url($observation->thumbnail) }}" alt="{{ $observation->observation_category }}" style="max-width: 100%; border-radius: 4px; margin-bottom: 10px;">
                </a>
                <div>
                    <a style="text-decoration: none;" href="{{ url('/observation/' . $observation->id) }}">
                        {{ $observation->observation_category }}
                    </a>
                </div>
                <p style="font-size: 12px; margin-bottom: 0;">Uploaded {{ $observation->created_at->diffForHumans() }}</p>
            </div>
        </td>
    @if($i % 2)
    </tr>
    <tr>
    @endif
        <?php $i++; ?>
        @endforeach
    </tr>
</table>

@component('mail::button', ['url' => url('/map')])
Observations Map
@endcomponent

To stop receiving notifications for this filter, please [unsubscribe here]({{ url('/services/unsubscribe/filter/'.$filter->id) }}).

Thanks,<br>
{{ config('app.name') }}
@endcomponent
