const locationName = document.getElementById('location');
const currentTemperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windspeed');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const weatherImg = document.getElementById('weather-icon');

const hourlySection = document.getElementById('hourly-section');
const weeklySection = document.getElementById('weekly-section');

let timezone;

function renderCurrentData(data) {
  timezone = data.timezone;

  locationName.textContent = data.location;
  currentTemperature.textContent = `${convertToCelsius(data.current.temperature)}°C`;
  humidity.textContent = `${data.current.humidity} %`;
  windSpeed.textContent = `${data.current.windspeed} km/h`;
  sunrise.textContent = formatTime(data.current.sunrise, timezone);
  sunset.textContent = formatTime(data.current.sunset, timezone);
  weatherImg.src = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Color/${data.current.icon}.svg`;
  weatherImg.style.display = 'block';
}

function renderHourlyForecast(data) {
  hourlySection.innerHTML = '';
  const hourlyData = data.hourlyData;

  hourlyData.forEach((hour) => {
    const hourElement = document.createElement('div');
    hourElement.classList.add('hour-data');

    hourElement.innerHTML = `
        <p class="time bold">${formatTime12HourFormat(hour.time, timezone)}</p>
        <img
            src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Color/${hour.icon}.svg"
            alt="weather-icon"
        />
        <p class="temperature bold">${convertToCelsius(hour.temperature)}°C</p>
    `;

    hourlySection.appendChild(hourElement);
  });
}

function renderWeeklyForecast(data) {
  weeklySection.innerHTML = '';
  const weeklyData = data.weeklyData;

  weeklyData.forEach((day) => {
    const dayElement = document.createElement('div');
    dayElement.classList.add('week-data');

    dayElement.innerHTML = `
            <p class="day bold">${getDayOfWeek(day.time)}</p>
            <img
              src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Color/${day.icon}.svg"
              alt="weather-icon"
            />
            <p class="temperature">${convertToCelsius(day.tempMax)}/${convertToCelsius(day.tempMin)}</p>
    `;

    weeklySection.appendChild(dayElement);
  });
}

function getDayOfWeek(timestamp, timezone) {
  const date = new Date(timestamp * 1000);
  const options = { weekday: 'short', timeZone: timezone };
  const dayOfWeek = new Intl.DateTimeFormat('en-US', options).format(date);
  return dayOfWeek;
}

function convertToCelsius(temperature) {
  return Math.floor(((temperature - 32) * 5) / 9);
}

function formatTime12HourFormat(timestamp, timezone) {
  const date = new Date(timestamp * 1000);
  const time = date.toLocaleTimeString([], {
    hour: '2-digit',
    hour12: true,
    timeZone: timezone,
  });

  return time.replace(' ', '').toUpperCase();
}

function formatTime(timestamp, timezone) {
  const date = new Date(timestamp * 1000);
  const time = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: timezone,
  });
  return time;
}

export { renderCurrentData, renderHourlyForecast, renderWeeklyForecast };
