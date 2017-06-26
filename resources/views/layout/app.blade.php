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
            csrfToken: '{{ csrf_token() }}'
        }
    </script>
    @yield('head')
</head>
<body>

@include('layout.navbar')

<div class="main-content">
    @yield('content')
</div>

<div class="home-footer">
    <div class="container">
        <p class="mb-1">
            Copyright &copy; 2017 University of Tennessee Knoxville and University of Kentucky.
        </p>

        <p>
            <a href="/privacy-policy">Privacy Policy and Terms of Use</a> | Icons by
            <a href="http://www.flaticon.com/authors/vectors-market"> Vectors Market</a>
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
        console.log('loaded')
    }

    if (typeof attachEvent !== 'undefined') {
        window.attachEvent('load', fixHeight)
        window.attachEvent('resize', fixHeight)
    } else {
        window.addEventListener('load', fixHeight)
        window.addEventListener('resize', fixHeight)
    }
</script>
</body>
</html>