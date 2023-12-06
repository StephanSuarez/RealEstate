(function() {
    const lat = 4.712485;
    const lng = -74.071568;
    const map = L.map('map').setView([lat, lng], 12);
    const filters = {
        category: '',
        price: ''
    }

    let properties = [];

    let markers = new L.FeatureGroup().addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);  

    try {
        const getPropertiesFromApi = async ()=>{
            const url = '/api/properties';
            const res = await fetch(url);
            properties = await res.json();
            
            addPropertiesToMap(properties);
        } 
        
        getPropertiesFromApi();

        const addPropertiesToMap = (properties)=>{
            markers.clearLayers()   
            properties.forEach(property => {
                const marker = new L.marker([property?.latitude, property?.longitude], {
                    autoPan: true,
                }).addTo(map).bindPopup(`
                <div class="">
                    <div class="text-lg">
                        <h3>${property.title}</h3>
                        <a href="/property/information/${property.id}">
                            <img src="/uploads/${property.image}" alt="${property.title}" class="img-thumbnail">
                        </a>
                        
                    </div>
                    <div class="text-center" style="height: 100%;">
                    <p>Category: ${property.category.category}</p>
                    <p>Price: ${property.price.price}</p>
                        <div class="bg-gray-100 shadow-md p-4 rounded">
                            <p>${property.description}</p>
                            <a style="color: #ffffff; transition: color 0.3s ease-in-out;" href="/property/information/${property.id}" class="text-lg font-semibold transition duration-300 ease-in-out transform hover:translate-y-0.5 hover:bg-black bg-green-500 px-4 py-2 rounded-lg shadow-lg">Ver Propiedad</a>

                        </div>
                    </div>
                </div>

                `);
                markers.addLayer(marker);
            });
        }

        document.querySelector('#categoryFilter').addEventListener('change', e=>{
            filters.category = e.target.value;
            filterProperties()
        });
    
        document.querySelector('#priceFilter').addEventListener('change', e=>{
            filters.price = e.target.value;
            filterProperties()

        });

       
        const filterProperties = ()=> {
            const propertiesFilter = properties.filter( filterByCategories ).filter( filterByPrices );
            addPropertiesToMap(propertiesFilter);
            
        };

        const filterByCategories = property=> filters.category ? property.categoryId == filters.category : property ;

        const filterByPrices = property => filters.price ? property.priceId == filters.price : property ;

    } catch (error) {
        console.log(error)
    }

})()