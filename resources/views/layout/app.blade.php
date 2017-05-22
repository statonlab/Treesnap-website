<!DOCTYPE html>
<html lang="en">
<head>
    @include('partials.meta')

    <title>{{ $title or 'Treesnap' }}</title>

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