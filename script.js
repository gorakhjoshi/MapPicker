'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    // console.log(position);

    const { latitude, longitude } = position.coords;
    // console.log(latitude);

    console.log(`https://www.google.com/maps/@${latitude},${longitude}`)

    const coords = [latitude, longitude]

    map = L.map('map').setView(coords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);



    // console.dir(map)
    map.on('click', function (mapE) {
      mapEvent = mapE;
      form.classList.remove('hidden');
      inputDistance.focus();


    })


  }
    , function () {
      console.log('Can not access your coordinates')
    })

}

form.addEventListener ( 'submit', function (e) {

    e.preventDefault();

    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

    const { lat, lng } = mapEvent.latlng;

    L.marker([lat, lng]).addTo(map)
      .bindPopup(L.popup({ maxWidth: 300, minWidth: 150, autoClose: false, closeOnClick: false, className: 'running-popup' })).setPopupContent('this is popup')
      .openPopup();
  
});