let currentTime = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  let currentHours = date.getHours();
  let currentMinutes = date.getMinutes();

  let formattedDate = `${currentDay}, ${currentHours}:${currentMinutes}`;

  let time = document.querySelector("#time");
  time.innerHTML = formattedDate;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log("woooo");
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2 text-center">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "61db325da17f8bd9b87b232e74f03918";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showCityName(event) {
  event.preventDefault();
  let citynameInput = document.querySelector("#cityinput");
  let citySelector = document.querySelector("#city");
  citySelector.innerHTML = citynameInput.value;

  let city = citynameInput.value;

  let apiKey = "61db325da17f8bd9b87b232e74f03918";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temperatureSelector = document.querySelector("#temperature");
  let humiditySelector = document.querySelector("#humidity");
  let windSpeedSelector = document.querySelector("#windspeed");
  let descriptionSelector = document.querySelector("#description");
  let iconSelector = document.querySelector("#icon");

  //round this to 0 decimal places
  celsiusTemp = response.data.main.temp;
  let humidity = response.data.main.humidity;
  let windspeed = response.data.wind.speed;
  let description = response.data.weather[0].description;

  temperatureSelector.innerHTML = Math.round(celsiusTemp) + "°C";
  humiditySelector.innerHTML = humidity + "%";
  windSpeedSelector.innerHTML = windspeed + " km/h";
  descriptionSelector.innerHTML = description;
  iconSelector.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", showCityName);

//temp unit conversion
function showFahrenheit(event) {
  event.preventDefault();
  let temperatureSelector = document.querySelector("#temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureSelector.innerHTML = Math.round(fahrenheitTemp) + "°F";
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureSelector = document.querySelector("#temperature");
  temperatureSelector.innerHTML = Math.round(celsiusTemp) + "°C";
}

let celsiusTemp = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);
