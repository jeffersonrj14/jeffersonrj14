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
  const GITHUB_USERNAME = 'jeffersonrj14';

  try {
    const userDataResponse = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}`);
    const userData = userDataResponse.data;

    const profile = `<img alt="Profile Total Visits" src="https://komarev.com/ghpvc/?username=jeffersonrj14&label=Profile%20Visits&color=1b7565&style=flat" />`;

    const greetings = ["Hi 👋", "Hey 👋", "Hello 👋"];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

    const greetingsText = `${randomGreeting}, My name is ${userData.name || GITHUB_USERNAME}`;

    const myRole = ["Self-Taught Developer"];

    function calculateAge(birthday) {
      const today = new Date();
      const birthDate = new Date(birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }

    const birthdate = '2001-03-14';
    const age = calculateAge(birthdate);

    const portfolioRepo = [
      {
        description: "My Personal Website",
        title: "Portfolio",
        githubLink: "https://github.com/jeffersonrj14/jeffersonrj.com"
      }
    ];

    //Currently
    const workingOn = portfolioRepo.map(repo => `[${repo.title}](${repo.githubLink})`);

    const company = userData.company;
    let status = 'learning';
    if (company) {
      status = `working at ${company}`;
    }
    
    const currentlyDoing = [
      `🚀 I’m currently working on **${workingOn}**`,
      `🌱 I'm currently ${status}`
    ];

    // Coding
    const coding = [
      {
        description: "My Coding Activity",
        title: "Activity",
        githubLink: "https://wakatime.com/share/@jeffersonrj14/ada550c6-38ce-47ab-bd1d-129b1679f376.svg"
      }
    ];
    const codingActivity = coding.map(repo => `![${repo.title}](${repo.githubLink})`);

    //==================================================================================
    // Tech
    // const techStack = {
    //   WebTechnologies: ['HTML', 'CSS'],
    //   Programming: ['JavaScript'],
    //   Frameworks: ['React.js'],
    //   Utils: ['Tailwind'],
    //   VersionControl: ['Git', 'GitHub'],
    //   CICD: ['GitHub Actions'],
    //   Deployment: ['Vercel', 'GitHub Pages'],
    //   Others: ['LaTeX']
    // };

    // const formattedSkills = Object.entries(techStack)
    //   .map(([category, skillsList]) => `**${category.replace(/([A-Z])/g, ' $1').trim()}:** <code>${skillsList.join('</code> <code>')}</code>`)
    //   .join('\n\n');

    //==================================================================================
    // Personal Goal
      // const currentlyLearning = [
      //   'Review Advanced JavaScript',
      //   'HTTP/JSON/AJAX + Asynchronous Javascript',
      //   'React Hooks',
      //   'TypeScript'
      // ];

      // const nextGoal = [
      //   'Learning Data Structures and Algorithms (DSA)',
      //   'Problem Solving (LeetCode, etc)',
      //   'Learn backend development'
      // ];

      // const futureGoal = [
      //   'Learn Databases',
      //   'Contribute to open-source projects',
      //   'Setting up raspberry pi'
      // ];
    //==================================================================================

    // Fun Facts
    const funFacts = [
      "I'm a night owl Person",
      "Love to read Japanese fiction novels, especially in the thriller and mystery genres.",
      "I speak three languages, with **English (Advanced)** and **Japanese (Advanced)** being among them."
    ];

    // Contact
    const contact = [
      {
        title: 'You can contact me through DM on',
        discord: '[Discord](https://discordapp.com/users/606481557615542273)',
        email: '[Email](mailto:jefferson@jeffersonrj.com)'
      },
    ];

    const weatherData = await fetchWeatherData();
    const today = new Date();
    const options = { weekday: 'long', timeZone: 'Asia/Jakarta' };
    const dayOfWeek = today.toLocaleDateString('en-US', options);

    const markdownContent = `

${profile}

<h3>${greetingsText}</h3>

> 
    ${myRole} based in ${userData.location || 'Not specified'}
    It's supposed to be ${weatherData.temperature}°C (${weatherData.temperatureF}°F) and ${weatherData.weatherEmoji} ${weatherData.weatherText} today. 

>   
    Have a great ${dayOfWeek}!

${currentlyDoing.map(item => `- ${item}`).join('\n')}

<br>

<details>
  <summary>Coding Activity</summary>

  ${codingActivity}
</details>

## ✨ Fun Facts

${funFacts.map(item => `- ${item}`).join('\n')}

## 📫 Contact

${contact[0].title} ${contact[0].discord} or via ${contact[0].email}
    `;

    fs.writeFileSync('README.md', markdownContent);

    console.log('README updated successfully');
  } catch (error) {
    console.error('Error updating README:', error);
  }
}

fetchGitHubData();


// ## 🛠️ Skills

// <details>
//   <summary>Current Skills</summary>
  
//   ${formattedSkills}

// </details>

// ## 📚 My Learning Progress

// <details>
//   <summary>Learning Goal</summary>

// ### Currently Learning

// ${currentlyLearning.map(item => `- ${item}`).join('\n')}

// ### Next Goal

// ${nextGoal.map(item => `- [ ] ${item}`).join('\n')}

// ### Future Goal

// ${futureGoal.map(item => `- [ ] ${item}`).join('\n')}

// </details>