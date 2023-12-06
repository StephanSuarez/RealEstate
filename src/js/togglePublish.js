(async  function(){
    const propertiesIds = document.querySelectorAll('.property-id');
    propertiesIds.forEach(property => {
        property.addEventListener('click', (e)=>{
            updatePropertyPublicated(e)
        });
    });

    async function updatePropertyPublicated(e){
        const { propertyId } = e.target.dataset;

        const url = `/property/update-publicated/${propertyId}`;
        const response = await  fetch(url, {
            method: 'PUT'
        });
        const res = await response.json();
        
        if (res.res === 'ok') {
            
            // Toggle the background color and text color based on the current status
            const propertyElement = document.querySelector(`.property-id[data-property-id="${propertyId}"]`);
            const statusElement = document.querySelector(`.property-status[data-property-status="${propertyId}"]`);
            const statusElementBall = document.querySelector(`.property-status-ball[data-property-status-ball="${propertyId}"]`);
            
            if (propertyElement) {
                // Toggle styles based on the current property status
                if (res.newStatus === 1) {
                    propertyElement.textContent = 'Publish'
                    statusElement.classList.remove('text-red-500');
                    statusElement.classList.add('text-green-500');
                    statusElement.textContent = 'Published'
                    statusElementBall.classList.remove('bg-red-500');
                    statusElementBall.classList.add('bg-green-500');
                } else {
                    propertyElement.textContent = 'Unpublis'
                    statusElement.classList.remove('text-green-500');
                    statusElement.classList.add('text-red-500');
                    statusElement.textContent = 'Unpublished'
                    statusElementBall.classList.remove('bg-green-500');
                    statusElementBall.classList.add('bg-red-500');
                }
            }
        }
    }
})();
