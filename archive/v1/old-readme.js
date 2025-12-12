const fs = require('fs');
const axios = require('axios');

const WEATHER_API_TOKEN = process.env.WEATHER_API_TOKEN;
const WEATHER_DOMAIN = 'http://dataservice.accuweather.com';
//==================================================================================
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
//==================================================================================

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
  // const GITHUB_USERNAME = 'jeffersonrj14';

  try {
    //==================================================================================
    // const userDataResponse = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}`);
    // const userData = userDataResponse.data;
    //==================================================================================
    const greetings = ["Hi", "Hey", "Hello"];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

    const greetingsText = `${randomGreeting} there👋`;

    const myRole = ["Self-Taught Developer"];
    const location = ["Indonesia"];

    //==================================================================================
    //Currently
    const Currently = [
      {
        description: "#",
        title: "#",
        link: "#"
      }
    ]

    const currentProject = Currently.map(repo => `[${repo.title}](${repo.link})`);


    //==================================================================================
    const company = null;
    let status = `learning independently using various resources.`;
    
    if (company !== null) {
      status = `working at ${company}`;
    }
    //==================================================================================
    
    const currentlyDoing = [
      `🌱 I'm currently ${status}`,
      `⚡ Fun fact **I'm a night owl person**`,
      `📫 ${contact[0].title} **${contact[0].discord}** or via **${contact[0].email}**`
    ];
    //==================================================================================
    // Coding
    const coding = [
      {
        description: "My Coding Activity",
        title: "Activity",
        githubLink: "#"
      }
    ];
    const codingActivity = coding.map(repo => `![${repo.title}](${repo.githubLink})`);
    //==================================================================================
    // Tech
    const techStack = {
      ProgrammingLanguages: {
        current: [],
        ongoing: []
      },
      Frameworks: {
        current: [],
        ongoing: []
      },
      Database: {
        current: [],
        ongoing: []
      },
      Utilities: {
        current: [],
        ongoing: []
      },
      VersionControl: {
        current: [],
        ongoing: []
      },
      Deployment: {
        current: [],
        ongoing: []
      },
      Terminal: {
        current: [],
        ongoing: []
      }
    };
    
    const formattedSkills = Object.entries(techStack)
      .map(([category, skills]) => {
        const currentSkills = skills.current.map(skill => `<code>${skill}</code>`).join(' ・ ');
        const ongoingSkills = skills.ongoing.map(skill => `<code>${skill}</code>`).join(' ・ ');
    
        let result = `**${category.replace(/([A-Z])/g, ' $1').trim()}:**\n- ${currentSkills || '(none)'}`;
        
        if (ongoingSkills.length > 0) {
          result += `\n\n> Ongoing: ${ongoingSkills}`;
        }
        
        return result;
      })
      .join('\n\n');

    //==================================================================================
    // Fun Facts
    const funFacts = [
      "I'm a night owl Person",
      "Love to read Japanese fiction novels, especially in the thriller and mystery genres.",
      "I speak three languages, with **English (Advanced)** and **Japanese (Advanced)** being among them."
    ];

    const ImageInfo = [
      {
        title: "Developer Gif",
        link: "https://github.com/jeffersonrj14/jeffersonrj14/assets/132354045/59621905-047f-42fa-9ef0-087e7dba8bfc"
      }
    ]

    const image = ImageInfo.map(repo => `<img align="left" src="${repo.link}" alt="${repo.title}" />`);

    const weatherData = await fetchWeatherData();
    const today = new Date();
    const options = { weekday: 'long', timeZone: 'Asia/Jakarta' };
    const dayOfWeek = today.toLocaleDateString('en-US', options);

    const markdownContent = `

## ${greetingsText}
### ${myRole} from **${location}**

${image}

<div>
<div style="font-size: 16px">

It's supposed to be ${weatherData.temperature}°C (${weatherData.temperatureF}°F) and ${weatherData.weatherEmoji} ${weatherData.weatherText} today. 
<br>Have a great ${dayOfWeek}!

</div>

${currentlyDoing.map(item => `- ${item}`).join('\n')}

</div>

<br><br>

<div>
<p><img align="left" src="https://github-readme-stats.vercel.app/api/top-langs?username=jeffersonrj14&show_icons=true&locale=en&layout=compact&theme=tokyonight" alt="jeffersonrj14" /></p>

<p>&nbsp;<img align="center" src="https://github-readme-stats.vercel.app/api?username=jeffersonrj14\&hide=commits&theme=tokyonight&locale=en" alt="jeffersonrj14" /></p>
</div>
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

// ## ✨ Fun Facts

// ${funFacts.map(item => `- ${item}`).join('\n')}

// <br>
//<details>
//  <summary>Coding Activity</summary>
  
//  ${codingActivity}
//</details>
