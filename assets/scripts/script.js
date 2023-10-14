// api token 9dfb3982f4e44cee088dc829481cd269
// 5day 3hour api api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// geocoding api http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
const token = '9dfb3982f4e44cee088dc829481cd269';

var city = "Minneapolis"

var lat = "";
var lon = "";

fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${token}`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    lat = data[0].lat;
    lon = data[0].lon;
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${token}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
  })

