<?php
/**
 * This file is used for static HTML pages such as register and login.
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
    @include('partials.meta')

    <title>{{ $title or 'TreeSnap' }}</title>

    <link rel="stylesheet" href="{{ mix('/css/app.css') }}">
    <script>
        window.Laravel = {
            csrfToken    : '{{ csrf_token() }}'
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