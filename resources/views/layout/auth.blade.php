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
            csrfToken: '{{ csrf_token() }}',
            loggedIn: {{ auth()->id() ? 1 : 0}}
        }
    </script>
</head>
<body>

<nav class="nav">
    <div class="container">
        <div class="nav-left nav-brand">
            <a href="/" class="nav-item">
                <b>Tree</b>Source
            </a>
            <small class="nav-item">
                Citizen science app
            </small>
        </div>

        <div class="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
        </div>

        <div class="nav-right nav-menu">
            <a href="/" class="nav-item">
                Home
            </a>

            <a href="/" class="nav-item">
                Help
            </a>

            <a href="/" class="nav-item">
                About
            </a>

            <a href="/login" class="nav-item">
                Login
            </a>

            <a href="/register" class="nav-item">
                Register
            </a>
        </div>
    </div>
</nav>

<div class="main-content">
    @yield('content')
</div>

<div class="auth-footer">
    <div class="container">
        Copyright &copy; 2017 University of Tennessee at Knoxville
    </div>
</div>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</body>
</html>