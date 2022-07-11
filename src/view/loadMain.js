// eslint-disable-next-line import/no-cycle
import { onUnitChange, getMainTemp } from '../logic/logic';

function getUnitDiv() {
  const unitDiv = document.createElement('div');
  const toggleInput = document.createElement('input');
  toggleInput.addEventListener('change', onUnitChange);
  toggleInput.type = 'checkbox';
  toggleInput.setAttribute('id', 'checkbox');

  const toggleLabel = document.createElement('label');
  toggleLabel.setAttribute('for', 'checkbox');
  toggleLabel.setAttribute('id', 'label-checkbox');

  const celsius = document.createElement('i');
  celsius.classList.add('fa-solid', 'fa-c');
  const fahrenheit = document.createElement('i');
  fahrenheit.classList.add('fa-solid', 'fa-f');
  const ball = document.createElement('div');
  ball.classList.add('ball');

  toggleLabel.append(celsius, fahrenheit, ball);

  unitDiv.append(toggleInput, toggleLabel);

  return unitDiv;
}

function getInputField() {
  const inputPlace = document.createElement('input');
  inputPlace.type = 'text';
  inputPlace.setAttribute('id', 'autocomplete');
  inputPlace.placeholder = 'Enter a place';

  return inputPlace;
}

function getOutputDiv() {
  const mainWrapper = document.createElement('div');

  const outputWrapper = document.createElement('div');
  outputWrapper.setAttribute('id', 'weather');

  const mainWeatherWrapper = document.createElement('div');
  mainWeatherWrapper.setAttribute('id', 'main-weather-wrapper');

  const mwwLeft = document.createElement('div');
  mwwLeft.setAttribute('id', 'mww-left');

  const placeName = document.createElement('h2');
  placeName.setAttribute('id', 'place-name');

  const mainWeather = document.createElement('p');
  mainWeather.setAttribute('id', 'main-weather');

  const mainWeatherDescription = document.createElement('p');
  mainWeatherDescription.setAttribute('id', 'weather-description');

  mwwLeft.append(placeName, mainWeather, mainWeatherDescription);

  const mainWeatherIcon = document.createElement('img');
  mainWeatherIcon.setAttribute('id', 'weather-icon');

  mainWeatherWrapper.append(mwwLeft, mainWeatherIcon);

  const mainTemperature = document.createElement('h2');
  mainTemperature.setAttribute('id', 'main-temp');

  const tempWidgets = document.createElement('div');
  tempWidgets.setAttribute('id', 'temp-widgets');

  const temperatureK = document.createElement('p');
  temperatureK.classList.add('tw-value');
  temperatureK.setAttribute('id', 'temp-kelvin');

  const humidity = document.createElement('p');
  humidity.classList.add('tw-value');
  humidity.setAttribute('id', 'temp-humid');

  const pressure = document.createElement('p');
  pressure.classList.add('tw-value');
  pressure.setAttribute('id', 'temp-pressure');

  const labelK = document.createElement('p');
  labelK.classList.add('tw-label');
  labelK.innerHTML = 'Kelvin';

  const labelHumidity = document.createElement('p');
  labelHumidity.classList.add('tw-label');
  labelHumidity.innerHTML = 'Humidity';

  const labelPressure = document.createElement('p');
  labelPressure.classList.add('tw-label');
  labelPressure.innerHTML = 'Atmospheric Pressure';

  tempWidgets.append(temperatureK, humidity, pressure, labelK, labelHumidity, labelPressure);

  outputWrapper.append(mainWeatherWrapper, mainTemperature, tempWidgets);

  mainWrapper.appendChild(outputWrapper);

  return outputWrapper;
}

function setTemperature(kelvin) {
  const mainTemperature = document.getElementById('main-temp');
  mainTemperature.innerHTML = getMainTemp(kelvin);
}

function loadResults(weatherData) {
  if (weatherData === undefined) return;

  const outputWrapper = document.getElementById('weather');
  outputWrapper.classList.add('active');

  const placeName = document.getElementById('place-name');
  placeName.innerHTML = `${weatherData.name}, ${weatherData.sys.country}`;

  const mainWeather = document.getElementById('main-weather');
  mainWeather.innerHTML = weatherData.weather[0].main;

  const mainWeatherDescription = document.getElementById('weather-description');
  mainWeatherDescription.innerHTML = weatherData.weather[0].description;

  const mainWeatherIcon = document.getElementById('weather-icon');
  mainWeatherIcon.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  const mainTemperature = document.getElementById('main-temp');
  mainTemperature.innerHTML = getMainTemp(weatherData.main.temp);

  const temperatureK = document.getElementById('temp-kelvin');
  temperatureK.innerHTML = `${weatherData.main.temp} K`;

  const humidity = document.getElementById('temp-humid');
  humidity.innerHTML = `${weatherData.main.humidity} %`;

  const pressure = document.getElementById('temp-pressure');
  pressure.classList.add('tw-value');
  pressure.innerHTML = `${weatherData.main.pressure} hPa`;
}

function getMainContent() {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('id', 'main-wrapper');

  const initialDiv = document.createElement('div');
  initialDiv.append(getUnitDiv(), getInputField());

  initialDiv.setAttribute('id', 'initial');

  wrapper.append(initialDiv, getOutputDiv());
  return wrapper;
}

export { getMainContent, loadResults, setTemperature };
