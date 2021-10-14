// In this example, we center the map, and add a marker, using a LatLng object
// literal instead of a google.maps.LatLng object. LatLng object literals are
// a convenient way to add a LatLng coordinate and, in most cases, can be used
// in place of a google.maps.LatLng object.
let map;

function initMap() {
    var lat=parseFloat(document.getElementById('latitude').value);
    var lng=parseFloat(document.getElementById('longitude').value);
    const mapOptions = {
        center:new google.maps.LatLng(lat, lng) ,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP

    };


    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    const marker = new google.maps.Marker({
        // The below line is equivalent to writing:
        // position: new google.maps.LatLng(-34.397, 150.644)
        position: { lat: lat, lng: lng },
    map: map,
});
    // You can use a LatLng literal in place of a google.maps.LatLng object when
    // creating the Marker object. Once the Marker object is instantiated, its
    // position will be available as a google.maps.LatLng object. In this case,
    // we retrieve the marker's position using the
    // google.maps.LatLng.getPosition() method.
    const infowindow = new google.maps.InfoWindow({
        content: "<p>"+$('#searchInput').val() + "</p>",
    });
    google.maps.event.addListener(marker, "click", () => {
        infowindow.open(map, marker);
});
}