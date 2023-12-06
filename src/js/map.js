(function() {
    const lat = 4.712485;
    const lng = -74.071568;
    const map = L.map('map').setView([lat, lng], 17);
    let marker;

    // geolocalitation
    const geocodeService = L.esri.Geocoding.geocodeService();
    

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Creating marker
    marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true
    })
    .addTo(map)

    // getting data marker move event
    marker.on('moveend', function(e){
        marker = e.target;
        
        const position = marker.getLatLng();
        map.panTo(new L.LatLng(position.lat, position.lng));

        geocodeService.reverse().latlng(position, 17).run(function(error, result){
            marker.bindPopup(result.address.LongLabel)

            // fill data in input 
            document.querySelector('.showAddress').textContent = result.address.Address ?? '';
            document.querySelector('#addressData').value = result.address.Address ?? '';
            document.querySelector('#latData').value = result.latlng.lat ?? '';
            document.querySelector('#lngData').value = result.latlng.lng ?? '';
        })
    }) 
})()