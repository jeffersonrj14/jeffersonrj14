const fs = require('fs');
const axios = require('axios');


const WEATHER_API_TOKEN = process.env.WEATHER_API_TOKEN;
const WEATHER_DOMAIN = 'http://dataservice.accuweather.com';
const WEATHER_EMOJIS = {
  1: '☀️',
  2: '☀️',
  3: '🌤',
  4: '🌤',
  5: '🌤',
  6: '🌥',
  7: '☁️',
  8: '☁️',
  11: '🌫',
  12: '🌧',
  13: '🌦',
  14: '🌦',
  15: '⛈',
  16: '⛈',
  17: '🌦',
  18: '🌧',
  19: '🌨',
  20: '🌨',
  21: '🌨',
  22: '❄️',
  23: '❄️',
  24: '🌧',
  25: '🌧',
  26: '🌧',
  29: '🌧',
  30: '🌫',
  31: '🥵',
  32: '🥶',
}

const locationKey = '202242'; 

async function fetchWeatherData() {
  try {
    const weatherResponse = await axios.get(`${WEATHER_DOMAIN}/currentconditions/v1/${locationKey}?apikey=${WEATHER_API_TOKEN}`);
    const weatherData = weatherResponse.data[0];
    const temperature = weatherData.Temperature.Metric.Value;
    const temperatureF = weatherData.Temperature.Imperial.Value;
    const weatherText = weatherData.WeatherText.toLowerCase();
    const weatherEmoji = WEATHER_EMOJIS[weatherData.WeatherIcon] || '';

    return { temperature, temperatureF, weatherText, weatherEmoji };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}


async function fetchGitHubData() {
  try {
    // Fetch data from personalAPI
    const response = await axios.get(process.env.PERSONAL_API_URL);
    const userData = response.data;

    // Weather data
    const weatherData = await fetchWeatherData();
    const today = new Date();
    const options = { weekday: 'long', timeZone: 'Asia/Jakarta' };
    const dayOfWeek = today.toLocaleDateString('en-US', options);

    // Markdown Format
    const markdownContent = `

${userData.profileLink}

<h3>${userData.greetings}</h3>

> 
    ${userData.role} based in ${userData.location || 'Not specified'}
    It's supposed to be ${weatherData.temperature}°C (${weatherData.temperatureF}°F) and ${weatherData.weatherEmoji} ${weatherData.weatherText} today. 

>   
    Have a great ${dayOfWeek}!

${userData.readme}
    `;

    fs.writeFileSync('README.md', markdownContent);

    console.log('README updated successfully');
  } catch (error) {
    console.error('Error updating README:', error);
  }
}

fetchGitHubData();
