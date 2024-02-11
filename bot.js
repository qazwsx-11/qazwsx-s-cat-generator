const Discord = require('discord.js');
const axios = require('axios');
const apiKey = 'live_a5vyFVPMQVmvBx4gOJZoSPT74q85N3SDOsiL9cmucqjXi1iSEJke0j68hzocftXM';
const botToken = 'MTIwNjE3MjkxNDQ3OTUzODE3Ng.GHNsOb.FJqILkYylAlM9jvR__SjgxYlzyDenluewo3-yA';
const targetUsername = '.qazwsx';

const client = new Discord.Client({
  intents: [Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.DirectMessages],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  setInterval(sendCatPicture, 5 * 60 * 1000); // Send a cat picture every 5 minutes
});

client.on('messageCreate', (message) => {
  if (message.author.username === targetUsername) {
    sendCatPicture();
  }
});

async function sendCatPicture() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search', {
      headers: {
        'x-api-key': apiKey,
      },
    });

    const catImageUrl = response.data[0].url;
    client.users.fetch(targetUsername).then((user) => {
      user.send(`Here's your cat picture: ${catImageUrl}`);
    });
  } catch (error) {
    console.error(`Error fetching cat image: ${error.message}`);
  }
}

client.login(botToken);