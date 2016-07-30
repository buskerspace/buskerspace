function initMap() {

    var mapDiv = document.getElementById('map');

    var map = new google.maps.Map(mapDiv, {
        center: {lat: -37.8136 lng: 144.9631},
        zoom: 16,
        styles: [
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
                { visibility: 'on' },
                { hue: '#1000e0' }
            ]
        }
        ]
    });

    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

    var icons = {
        info: {
            icon: iconBase + 'info-i_maps.png'
        }
    };

    function addMarker(feature) {
        var marker = new google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type].icon,
            map: map
        });
    }

    var features = [
        {
            position: new google.maps.LatLng(-37.8136, 144.9631),
            type: 'info'
        }
    ];

    for (var i = 0, feature; feature = features[i]; i++) {
        addMarker(feature);
    }
}