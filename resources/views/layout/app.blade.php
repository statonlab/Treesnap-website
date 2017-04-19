<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title or 'Tree Source' }}</title>
    <link rel="stylesheet" href="{{ mix('/css/app.css') }}">
    <script>
        window.Laravel = {
            csrfToken    : '{{ csrf_token() }}',
            observationID: {{  $id or 0 }},
        }
    </script>
    @yield('head')
</head>
<body>

@include('layout.navbar')

<div class="main-content">
    @yield('content')
</div>

<div class="app-footer">
    <div class="container">
        Copyright &copy; 2017 University of Tennessee at Knoxville
    </div>
</div>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
@yield('js')
</body>
</html>