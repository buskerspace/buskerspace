function initMap() {

    var initialCoords = {lat: -37.800089, lng: 144.964451};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: initialCoords
    });

    var event = {
        lat: -37.800089,
        lng: 144.964451,
        title: 'UNIHACK2016',
        type: 'musical',
        desc: 'The big event that\'s on today. There are lots of people there.'
    };

    addEvent(map, event);

    return map;
}

function addEvent(map, event) {

    var images = {
        undef:   'https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png',
        musical: 'https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png'
    };

    var icon = images.undef;

    switch (event.type) {
        case 'musical':
            icon = images.musical;
            break;
    }

    var marker = new google.maps.Marker({
        map: map,
        position: {lat: event.lat, lng: event.lng},
        title: event.title,
        icon: icon
    });


    var windowDiv   = document.createElement("div");
    var windowTitle = document.createElement("p");
    var windowDesc  = document.createElement("p");

    windowDiv.appendChild(windowTitle);
    windowDiv.appendChild(windowDesc);

    windowTitle.appendChild(
        document.createTextNode(event.title));
    windowDesc.appendChild(
        document.createTextNode(event.desc));

    windowTitle.className = "eventtitle";
    windowDesc.className  = "eventdesc";

    var infoWindow = new google.maps.InfoWindow({
        content: windowDiv
    });

    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });

    google.maps.event.addListener(map, "click", function() {
        infoWindow.close();
    });

}