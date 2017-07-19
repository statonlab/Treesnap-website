<!DOCTYPE html>
<html lang="en">
<head>
    @include('partials.meta')

    <title>{{ $title or 'TreeSnap' }}</title>

    <link rel="stylesheet" href="{{ mix('/css/app.css') }}">
    <script>
        window.TreeSnap = {
            csrfToken: '{{ csrf_token() }}',
            loggedIn : '{{ auth()->check() ? '1' : '0'}}' === '1',
            isAdmin  : false
        }

        @if(auth()->check())
            window.TreeSnap.isAdmin = '{{ \App\User::hasRole(['Admin', 'Scientist'], auth()->user()) ? '1' : '0' }}' === '1'
        @endif
    </script>
    <script async src="/js/plugins/mapcluster.min.js"></script>
    <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDvvX3eEFf8L6hfCZA-MzmZJTMUhVJjV4I"></script>
    <script>
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r
            i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date()
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0]
            a.async = 1
            a.src   = g
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')

        ga('create', 'UA-102233923-1', 'auto')
        ga('send', 'pageview')
    </script>
</head>
<body>

<div id="app-root">
    <div class="spinner-overlay">
        <div class="has-text-centered">
            <img src="/logo/ts-logo-144.png" alt="TreeSnap Logo">
            <h1 class="title"><b>Tree</b>Snap</h1>
            <div>
                <i class="fa fa-spinner fa-spin"></i>
            </div>
        </div>
    </div>
</div>

<script>
    window.fixHeight = function () {
        var content = document.querySelector('.short-content')
        if (!content) {
            return
        }

        var windowHeight        = window.innerHeight
        var footer              = document.querySelector('.home-footer').clientHeight
        var header              = document.querySelectorAll('nav.navbar')[0].clientHeight
        content.style.minHeight = (windowHeight - (footer + header)) + 'px'
    }

    window.addEventListener('resize', window.fixHeight.bind(this), false)
</script>
<script async src="{{ mix('js/app.js') }}"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</body>
</html>