async function getCityWeatherApi(place){
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place.city},${place.shorthandCountry}&APPID=a7ac8b5f50476d23defb190a962ac728`, {mode: "cors"});
        
        if (!response.ok) throw new Error('No city found');
        else {
            const dataObject = await response.json();
            console.log(dataObject)
        }
    } catch (error) {
        console.log(error);
    }
}

export default getCityWeatherApi;