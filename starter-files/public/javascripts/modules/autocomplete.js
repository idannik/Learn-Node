function autocomplete(input, latInput, lngInput) {
    if(!input) {
        return;
    }
    const dropdown = new google.maps.places.Autocomplete(input) // side effect auto complete the input
    dropdown.addListener('place_changed', () => {
        const place = dropdown.getPlace();
        latInput.value = place.geometry.location.lat()
        lngInput.value = place.geometry.location.lng()
        
    })
    //if someone press enter in the address field, do not submit the form
    input.on('keydown', (e)=> {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    })

} 
export default autocomplete