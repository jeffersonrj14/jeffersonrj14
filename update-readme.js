const https = require('https');
const fs = require('fs');

const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;

// Fetch WakaTime stats
function fetchWakaTimeStats() {
  return new Promise((resolve, reject) => {
    if (!WAKATIME_API_KEY) {
      console.log('⚠️  WakaTime API key not set, skipping stats...');
      resolve(null);
      return;
    }

    const encodedKey = Buffer.from(WAKATIME_API_KEY).toString('base64');
    
    const options = {
      hostname: 'wakatime.com',
      path: '/api/v1/users/current/stats/last_7_days',
      method: 'GET',
      headers: {
        'Authorization': `Basic ${encodedKey}`
      }
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          console.log('⚠️  Could not fetch WakaTime stats');
          resolve(null);
        }
      });
    }).on('error', (err) => {
      console.log('⚠️  WakaTime API error:', err.message);
      resolve(null);
    });
  });
}

async function fetchGitHubData() {
  try {
    // Fetch WakaTime stats
    const wakaStats = await fetchWakaTimeStats();
    
    //==================================================================================
    const greetings = ["Hi", "Hey", "Hello"];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

    const greetingsText = `${randomGreeting} there👋`;

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
    //==================================================================================
    const today = new Date();
    const options = { weekday: 'long', timeZone: 'Asia/Jakarta' };
    const dayOfWeek = today.toLocaleDateString('en-US', options);

    //==================================================================================
    let wakaTimeSection = '';
    if (wakaStats) {
      const totalTime = wakaStats.data.human_readable_total || '0 hrs 0 mins';
      const languages = wakaStats.data.languages || [];
      const topLanguages = languages
        .slice(0, 3)
        .map(lang => lang.name)
        .join(', ');
      
      wakaTimeSection = `

## 📊 This Week's Coding Stats

Coding Time: ${totalTime}  
Most Languages Used: ${topLanguages || 'No data'}
`;
    }

    const markdownContent = `
## ${greetingsText}
### ${myRole} from **${location}**

${currentlyDoing.map(item => `- ${item}`).join('\n')}

<div>
<div style="font-size: 16px">
Have a great ${dayOfWeek}!

</div>
${wakaTimeSection}
`;

    fs.writeFileSync('README.md', markdownContent);
    console.log('✅ README updated successfully');
  } catch (error) {
    console.error('❌ Error updating README:', error);
  }
}

fetchGitHubData();