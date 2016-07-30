var mapEdit = undefined;
var mapView = undefined;
var marker = undefined;

var imgurl = 'https://raw.githubusercontent.com/buskerspace/buskerspace/master/buskerspace/webapp/image/';
var icons = undefined;

/* Initialise both kinds of maps */
function initMap() {
    
    initMapEdit();
    initMapView();
}

/* Initialise the editable map */
function initMapEdit() {

    var initialCoords = {lat: -37.800089, lng: 144.964451};

    mapEdit = new google.maps.Map(document.getElementById('map-edit'), {
        zoom: 16,
        center: initialCoords,
        clickableIcons: false,
        draggableCursor: 'crosshair'
    });

    var input = document.getElementById('location');
    mapEdit.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', mapEdit)

    marker = new google.maps.Marker({
        map: mapEdit,
        position: mapEdit.getCenter(),
        draggable: true
    });

    autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.geometry)
            return;
        if (place.geometry.viewport)
            mapEdit.fitBounds(place.geometry.viewport);
        else {
            mapEdit.setCenter(place.geometry.location);
            mapEdit.setZoom(17);
        }
        marker.setPosition(place.geometry.location);
    });

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            mapEdit.panTo(new google.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude
            ));
            marker.setPosition(mapEdit.getCenter());
        }, function(error) {
            console.log("Error with geolocation (" + error.code + "): " + error.message + ".");
        });
    }

    google.maps.event.addListener(mapEdit, 'click', function(click) {
        document.getElementById("location")
            .value = click.latLng.lat().toPrecision(11) + ", " + click.latLng.lng().toPrecision(11);
        marker.setPosition(click.latLng);
        mapEdit.panTo(click.latLng);
    });
}

/* Initialise the read-only map */
function initMapView() {

    var event = {
        lat: -37.800089,
        lng: 144.964451,
        title: 'UNIHACK2016',
        type: 'musical'
    };

    mapView = new google.maps.Map(document.getElementById('map-view'), {
        zoom: 17,
        center: new google.maps.LatLng(event.lat, event.lng),
        clickableIcons: false,
        draggable: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
        scrollwheel: false
    });

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

    // Parse event

    var icon = '';

    switch (event.type) {
        case 'musical':
            icon = icons.musical;
            break;
        case 'performance':
            icon = icons.performance;
            break;
        case 'other':
            icon = icons.other;
            break;
        default:
            icon = icons.undef;
            break;
    }

    // Add marker

    var marker = new google.maps.Marker({
        map: mapView,
        position: {lat: event.lat, lng: event.lng},
        title: event.title,
        icon: icon,
        clickable: false
    });

}

function submitEvent() {

    var path = "/new/event/";

    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", path);

    var fields = [
    {
        name: "title",
        value: document.getElementById("title").value
    },
    {
        name: "desc",
        value: document.getElementById("desc").value
    },
    {
        name: "buskeremail",
        value: document.getElementById("email").value
    },
    {
        name: "lat",
        value: marker.getPosition().lat()
    },
    {
        name: "lng",
        value: marker.getPosition().lng()
    },
    {
        name: "date",
        value: document.getElementById("myDate").value
    },
    {
        name: "time",
        value: document.getElementById("myTime").value
    },
    {
        name: "duration",
        value: document.getElementById("duration").value
    }
    ];

    for (var i = 0, field; field = fields[i]; i++) {
        var element = document.createElement("input");
        element.setAttribute("type",  "hidden");
        element.setAttribute("name",  field.name);
        element.setAttribute("value", field.value);
        form.appendChild(element);
    }

    document.body.appendChild(form);
    form.submit();
}

function revGeocode(lat, lng) {
    geocoder.geocode(
        {
            'location': {
                lat: lat,
                lng: lng
            }
        },
        function(results, status) {
            if (status === 'OK') {
                if (results[1]) {
                    console.log(results[1].formatted_address);
                } else {
                    console.log('Reverse geocoding failed for (' +
                        lat + ', ' + lng);
                }
            } else {
                console.log('Geocoder failed with error: ' + status);
            }
        });
}