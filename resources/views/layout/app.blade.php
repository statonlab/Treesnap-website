<!DOCTYPE html>
<html lang="en">
<head>
    @include('partials.meta')

    <title>{{ $title or 'TreeSnap' }}</title>

    <link rel="stylesheet" href="{{ mix('/css/app.css') }}">
    <script>
        window.TreeSnap = {
            csrfToken: '{{ csrf_token() }}'
        }
    </script>
    @yield('head')
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

@include('layout.navbar')

<div class="main-content">
    @yield('content')
</div>

<div class="home-footer">
    <div class="container">
        <p class="mb-1">
            Copyright &copy; {{date('Y')}} University of Tennessee Knoxville and University of Kentucky.
        </p>

        <p>
            <a href="/privacy-policy">Privacy Policy and Terms of Use</a>
        </p>
        <div class="columns logos">
            <div class="column has-text-centered">
                <a href="https://www.utk.edu/">
                    <img src="/images/ut3.png" alt="University of Tennessee Logo"/>
                </a>
            </div>
            <div class="column has-text-centered">
                <a href="https://uky.edu">
                    <img src="/images/uky3.png" alt="University of Kentucky Logo"/>
                </a>
            </div>
            <div class="column has-text-centered">
                <a href="https://www.nsf.gov/">
                    <img src="/images/nsf1.png" alt="NSF Logo"/>
                </a>
            </div>
        </div>
    </div>
</div>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
@yield('js')
<script>
    window.fixHeight = function () {
        var windowHeight = window.innerHeight
        var footer       = document.querySelector('.home-footer').clientHeight
        var header       = document.querySelector('#app-navbar').clientHeight
        var content      = document.querySelector('.short-content')

        if (content) {
            content.style.minHeight = (windowHeight - footer - header - 36) + 'px'
        }
    }

    window.addEventListener('load', window.fixHeight, false)
    window.addEventListener('resize', window.fixHeight, false)
</script>
</body>
</html>
