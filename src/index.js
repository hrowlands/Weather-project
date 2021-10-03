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
  //round this to 0 decimal places
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;

  let temperatureSelector = document.querySelector("#temperature");
  let humiditySelector = document.querySelector("#humidity");

  temperatureSelector.innerHTML = temperature + "°c";
  humiditySelector.innerHTML = humidity + "%";
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", showCityName);
