@component('mail::message')
{{ $sender }} invited you to join the group "{{ $group }}" on TreeSnap.
By accepting this invitation, you will be able to view, and contribute observations to the group.

@component('mail::button', ['url' => url("/invitations/accept/$id/?_t=$token")])
    Join TreeSnap and Accept Invitation
@endcomponent

Thank you for using TreeSnap!
@endcomponent
