const discord = require('discord.js');
const client = new discord.Client();
const config = require('./config.json')


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
  
client.on('message', message => {
    if (message.author.bot) return;
    if(message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.split(' ').slice(1);
    const command = args.shift().toLowerCase();

    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
        console.error(err);
    }
});
  
  client.login(config.token);