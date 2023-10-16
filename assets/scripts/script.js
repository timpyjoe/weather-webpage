const token = '9dfb3982f4e44cee088dc829481cd269';


var cityArr = [];

var lat = "";
var lon = "";



$(".search-panel").on("click", ".btn", function(event) {
  // clears the previous 5 day forecast and resets search history
  $("div").remove(".card");
  $(".history").empty();

  if (event.target.matches("#submit")) {
    var city = $("#city-search").val();
  }
  else {
    var city = event.target.getAttribute("value");
  }
  cityArr.unshift(city);
  if (cityArr.length > 5) {
    cityArr.pop();
  }
  $(".weather").attr("style", "visibility: visible");
  $("#city-search").val("");
  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityArr[0]}&limit=1&appid=${token}`)
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
        let temps = `${tempF}°F / ${tempC}°C`;
        let city = data.city.name;
        let date0 = data.list[0].dt_txt;
        let icon = data.list[0].weather[0].icon;
        let humidity = data.list[0].main.humidity;
        let windSpeed = data.list[0].wind.speed;
        // Sets the data for the 'current weather' section of the page
        $("#city-date").text(`${city} (${dayjs(date0).format('ddd, MMM D')})`);
        $("#icon").attr("src", `https://openweathermap.org/img/w/${icon}.png`);
        $("#temp").text(`Temp: ${temps}`);
        $("#wind").text(`Wind: ${windSpeed} mph`);
        $("#humid").text(`Humidity: ${humidity}%`);
        for (var i = 7; i < data.list.length; i+=8) {
          // grabs the new data for each cycle of the loop
          let tempF = Math.floor(data.list[i].main.temp);
          let tempC = Math.floor((tempF - 32) * 5/9);
          let temps = `${tempF}°F / ${tempC}°C`;
          let date = data.list[i].dt_txt;
          let icon = data.list[i].weather[0].icon;
          let humidity = data.list[i].main.humidity;
          let windSpeed = data.list[i].wind.speed;

          // parses all the data from above and adds it to/builds the card
          let nextDay = document.createElement("div");
          nextDay.setAttribute("class", "card col-8 col-lg-2");
          let content = document.createElement("div");
          content.setAttribute("class", "card-body");

          let forecastDate = document.createElement("h5");
          forecastDate.setAttribute("class", "card-title");
          forecastDate.textContent = dayjs(date).format('ddd, MMM D');
          content.appendChild(forecastDate);

          let nextIcon = document.createElement("img");
          nextIcon.setAttribute("src", `https://openweathermap.org/img/w/${icon}.png`);
          content.appendChild(nextIcon);
          
          let nextTemp = document.createElement("p");
          nextTemp.setAttribute("class", "card-text");
          nextTemp.textContent = `Temp: ${temps}`;
          content.appendChild(nextTemp);
          
          let nextWind = document.createElement("p");
          nextWind.setAttribute("class", "card-text");
          nextWind.textContent = `Wind: ${windSpeed} mph`;
          content.appendChild(nextWind);

          let nextHumid = document.createElement("p");
          nextHumid.setAttribute("class", "card-text");
          nextHumid.textContent = `Humidity: ${humidity} %`;
          content.appendChild(nextHumid);

          nextDay.appendChild(content);
          $(".forecast").append(nextDay);

        }
      })
    })
    cityArr.forEach(function(city) {
      var nextCity = document.createElement("button");
      nextCity.setAttribute("class", "btn btn-secondary col-12");
      nextCity.textContent = city;
      nextCity.setAttribute("value", city);
      nextCity.setAttribute("type", "button");
      $(".history").append(nextCity);
    })
  })
