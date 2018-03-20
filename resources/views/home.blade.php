<!DOCTYPE html>
<html lang="en">
<head>
    @include('partials.meta')

    <title>{{ $title or 'TreeSnap' }}</title>
    <link rel="stylesheet" href="{{ mix('/css/app.css') }}">

    <script>
      window.TreeSnap = {!! json_encode($TreeSnap) !!}
    </script>

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

      if (typeof Object.assign != 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, 'assign', {
          value       : function assign(target, varArgs) { // .length of function is 2
            'use strict'
            if (target == null) { // TypeError if undefined or null
              throw new TypeError('Cannot convert undefined or null to object')
            }

            var to = Object(target)

            for (var index = 1; index < arguments.length; index++) {
              var nextSource = arguments[index]

              if (nextSource != null) { // Skip over if undefined or null
                for (var nextKey in nextSource) {
                  // Avoid bugs when hasOwnProperty is shadowed
                  if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                    to[nextKey] = nextSource[nextKey]
                  }
                }
              }
            }
            return to
          },
          writable    : true,
          configurable: true
        })
      }
    </script>

    @if(isset($meta) && !empty($meta))
        <meta property="og:title" content="{{$meta['title']}}"/>
        <meta property="og:description" content="{{$meta['description']}}"/>
        <meta property="og:image" content="{{$meta['image']}}"/>
        <meta property="og:url" content="{{$meta['url']}}"/>
        <meta property="og:type" content="website"/>
        <meta property="og:app_id" content="205282770229616"/>
        <meta property="og:image:width" content="600"/>
        <meta property="og:image:height" content="400"/>

        <meta name="twitter:title" content="{{$meta['title']}}"/>
        <meta name="twitter:description" content="{{$meta['description']}}"/>
        <meta name="twitter:image" content="{{$meta['image']}}"/>
        <meta name="twitter:card" content="summary_large_image"/>
    @endif
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

  window.addEventListener('resize', window.fixHeight, false)
</script>
<script src="/js/plugins/mapcluster.min.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDvvX3eEFf8L6hfCZA-MzmZJTMUhVJjV4I"></script>
<script src="{{ mix('js/manifest.js') }}"></script>
<script src="{{ mix('js/vendor.js') }}"></script>
<script src="{{ mix('js/app.js') }}"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</body>
</html>
