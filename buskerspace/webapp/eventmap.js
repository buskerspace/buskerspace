var map = undefined;
var marker = undefined;

/* Initialise the map */
function initMap() {

    var initialCoords = {lat: -37.800089, lng: 144.964451};

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: initialCoords,
        clickableIcons: false,
        draggableCursor: 'crosshair'
    });

    var input = document.getElementById('location');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map)

    marker = new google.maps.Marker({
        map: map,
        position: map.getCenter(),
        draggable: true
    });

    autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.geometry)
            return;
        if (place.geometry.viewport)
            map.fitBounds(place.geometry.viewport);
        else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
        marker.setPosition(place.geometry.location);
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

    google.maps.event.addListener(map, 'click', function(click) {
        document.getElementById("location")
            .value = click.latLng.lat().toPrecision(11) + ", " + click.latLng.lng().toPrecision(11);
        marker.setPosition(click.latLng);
        map.panTo(click.latLng);
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