require('dotenv').config();
const readdirp = require('readdirp');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {

    // as soon as the bot is ready, read all files in /bot
    readdirp(`${__dirname}/bot`, { fileFilter: '*.js' })
        .on('data', (entry) => {
            let route = entry.path;
            let file = route.split('.js')[0];
            try {
                require(`./bot/${file}`)(client);
                console.log(`required ${file} @ discord`);
            } catch (error) {
                console.error(`error while including`, error);
            }
        })
        .on('warn', error => console.error(error))
        .on('error', error => console.error(error));

});

client.login(process.env.DISCORD_BOT_TOKEN);