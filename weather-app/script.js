const apikey = "bc183e78ba3f5f761a339128f5635dcc";
const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?appid=${apikey}&q=${city}&units=metric`;
const icon_url = (icon) => `http://openweathermap.org/img/wn/${icon}.png`;
const threeDays_url = (city) =>
  `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=7&appid=${apikey}&units=metric`;

const searchEl = document.getElementById("search");
const form = document.getElementById("form");
const box = document.getElementById("box");
const box2 = document.getElementById("box2");

const d = new Date();
const day = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = searchEl.value;
  getCurrentWeather(city);
  getForcast(city);
});

async function getCurrentWeather(city) {
  const cityData = await fetch(url(city));
  const res = await cityData.json();
  console.log(res);

  const { name, main, weather } = res;
  const { temp } = main;
  const { description, icon } = weather[0];
  // console.log(name, temp, description, icon);
  const weather_container = document.createElement("div");
  weather_container.classList.add("weather-container");
  weather_container.innerHTML = `
  <div class="location">${name}</div>
  <div class="temp">
  <span class="icon">
  <img src="${icon_url(icon)}" alt="icon of ${description}">
  </span>
  ${temp.toFixed(1)}℃
  
  </div>
  <div class="sky">${description}</div>
  `;
  box.innerHTML = "";
  searchEl.value = "";
  box.appendChild(weather_container);
}

async function getForcast(city) {
  const cityData = await fetch(threeDays_url(city));
  const res = await cityData.json();
  const threeDaysForc = res.list;

  console.log(threeDaysForc);
  box2.innerHTML = "";
  threeDaysForc.forEach((item, index) => {
    const {
      temp: { min, max },
      weather,
    } = item;
    const { description, icon } = weather[0];
    const forcast = document.createElement("div");
    forcast.classList.add("forcast");
    forcast.innerHTML = `
    <div class="date">${d.getMonth() + 1} / ${d.getDate() + index + index} (${
      day[d.getDay() + index]
    })</div>
    <div class="temp">
      <span class="icon">
        <img src="${icon_url(icon)}" alt="icon of ${description}">
      </span>
      ${max.toFixed(1)} / ${min.toFixed(1)}℃ 
    </div>
    <div class="sky">${description}</div>
    `;
    box2.appendChild(forcast);
  });
}

// Default location
getCurrentWeather("yokohama");
getForcast("yokohama");
