import './styles/styles.css';
import { getFormattedData } from './scripts/api';
import {
  renderCurrentData,
  renderHourlyForecast,
  renderWeeklyForecast,
} from './scripts/DOMHandler';

async function displayWeather(location) {
  try {
    const weatherData = await getFormattedData(location);
    renderCurrentData(weatherData);
    renderHourlyForecast(weatherData);
    renderWeeklyForecast(weatherData);
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    alert('Invalid Location!');
  }
}

const submitButton = document.getElementById('submit-button');
const locationInput = document.getElementById('location-input');

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  const location = locationInput.value;

  if (location) {
    displayWeather(location);
  } else {
    alert('Please enter a value!');
  }
});
