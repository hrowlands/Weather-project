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

console.log(formatDate(currentTime));

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
