const token = '9dfb3982f4e44cee088dc829481cd269';

var cityArr = [];

var lat = "";
var lon = "";

$("button").on("click", function(event) {
  var city = "Fargo"
  // var city = $("#city-search").val();
  $("#city-search").val("");
  cityArr.push(city);
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
        let temps = `${tempF}°F / ${tempC}°C`
        let city = data.city.name
        let date0 = data.list[0].dt_txt
        let icon = data.list[0].weather[0].icon
        let humidity = data.list[0].main.humidity
        let windSpeed = data.list[0].wind.speed
        // city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
        $("#city-date").text(`${city} (${dayjs(date0).format('ddd, MMM D')})`);
        $("#icon").addClass(icon);
        $("#temp").text(`Temp: ${temps}`);
        $("#wind").text(`Wind: ${windSpeed} mph`);
        $("#humid").text(`Humidity: ${humidity}%`);
        for (var i = 7; i < data.list.length; i+=8) {
          let tempF = Math.floor(data.list[i].main.temp);
          let tempC = Math.floor((tempF - 32) * 5/9);
          let temps = `${tempF}°F / ${tempC}°C`
          let city = data.city.name
          let date = data.list[i].dt_txt
          let icon = data.list[i].weather[0].icon
          let humidity = data.list[i].main.humidity
          let windSpeed = data.list[i].wind.speed
          var nextDay = document.createElement("div");
          nextDay.setAttribute("class", "card col-2");


          $(".forecast").append(nextDay);

        }
      })
    })
    var nextCity = document.createElement("button");
    nextCity.setAttribute("class", "btn btn-secondary col-12");
    nextCity.textContent = city;
    nextCity.setAttribute("type", "button");
    $(".search-panel").append(nextCity);
  })
