const fs = require('fs');
const axios = require('axios');
//==================================================================================
// Note: AccuWeather is no longer free...
//==================================================================================

async function fetchGitHubData() {
  // const GITHUB_USERNAME = 'jeffersonrj14';

  try {
    //==================================================================================
    // const userDataResponse = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}`);
    // const userData = userDataResponse.data;
    //==================================================================================
    const greetings = ["Hi 👋", "Hey 👋", "Hello 👋"];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

    const greetingsText = `${randomGreeting}, My name is RJ Jefferson`;

    const myRole = ["Independent Student"];
    const location = ["Indonesia (GMT+7)"];

    //==================================================================================
    // Contact
    const contact = [
      {
        title: 'You can contact me',
        discord: 'through DM on [Discord](https://discordapp.com/users/UserID)',
        email: '[Email](https://www.jeffersonrj.com/contact)'
      },
    ];
    //==================================================================================
    const company = null;
    let status = `learning independently using various resources.`;
    
    if (company !== null) {
      status = `working at ${company}`;
    }
    //==================================================================================
    
    const currentlyDoing = [
      `🌱 I'm currently ${status}`,
      `⚡ Fun fact: **I'm a night owl person**`,
      `🔈&nbsp; I speak Indonesian, English (Advanced) and Japanese (Advanced)`,
      `💻 Tools I mostly use: **[VS Code](https://code.visualstudio.com/)**, **[IntelliJ IDEA](https://www.jetbrains.com/idea/)**, **[Premiere Pro](https://www.adobe.com/jp/products/premiere.html)**`,
      `📫 ${contact[0].title} via **${contact[0].email}** *(Phishing/Unrelated Email will be blocked)*`
    ];
    //       `🚀💻`,
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
        url: `https://discordapp.com/users/userID`,
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
    const today = new Date();
    const options = { weekday: 'long', timeZone: 'Asia/Jakarta' };
    const dayOfWeek = today.toLocaleDateString('en-US', options);

    const markdownContent = `

## ${greetingsText}
### ${myRole} from **${location}**

${currentlyDoing.map(item => `- ${item}`).join('\n')}

<div>
<div style="font-size: 16px">
Have a great ${dayOfWeek}!

</div>

<br>

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


// ${image}
// It's supposed to be ${weatherData.temperature}°C (${weatherData.temperatureF}°F) and ${weatherData.weatherEmoji} ${weatherData.weatherText} today. 
// <br>Have a great ${dayOfWeek}!

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
