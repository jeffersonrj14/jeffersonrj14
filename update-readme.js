const fs = require('fs');
const axios = require('axios');


const WEATHER_API_TOKEN = 'iSDhM7djVEOtjxxM9PReWmbeqVHA4cmB';
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
  // const GITHUB_USERNAME = 'jeffersonrj14';

  try {
    //==================================================================================
    // const userDataResponse = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}`);
    // const userData = userDataResponse.data;
    //==================================================================================
    const greetings = ["Hi 👋", "Hey 👋", "Hello 👋"];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

    const greetingsText = `${randomGreeting}, My name is [RJ Jefferson](# "Ritch Johan Jefferson")`;

    const myRole = ["Self-Taught Developer"];

    //==================================================================================
    // Contact
    const contact = [
      {
        title: 'You can contact me through DM on',
        discord: '[Discord](https://discordapp.com/users/606481557615542273)',
        email: '[Email](mailto:jefferson@jeffersonrj.com)'
      },
    ];

    //==================================================================================
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

    //==================================================================================
    //Currently
    const portfolioRepo = [
      {
        description: "My Personal Website",
        title: "Portfolio",
        githubLink: "https://github.com/jeffersonrj14/jeffersonrj.com"
      }
    ];
    const workingOn = portfolioRepo.map(repo => `[${repo.title}](${repo.githubLink})`);

    const AvailableProject = [
      {
        description: "Projects available at portfolio",
        title: "jeffersonrj.com/projects",
        link: "https://jeffersonrj.com/projects"
      }
    ]

    const projects = AvailableProject.map(repo => `[${repo.title}](${repo.link})`);

    const Currently = [
      {
        description: "personal utilities",
        title: "personal utilities",
        link: "https://hi.jeffersonrj.com"
      }
    ]

    const currentProject = Currently.map(repo => `[${repo.title}](${repo.link})`);


    //==================================================================================
    const company = null;
    let status = `learning **CS50**`;
    
    if (company !== null) {
      status = `working at ${company}`;
    }

    const FAQs = [
      {
        description: "Before asking, make sure to read my",
        title: "FAQs",
        link: "https://jeffersonrj.com/faqs"
      }
    ]

    const frequentlyAsked = FAQs.map(repo => `**[${repo.title}](${repo.link})**`);
    
    const leetCode = [
      {
        description: "I've started to commit to solving 1 to 3 questions each week on ",
        title: "LeetCode",
        link: "https://leetcode.com/u/jeffersonrj14/"
      }
    ]
    const problemSolving = leetCode.map(repo => `**[${repo.title}](${repo.link})**`);
    //==================================================================================
    
    const currentlyDoing = [
      `💻 I'm currently working on **${currentProject}**`,
      `🌱 I'm currently ${status}`,
      `🚀 All of my projects are available at **${projects}**`,
      `⭐ ${leetCode[0].description} ${problemSolving}`,
      `⚡ Fun fact **I'm a night owl person**`,
      `📫 ${contact[0].title} **${contact[0].discord}** or via **${contact[0].email}**`
    ];

    const readyToWork = [
      `I'm open to Job opportunities where I can contribute, learn and grow. If you have a good opportunity that matches my skills and experience then don't hesitate to contact me.`
    ]

    //==================================================================================
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
    const socialLink = [
      {
        url: "https://twitter.com/jeffersonrj14",
        alt: "Twitter",
        target: "_blank", 
        icon: "./assets/twitter.svg",
        width: "40",
        height: "30"
      },
      {
        url: "https://discordapp.com/users/606481557615542273",
        alt: "Discord",
        target: "_blank", 
        icon: "./assets/discord.svg",
        width: "40",
        height: "30"
      },
    ]

    const connect = socialLink.map(social => 
      `<a href="${social.url}" target="${social.target}">
        <img align="center" src="${social.icon}" alt="${social.alt}" width="${social.width}" height="${social.height}" />
      </a>`
    );

    //==================================================================================
    // Tech Stack Icon

    const techIcon = [
      {
        url: "https://www.w3.org/html/",
        alt: "HTML5",
        target: "_blank",
        rel: "noreferrer", 
        icon: "./assets/tech-stack/HTML.svg",
        width: "40",
        height: "40"
      },
      {
        url: "https://www.w3schools.com/css/",
        alt: "CSS3",
        target: "_blank",
        rel: "noreferrer", 
        icon: "./assets/tech-stack/CSS.svg",
        width: "40",
        height: "40"
      },
      {
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        alt: "JavaScript",
        target: "_blank",
        rel: "noreferrer", 
        icon: "./assets/tech-stack/JavaScript.svg",
        width: "40",
        height: "40"
      },
      {
        url: "https://reactjs.org/",
        alt: "React JS",
        target: "_blank",
        rel: "noreferrer", 
        icon: "./assets/tech-stack/React-Dark.svg",
        width: "40",
        height: "40"
      },
      {
        url: "https://nextjs.org/",
        alt: "nextjs",
        target: "_blank",
        rel: "noreferrer", 
        icon: "./assets/tech-stack/NextJS-Dark.svg",
        width: "40",
        height: "40"
      },
      {
        url: "https://astro.build/",
        alt: "astro",
        target: "_blank",
        rel: "noreferrer", 
        icon: "./assets/tech-stack/astro.svg",
        width: "40",
        height: "40"
      },
      {
        url: "https://nodejs.org",
        alt: "nodejs",
        target: "_blank",
        rel: "noreferrer", 
        icon: "./assets/tech-stack/nodeJS.svg",
        width: "40",
        height: "40"
      },
      {
        url: "https://git-scm.com/",
        alt: "git",
        target: "_blank",
        rel: "noreferrer", 
        icon: "./assets/tech-stack/Git.svg",
        width: "40",
        height: "40"
      }
    ]


    const listTech = techIcon.map(tech => 
      `<a href="${tech.url}" target="${tech.target}" rel="${tech.rel}">
        <img src="${tech.icon}" alt="${tech.alt}" width="${tech.width}" height="${tech.height}" />
      </a>`
    );
    

    //==================================================================================
    // Tech
    const techStack = {
      WebTechnologies: ['HTML', 'CSS'],
      Programming: ['JavaScript'],
      Frameworks: ['React.js'],
      Utils: ['Tailwind'],
      VersionControl: ['Git', 'GitHub'],
      CICD: ['GitHub Actions'],
      Deployment: ['Vercel', 'GitHub Pages'],
      Others: ['LaTeX']
    };

    const formattedSkills = Object.entries(techStack)
      .map(([category, skillsList]) => `**${category.replace(/([A-Z])/g, ' $1').trim()}:** <code>${skillsList.join('</code> <code>')}</code>`)
      .join('\n\n');

    //==================================================================================
    // Fun Facts
    const funFacts = [
      "I'm a night owl Person",
      "Love to read Japanese fiction novels, especially in the thriller and mystery genres.",
      "I speak three languages, with **English (Advanced)** and **Japanese (Advanced)** being among them."
    ];

    const weatherData = await fetchWeatherData();
    const today = new Date();
    const options = { weekday: 'long', timeZone: 'Asia/Jakarta' };
    const dayOfWeek = today.toLocaleDateString('en-US', options);

    const markdownContent = `

## ${greetingsText}
### ${myRole} from **Indonesia**

<div style="font-size: 16px">

It's supposed to be ${weatherData.temperature}°C (${weatherData.temperatureF}°F) and ${weatherData.weatherEmoji} ${weatherData.weatherText} today. 
<br>Have a great ${dayOfWeek}!

</div>

${currentlyDoing.map(item => `- ${item}`).join('\n')}
<br>
<details>
  <summary>Coding Activity</summary>

  ${codingActivity}

</details>

### Languages and Tools:

<p>${listTech.join('')}</p>

<br>
<p><img align="left" src="https://github-readme-stats.vercel.app/api/top-langs?username=jeffersonrj14&show_icons=true&locale=en&layout=compact&theme=tokyonight" alt="jeffersonrj14" /></p>

<p>&nbsp;<img align="center" src="https://github-readme-stats.vercel.app/api?username=jeffersonrj14\&hide=commits&theme=tokyonight&locale=en" alt="jeffersonrj14" /></p>
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