const API_KEY = 'GU7PA4P2PVBLVNPZMQT8SGV3Q';

async function getWeatherData(location, startDate, endDate) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}/${endDate}?key=${API_KEY}&include=days,hours,current&iconSet=icons2`,
    );

    if (!response.ok) {
      throw new Error(
        `Weather API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    return null;
  }
}

function formatData(data) {
  return {
    location: data.resolvedAddress,
    timezone: data.timezone,
    current: {
      temperature: data.currentConditions.temp,
      humidity: data.currentConditions.humidity,
      windspeed: data.currentConditions.windspeed,
      sunrise: data.currentConditions.sunriseEpoch,
      sunset: data.currentConditions.sunsetEpoch,
      icon: data.currentConditions.icon,
    },
    hourlyData: data.days[0].hours.map((hourData) => ({
      time: hourData.datetimeEpoch,
      temperature: hourData.temp,
      icon: hourData.icon,
    })),
    weeklyData: data.days.map((dayData) => ({
      time: dayData.datetimeEpoch,
      tempMin: dayData.tempmin,
      tempMax: dayData.tempmax,
      icon: dayData.icon,
    })),
  };
}

async function getFormattedData(location) {
  const weekStart = Math.floor(new Date().getTime() / 1000);

  let weekEnd = new Date();
  weekEnd.setDate(weekEnd.getDate() + 6);
  weekEnd = Math.floor(weekEnd.getTime() / 1000);

  const rawData = await getWeatherData(location, weekStart, weekEnd);

  if (!rawData) {
    throw new Error('Failed to fetch weather data');
  }

  return formatData(rawData);
}

export { getFormattedData };
