var map = undefined;
var events = undefined;
var filters = undefined;

var imgurl = 'https://raw.githubusercontent.com/buskerspace/buskerspace/master/buskerspace/webapp/image/';
var icons = undefined;
var shapes = undefined;

/* Initialise the map */
function initMap() {

    var initialCoords = {lat: -37.800089, lng: 144.964451};

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: initialCoords
    });

    icons = {
        musical: {
            url: imgurl + 'icon-musical.png',
            size: new google.maps.Size(20, 32),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 32)
        },
        performance: {
            url: imgurl + 'icon-performance.png',
            size: new google.maps.Size(20, 32),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 32)
        },
        other: {
            url: imgurl + 'icon-other.png',
            size: new google.maps.Size(20, 32),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 32)
        },
        undef: ''
    };

    shapes = {
        musical: {
            coords: [1,1,  1,20,  18,20,  18,1],
            type: 'poly'
        },
        performance: {
            coords: [1,1,  1,20,  18,20,  18,1],
            type: 'poly'
        },
        other: {
            coords: [1,1,  1,20,  18,20,  18,1],
            type: 'poly'
        },
        undef: ''
    };

    onLoad();
}

/* Initialise JavaScript */
function onLoad() {

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

    var event = {
        lat: -37.800089,
        lng: 144.964451,
        title: 'UNIHACK2016',
        buskerid: 2016,
        buskername: 'Busker Space',
        type: 'musical',
        desc: 'The big event that\'s on today. There are lots of people there.'
    };

    addEvent(event);
}

/* Add the event event to the map */
function addEvent(event) {

    // Parse event

    var icon = '';
    var shape = '';

    switch (event.type) {
        case 'musical':
            icon = icons.musical;
            shape = shapes.musical;
            break;
        case 'performance':
            icon = icons.performance;
            shape = shapes.performance;
            break;
        case 'other':
            icon = icons.other;
            shape = shapes.other;
            break;
        default:
            icon = icons.undef;
            shape = shapes.undef;
            break;
    }

    console.log(icon);
    console.log(shape);

    // Add marker

    var marker = new google.maps.Marker({
        map: map,
        position: {lat: event.lat, lng: event.lng},
        title: event.title,
        icon: ''
    });

    // Create InfoWindow

    var windowDiv   = document.createElement("div");
    var windowTitle = document.createElement("p");
    var windowName  = document.createElement("a");
    var windowDesc  = document.createElement("p");

    windowDiv.appendChild(windowTitle);
    windowDiv.appendChild(windowName);
    windowDiv.appendChild(windowDesc);

    var element = document.createElement("span");
    element.innerHTML = event.title;
    windowTitle.appendChild(element);
    element = document.createElement("span");
    element.innerHTML = event.buskername;
    windowName.appendChild(element);
    element = document.createElement("span");
    element.innerHTML = event.desc;
    windowDesc.appendChild(element);

    windowName.setAttribute("href", "/profile/" + event.buskerid + "/");

    windowTitle.className = "eventtitle";
    windowName.className  = "eventname";
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
    toggle = document.getElementById("checkbox-1").checked;

    if (toggle != filters.musicalEvents) {
        setVisibility(events.musicalEvents, toggle);
        filters.musicalEvents = toggle;
    }

    // Performance
    toggle = document.getElementById("checkbox-2").checked;
    if (toggle != filters.performanceEvents) {
        setVisibility(events.performanceEvents, toggle);
        filters.performanceEvents = toggle;
    }

    // Other
    toggle = document.getElementById("checkbox-3").checked;
    if (toggle != filters.otherEvents) {
        setVisibility(events.otherEvents, toggle);
        filters.otherEvents = toggle;
    }

    function setVisibility(eventList, toggle) {

        for (var i = 1, event; event = eventList[i]; i++) {
            if (toggle)
                event.marker.setMap(map);
            else
                event.marker.setMap(null);
        }
    }
}