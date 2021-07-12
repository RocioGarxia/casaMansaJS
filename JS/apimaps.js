function iniciarMap(){
    let coord = {lat: 41.3728571 ,lng: 2.153191};
    let map = new google.maps.Map(document.getElementById('map'),{
      zoom: 10,
      center: coord
    });
    let marker = new google.maps.Marker({
      position: coord,
      map: map
    });
}