function initMap() {
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
        center: {lat: 37.8136, lng: 144.9631},
        zoom: 8
    });
}