var map = undefined;
var events = undefined;

var imgurl = 'https://raw.githubusercontent.com/buskerspace/buskerspace/master/buskerspace/webapp/image/';
var icons = undefined;

/* Initialise the map */
function initMap() {

    var event = {
        lat: -37.800089,
        lng: 144.964451,
        title: 'UNIHACK2016',
        type: 'musical'
    };

    map = new google.maps.Map(document.getElementById('map'), {
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

    events = {
        musicalEvents: [
            { }
        ],
        performanceEvents: [
            { }
        ],
        otherEvents: [
            { }
        ],
    };

    filters = {
        musicalEvents: true,
        performanceEvents: true,
        otherEvents: true
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
        map: map,
        position: {lat: event.lat, lng: event.lng},
        title: event.title,
        icon: icon,
        clickable: false
    });

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