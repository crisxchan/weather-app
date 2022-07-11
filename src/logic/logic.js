import getCityWeatherApi from '../api/weather';
// eslint-disable-next-line import/no-cycle
import { loadResults, setTemperature } from '../view/loadMain';

let isTempUnitC = true;

function getMainTemp(kelvin) {
  console.log(kelvin);
  const temp = isTempUnitC ? `${(kelvin - 273.15).toFixed(1)} °C` : `${((kelvin - 273.15) * (9 / 5) + 32).toFixed(1)} °F`;
  return temp;
}

function onUnitChange() {
  const kelvin = document.getElementById('temp-kelvin');

  isTempUnitC = !isTempUnitC;
  setTemperature(kelvin.innerHTML.split('K')[0]);
}

function onPlaceChange(autocomplete) {
  let place = autocomplete.getPlace();

  try {
    place = `${place.address_components[0].long_name},${
      place.address_components[place.address_components.length - 1].short_name}`;
  } catch (error) {
    place = place.name;
  }

  getCityWeatherApi(place)
    .then((response) => loadResults(response))
    .catch((error) => console.log(error));
}

export { onPlaceChange, onUnitChange, getMainTemp };
