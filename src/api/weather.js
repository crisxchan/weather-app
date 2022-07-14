// eslint-disable-next-line consistent-return
async function getCityWeatherApi(place) {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=${process.env.OPEN_WEATHER_KEY}`, { mode: 'cors' });

    if (!response.ok) throw new Error('No city found');
    else {
      const dataObject = await response.json();
      return dataObject;
    }
  } catch (error) {
    console.log(error);
  }
}

export default getCityWeatherApi;
