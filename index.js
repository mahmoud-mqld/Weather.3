const current = new Date();
const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const timezone = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const zoneTime = document.getElementById("zone-time");
const zoneDate = document.getElementById("zone-date");

let forecastDays = document.querySelector(".days");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const API_KEY = "49cc8c821cd2aff9af04c9f98c36eb74";

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  timeEl.innerHTML =
    (hoursIn12HrFormat < 10 ? "0" + hoursIn12HrFormat : hoursIn12HrFormat) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    " " +
    `<span id="am-pm">${ampm}</span>`;

  dateEl.innerHTML = days[day] + ", " + date + " " + months[month];
}, 1000);

var forecast;
dateOfN = new Date("2023-12-26 19:30");

const weatherIcon = document.querySelector(".weather-icon");

const searchBtn = document.querySelector(".search button");
const searchBox = document.querySelector(".search input");


searchBtn.addEventListener("click", () => {
  getData(searchBox.value,forecastDays.value);
  reset();
});

searchBox.addEventListener("input", () => {
  getData(searchBox.value,forecastDays.value);
  reset();
});


forecastDays.addEventListener("input", () => {
  getData(searchBox.value,forecastDays.value);
  reset();
});



async function getData(city) {
  // let res = await fetch(api+city+'?key='+key+'&q='+city+'&aqi=no')
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=4090e100f6f248feb76100532232312
    &q=${city}
    &aqi=yes&days=${+forecastDays.value+1}`
  );

  let data = await res.json();
  if (res.status !== "OK") {
    console.log("not ok");
  }
  if (data.status !== "OK") {
    console.log("not ok");
  }
  console.log(data);

  console.log(data.forecast.forecastday[0]);

  document.querySelector(".weather-text").innerHTML =
    data.current.condition.text;
  document.querySelector(".city").innerHTML = data.location.name;
  document.querySelector(".temp").innerHTML =
    Math.round(data.current.temp_c) + "<span>°C</span>";
  document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
  document.querySelector(".wind").innerHTML = data.current.wind_kph + "km/h";
  weatherIcon.src = "https:" + data.current.condition.icon;
  document.querySelector(".rain-chance").innerHTML= data.forecast.forecastday[0].day.daily_chance_of_rain + "%"
  document.querySelector(".sunrise").innerHTML= data.forecast.forecastday[0].astro.sunrise 
  document.querySelector(".sunset").innerHTML= data.forecast.forecastday[0].astro.sunset 
  forecast(data);

  console.log(data.location.localtime);
  var zone = data.location.localtime;

  // setInterval(() => {
    const time = new Date(zone);
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    zoneTime.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    zoneDate.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

// }, 1000);
}

getData();

function forecast(data) {
  var forecast = "";

  for (let index = 1; index < data.forecast.forecastday.length; index++) {
    var dayForecast = new Date(data.forecast.forecastday[index].date);
    console.log(dayForecast);

    console.log(days[dayForecast.getDay()]);
    console.log(data.forecast.forecastday[index].day.avgtemp_c);

    var forecast = `
   
   <div class="weather-forecast" id="weather-forecast">
   <div class="weather-forecast-item">
    <div class="day">${days[dayForecast.getDay()]}</div>
    <img src="${
      data.forecast.forecastday[index].day.condition.icon
    }" alt="weather icon" class="w-icon">
    <h5>${data.forecast.forecastday[index].day.condition.text}</h5>

    <div class="temp"> <abbr title="Temperature">
     <svg xmlns="http://www.w3.org/2000/svg"class="bi bi-thermometer-half" viewBox="0 0 16 16">
    <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415"/>
    <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"/>
  </svg> </abbr>  ${
    data.forecast.forecastday[index].day.avgtemp_c
  }&#176; C</div>
    <div class="temp"><abbr title="Humidity">
     <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-moisture" viewBox="0 0 16 16">
    <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a28.458 28.458 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a28.458 28.458 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001zm0 0-.364-.343zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267"/>
  </svg></abbr> ${data.forecast.forecastday[index].day.avghumidity} %</div>
    <div class="temp">
    <abbr title="Chance of rain"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-rain-heavy" viewBox="0 0 16 16">
  <path d="M4.176 11.032a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 1 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 1 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 1 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm.229-7.005a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973M8.5 1a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 1"/>
</svg> </abbr>
      ${data.forecast.forecastday[index].day.daily_chance_of_rain} % </div>
  

    `;
    document.querySelector(".future-forecast").innerHTML += forecast;
  }
}

function reset() {
  document.querySelector(".future-forecast").innerHTML = "";
}
console.log(data.location.localtime);
