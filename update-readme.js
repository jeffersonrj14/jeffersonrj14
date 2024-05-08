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
    const username = 'jeffersonrj14';
    const repoUser = 'jeffersonrj14';
    const repoName = 'jeffersonrj.com';

    // About me
    const userResponse = await axios.get(`https://api.github.com/users/${username}`);
    const userData = userResponse.data;

    //Portfolio
    const repoPortfolio = await axios.get(`https://api.github.com/repos/${repoUser}/${repoName}`);
    const repoSite = repoPortfolio.data;

    //weather
    const weatherData = await fetchWeatherData();
    const today = new Date();
    const options = { weekday: 'long', timeZone: 'Asia/Jakarta' };
    const dayOfWeek = today.toLocaleDateString('en-US', options);

    //Status
    const company = userData.company;
    let status = 'learning **Next.Js**';
    if (company) {
      status = `working at ${company}`;
    }

    // Markdown Format
    const markdownContent = `

<img alt="Profile Total Visits" src="https://komarev.com/ghpvc/?username=jeffersonrj14&label=Profile%20Visits&color=1b7565&style=flat" />
<a href="https://wakatime.com/@jeffersonrj14"><img src="https://wakatime.com/badge/user/012554dc-b24b-4b6b-90bf-92214455e325.svg?&color=1b7565&style=flat" alt="Total time coded since Jan 11 2023" /></a>

<h3>Hi 👋, My name is ${userData.name || username}</h3>

> 
    Based in Indonesia and it's supposed to be ${weatherData.temperature}°C (${weatherData.temperatureF}°F) and ${weatherData.weatherEmoji} ${weatherData.weatherText} today. 
    Have a great ${dayOfWeek}!

I'm 22 year old Self Taught Developer based in ${userData.location || 'Not specified'} and have a deep passion for web development.

- Check out my **[Portfolio](${repoSite.html_url})** to learn more about me
- 🚀 I’m currently working on  **[Portfolio](https://${userData.blog || ''})**
- 🌱 I’m currently ${status} 

> Any advice is welcome, so I can also learn from other developers, etc.
<br>

<details>
  <summary>Coding Stats</summary>

  ![langs](https://wakatime.com/share/@jeffersonrj14/136eb683-c873-4692-abe8-b3a1d880659b.svg)
</details>

<details>
  <summary>Coding Activity</summary>

  ![activity](https://wakatime.com/share/@jeffersonrj14/ada550c6-38ce-47ab-bd1d-129b1679f376.svg)
</details>

## 🛠️ Skills

**Programming:** <code>JavaScript</code> <code>TypeScript</code>

**Framework/Library:** <code>React.js</code> <code>Next.js</code>

**Utils:** <code>Tailwind</code>

**Version Control:** <code>Git</code> <code>GitHub</code>

**CI/CD:** <code>GitHub Actions</code>

**Deployment/Hosting** <code>Vercel</code> <code>GitHub Pages</code>

**Others:** <code>LaTeX</code>

## ✨ Fun Facts
- I'm a night owl Person
- Love reading Japanese novels.
  - Novels that I have read: 
    - [告白 （双葉文庫）by 	湊 かなえ （著）](https://honto.jp/netstore/pd-book_03247858.html)
    - [あの夏が飽和する。 by 	カンザキイオリ](https://honto.jp/ebook/pd_30499106.html)
    - [容疑者Ｘの献身 （文春文庫 ガリレオ）by 	東野 圭吾 （著）](https://honto.jp/netstore/pd-book_03022366.html)

## 📫 Contact

 You can DM me on [Discord](https://discordapp.com/users/606481557615542273) or [Email](mailto:jefferson@jeffersonrj.com) me.
`;

    fs.writeFileSync('README.md', markdownContent);

    console.log('README updated successfully');
  } catch (error) {
    console.error('Error updating README:', error);
  }
}

fetchGitHubData();