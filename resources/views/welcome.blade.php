<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title or 'Treesnap' }}</title>
    <link rel="stylesheet" href="{{ mix('/css/app.css') }}">
    <script>
        window.Laravel             = {
            csrfToken: '{{ csrf_token() }}',
            loggedIn : {{ auth()->check() ? 1 : 0}},
            isAdmin  : false
        }
        @if(auth()->check())
            window.Laravel.isAdmin = {{ auth()->user()->isAdmin() ? 1 : 0 }}
        @endif
    </script>
</head>
<body>

<div id="welcome">
</div>

<script src="{{ mix('js/welcome.js') }}"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</body>
</html>