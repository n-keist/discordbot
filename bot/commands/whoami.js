const Discord = require('discord.js');

module.exports = (client) => {
    /**
     * Just a simple ping-pong test
     */
    client.on('message', (message) => {
        if (!message.content.startsWith('!whoami')) return;
        let embed = new Discord.MessageEmbed({
            title: 'speedboi',
            color: 0xff33e,
            description: `Du bist ${message.author.username}#${message.author.discriminator}`,
        });
        message.channel.send(embed);
    });
};