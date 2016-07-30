function initMap() {
  var myLatLng = {lat: -37.800089, lng: 144.964451};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'UNIHACK2016'
  });
}