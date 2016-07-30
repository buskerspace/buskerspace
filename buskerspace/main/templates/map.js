function initMap() {

    var initialCoords = {lat: -37.800089, lng: 144.964451};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: initialCoords
    });

    var marker = new google.maps.Marker({
        position: {lat: -37.800089, lng: 144.964451},
        title: 'UNIHACK2016',
        draggable: false,
        animation: google.maps.Animation.DROP
    });

    marker.addListener('click', toggleBounce);

    marker.setMap(map);

    function toggleBounce() {
        if (marker.getAnimation() !== null)
            marker.setAnimation(null);
        else
            marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}