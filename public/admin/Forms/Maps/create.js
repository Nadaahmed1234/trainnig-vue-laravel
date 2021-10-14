    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 24.7135517, lng: 46.67529569 },
            zoom: 13
        });
        var input = document.getElementById('searchInput');
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);
        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29),
            draggable: true
        });
        google.maps.event.addListener(map, 'click', function(event) {
            document.getElementById("latitude").value = event.latLng.lat();
            document.getElementById("longitude").value = event.latLng.lng();


            var latlng = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
            var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng':latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        $('#searchInput').val(results[1].formatted_address);
                        // alert("Location: " + results[1].formatted_address + "\r\nLatitude: " + event.latLng.lat() + "\r\nLongitude: " + event.latLng.lng());
                    }
                }
            });


            marker.setPosition(event.latLng);
        });
        marker.addListener('position_changed', printMarkerLocation);

        function printMarkerLocation() {
            document.getElementById('latitude').value = marker.position.lat();
            document.getElementById('longitude').value = marker.position.lng();
            // console.log('Lat: ' + marker.position.lat() + ' Lng:' + marker.position.lng() );
        }

        autocomplete.addListener('place_changed', function() {
            infowindow.close();
            marker.setVisible(false);
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                window.alert("Autocomplete's returned place contains no geometry");
                return;
            }
            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }
            marker.setIcon(({
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(35, 35)
            }));
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);
            var address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }
            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
            infowindow.open(map, marker);
            //Location details
            // for (var i = 0; i < place.address_components.length; i++) {

            //  document.getElementById('address').value = place.formatted_address;

            // }

        });
    }