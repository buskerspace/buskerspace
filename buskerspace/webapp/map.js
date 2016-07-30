var map = undefined;
var events = undefined;
var filters = undefined;

/* Initialise the map */
function initMap() {

    var initialCoords = {lat: -37.800089, lng: 144.964451};

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: initialCoords
    });

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
        distance: 20,
        musicalEvents: true,
        performanceEvents: true,
        otherEvents: true
    };

    var event = {
        lat: -37.800089,
        lng: 144.964451,
        title: 'UNIHACK2016',
        type: 'musical',
        desc: 'The big event that\'s on today. There are lots of people there.'
    };

    addEvent(event);
}

/* Add the event event to the map */
function addEvent(event) {

    // Parse event

    var images = {
        undef:       'https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png',
        musical:     'https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png',
        performance: 'https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png',
        other:       'https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png'
    };

    var icon = images.undef;

    switch (event.type) {
        case 'musical':
            icon = images.musical;
            break;
        case 'performance':
            icon = images.performance;
            break;
        case 'other':
            icon = images.other;
            break;
    }

    // Add marker

    var marker = new google.maps.Marker({
        map: map,
        position: {lat: event.lat, lng: event.lng},
        title: event.title,
        icon: icon
    });

    // Create InfoWindow

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

    // Add callbacks

    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });

    google.maps.event.addListener(map, "click", function() {
        infoWindow.close();
    });

    // Add event to list

    var eventObj = {
        marker:     marker,
        infoWindow: infoWindow,
        type:       event.type,
        lat:        event.lat,
        lng:        event.lng,
        title:      event.title,
        desc:       event.desc
    }

    switch (event.type) {
        case 'musical':
            events.musicalEvents.push(eventObj);
            break;
        case 'performance':
            events.performanceEvents.push(eventObj);
            break;
        case 'other':
            events.otherEvents.push(eventObj);
            break;
    }

}

/* Filter events */
function filterEvents() {

    var toggle;

    // Musical
    toggle = document.getElementById("checkbox-1").value;
    if (toggle != filters.musicalEvents) {
        setVisibility(events.musicalEvents, toggle);
        filters.musicalEvents = toggle;
    }

    // Performance
    toggle = document.getElementById("checkbox-2").value;
    if (toggle != filters.performanceEvents) {
        setVisibility(events.performanceEvents, toggle);
        filters.musicalEvents = toggle;
    }

    // Other
    toggle = document.getElementById("checkbox-3").value;
    if (toggle != filters.otherEvents) {
        setVisibility(events.otherEvents, toggle);
        filters.musicalEvents = toggle;
    }

    function setVisibility(eventList, toggle) {

        for (var i = 0, event; event = eventList[i]; i++) {
            if (toggle)
                event.marker.setMap(map);
            else
                event.marker.setMap(null);
        }
    }
}