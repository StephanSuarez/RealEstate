(function(){
    const lat = document.querySelector('#latData').value;
    const lng = document.querySelector('#lngData').value;
    const title = document.querySelector('#titleData').value;
    
    const map = L.map('map').setView([lat, lng], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([lat, lng]).addTo(map).bindPopup(title);

})();
