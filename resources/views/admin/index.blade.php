<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-LFKXGPPDHV"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-LFKXGPPDHV');
    </script>
    @include('partials.meta')

    <title>{{ $title ?? 'TreeSnap' }}</title>
    <link rel="stylesheet" href="{{ mix('/css/app.css') }}">
    <script>
      window.TreeSnap = {!! json_encode($TreeSnap) !!}
    </script>

    <script src="/js/plugins/mapcluster.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDvvX3eEFf8L6hfCZA-MzmZJTMUhVJjV4I"></script>
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

<div id="app" class="admin-app">
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

<script src="{{ mix('js/manifest.js') }}"></script>
<script src="{{ mix('js/vendor.js') }}"></script>
<script src="{{ mix('js/admin.js') }}"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</body>
</html>
