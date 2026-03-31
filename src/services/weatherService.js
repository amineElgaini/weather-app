const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

export async function searchCity(name) {
  if (!name || name.length < 2) return [];
  try {
    const response = await fetch(`${GEOCODING_API}?name=${encodeURIComponent(name)}&count=5&language=en&format=json`);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching city:', error);
    return [];
  }
}

export async function getWeatherData(lat, lon) {
  try {
    const params = new URLSearchParams({
      latitude: lat,
      longitude: lon,
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset',
      timezone: 'auto'
    });
    const response = await fetch(`${WEATHER_API}?${params.toString()}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

export const getWeatherDescription = (code) => {
  const codes = {
    0: { label: 'Clear Sky', icon: 'Sun' },
    1: { label: 'Mainly Clear', icon: 'CloudSun' },
    2: { label: 'Partly Cloudy', icon: 'CloudSun' },
    3: { label: 'Overcast', icon: 'Cloud' },
    45: { label: 'Foggy', icon: 'CloudFog' },
    48: { label: 'Rime Fog', icon: 'CloudFog' },
    51: { label: 'Light Drizzle', icon: 'CloudDrizzle' },
    53: { label: 'Moderate Drizzle', icon: 'CloudDrizzle' },
    55: { label: 'Dense Drizzle', icon: 'CloudDrizzle' },
    61: { label: 'Slight Rain', icon: 'CloudRain' },
    63: { label: 'Moderate Rain', icon: 'CloudRain' },
    65: { label: 'Heavy Rain', icon: 'CloudRain' },
    71: { label: 'Slight Snow', icon: 'CloudSnow' },
    73: { label: 'Moderate Snow', icon: 'CloudSnow' },
    75: { label: 'Heavy Snow', icon: 'CloudSnow' },
    80: { label: 'Slight Showers', icon: 'CloudRain' },
    81: { label: 'Moderate Showers', icon: 'CloudRain' },
    82: { label: 'Violent Showers', icon: 'CloudRain' },
    95: { label: 'Thunderstorm', icon: 'CloudLightning' },
  };
  return codes[code] || { label: 'Unknown', icon: 'Cloud' };
};
