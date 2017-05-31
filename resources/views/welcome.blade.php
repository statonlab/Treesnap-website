<!DOCTYPE html>
<html lang="en">
<head>
    @include('partials.meta')

    <title>{{ $title or 'TreeSnap' }}</title>

    <link rel="stylesheet" href="{{ mix('/css/app.css') }}">
    <script>
        window.Laravel             = {
            csrfToken: '{{ csrf_token() }}',
            loggedIn : '{{ auth()->check() ? '1' : '0'}}' === '1',
            isAdmin  : false
        }
        @if(auth()->check())
            window.Laravel.isAdmin = '{{ auth()->user()->isAdmin() ? '1' : '0' }}' === '1'
        @endif
    </script>
    <script src="/js/plugins/mapcluster.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDvvX3eEFf8L6hfCZA-MzmZJTMUhVJjV4I"></script>
</head>
<body>

<div id="app-root"></div>

<script src="{{ mix('js/app.js') }}"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</body>
</html>