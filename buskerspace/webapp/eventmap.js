var map = undefined;
var events = undefined;
var filters = undefined;

var imgurl = 'https://raw.githubusercontent.com/buskerspace/buskerspace/master/buskerspace/webapp/image/';
var icons = undefined;

/* Initialise the map */
function initMap() {

    var initialCoords = {lat: -37.800089, lng: 144.964451};

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: initialCoords,
        clickableIcons: false,
        draggableCursor: 'crosshair'
    });

    var marker = new google.maps.Marker({
        map: map,
        position: map.getCenter(),
        draggable: true
    });

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            map.panTo(new google.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude
            ));
            marker.setPosition(map.getCenter());
        }, function(error) {
            console.log("Error with geolocation (" + error.code + "): " + error.message + ".");
        });
    }

    icons = {
        musical: {
            url: imgurl + 'icon-musical.png',
            size: new google.maps.Size(32, 32),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 32)
        },
        performance: {
            url: imgurl + 'icon-performance.png',
            size: new google.maps.Size(32, 32),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 32)
        },
        other: {
            url: imgurl + 'icon-other.png',
            size: new google.maps.Size(32, 32),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 32)
        },
        undef: ''
    };



    google.maps.event.addListener(map, 'click', function(click) {
        marker.setPosition(click.latLng);
        map.panTo(click.latLng);
    });
}

function submitEvent() {
}