import { onPlaceChange } from '../logic/logic';

let autocomplete;

function initMap() {
  // eslint-disable-next-line no-undef
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete'),
    {
      types: ['(cities)'],
      fields: ['address_components'],
    },
  );
  autocomplete.addListener('place_changed', onPlaceChange.bind(this, autocomplete));
}

function loadScript() {
  // FontAwesome
  const head = document.querySelector('head');
  const faScript = document.createElement('script');
  const faKitUrl = `https://kit.fontawesome.com/${process.env.FA_KIT}.js`;
  faScript.setAttribute('src', faKitUrl);
  faScript.setAttribute('crossorigin', '"anonymous"');

  head.appendChild(faScript);

  // PlacesAPI
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
