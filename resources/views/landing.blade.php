@extends('layout.app')

@section('content')
    <div id="map"></div>
    <script>
        var map;
        var markers = [];

        function panToMap() {
            var t =
            map.setZoom(14)
            map.panTo(markers[Math.floor(Math.random() * markers.length)].marker.position)
            console.log()
        }

        function initMap() {
            // Create a map object and specify the DOM element for display.
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 40.354388, lng: -95.998237},
                scrollwheel: true,
                zoom: 4
            });

            markers.push({
                title: 'Hemlock',
                marker: new google.maps.Marker({
                    title: 'Hemlock',
                    position: {lat: 40.354388, lng: -95.998237},
                    map: map
                })
            });

            markers.push({
                title: 'Green Ash',
                marker: new google.maps.Marker({
                    title: 'Green Ash',
                    position: {lat: 44.354388, lng: -93.998237},
                    map: map
                })
            });

            markers.push({
                title: 'American Chestnut',
                marker: new google.maps.Marker({
                    title: 'American Chestnut',
                    position: {lat: 40.354388, lng: -90.998237},
                    map: map
                })
            });

            markers.push({
                title: 'White Oak',
                marker: new google.maps.Marker({
                    title: 'White Oak',
                    position: {lat: 39.354388, lng: -99.998237},
                    map: map
                })
            });

            markers.push({
                title: 'Hemlock',
                marker: new google.maps.Marker({
                    title: 'Hemlock',
                    position: {lat: 39.354388, lng: -92.998237},
                    map: map
                })
            });

            markers.push({
                title: 'Green Ash',
                marker: new google.maps.Marker({
                    title: 'Green Ash',
                    position: {lat: 35.354388, lng: -84.998237},
                    map: map
                })
            });

            markers.push({
                title: 'American Chestnut',
                marker: new google.maps.Marker({
                    title: 'American Chestnut',
                    position: {lat: 46.354388, lng: -99.998237},
                    map: map
                })
            });

            markers.push({
                title: 'White Oak',
                marker: new google.maps.Marker({
                    title: 'White Oak',
                    position: {lat: 38.354388, lng: -90.998237},
                    map: map
                })
            });

            listen()
        }

        function listen() {
            document.addEventListener('filter', function (e) {
                markers.map(function(m, index) {
                    if(m.title == e.detail) {
                        m.marker.setVisible(!m.marker.getVisible())
                    }
                })
            }, false)
        }
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDvvX3eEFf8L6hfCZA-MzmZJTMUhVJjV4I&callback=initMap"
            async defer>
    </script>
@endsection