import getCityWeatherApi from './weather';

let autocomplete;

function onPlaceChanged() {
  const place = autocomplete.getPlace();
  const city = place.address_components[0].long_name;
  const shorthandCountry = place.address_components[place.address_components.length - 1].short_name;

  if (!place.geometry) {
    document.getElementById('autocomplete').placeholder = 'Enter a place';
  } else {
    document.getElementById('autocomplete').innerHTML = place.name;
  }

  getCityWeatherApi({ city, shorthandCountry });
}

function initMap() {
  // eslint-disable-next-line no-undef
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete'),
    {
      types: ['(cities)'],
      fields: ['address_components'],
    },
  );
  autocomplete.addListener('place_changed', onPlaceChanged);
}

function loadScript() {
  const body = document.querySelector('body');
  const script = document.createElement('script');
  const placesApiUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.PLACES_API_KEY}&libraries=places&callback=initMap`;
  script.setAttribute('src', placesApiUrl);
  script.setAttribute('async', '');
  script.setAttribute('defer', '');

  body.appendChild(script);

  window.initMap = initMap;
}

export default loadScript;
