// api token 9dfb3982f4e44cee088dc829481cd269
// 5day 3hour api api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// geocoding api http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
const token = '9dfb3982f4e44cee088dc829481cd269';

var city = "Fargo"

var lat = "";
var lon = "";


fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${token}`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    lat = data[0].lat;
    lon = data[0].lon;
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${token}&units=imperial`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let tempF = Math.floor(data.list[0].main.temp);
      let tempC = Math.floor((tempF - 32) * 5/9);
      let temps = `${tempF}°F/${tempC}°C`
      let city = data.city.name
      let date0 = data.list[0].dt_txt
      let icon = data.list[0].weather[0].icon
      let humidity = data.list[0].main.humidity
      let windSpeed = data.list[0].wind.speed
      // city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
      console.log(city);
      console.log(dayjs(date0).format('ddd, MMM D'));
      console.log(icon);
      console.log(temps);
      console.log(`Humidity: ${humidity}%`);
      console.log(`Wind: ${windSpeed}mph`);
    })
  })

