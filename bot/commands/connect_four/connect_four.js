const Discord = require('discord.js');

module.exports = (client) => {
    /**
     * Connect-Four Game
     * 1v1 Game
     * Creates Invites
     * Private Channel
     */
    client.on('message', async (message) => {
        if (!message.content.startsWith('!connectFour')) return;
        // Checks if there is an opponent
        if (message.mentions.users.size == 0) {
            let embed = new Discord.MessageEmbed({
                title: 'Oh oh..',
                description: 'Du kannst nicht gegen dich selbst spielen.',
                hexColor: '0xffff0',
            });
            message.channel.send(embed);
            return;
        }
        // Checks if there are more than one opponents
        if (message.mentions.users.size > 1) {
            let embed = new Discord.MessageEmbed({
                title: 'Oh oh..',
                description: 'Du kannst nicht gegen mehrere Gegner spielen',
                hexColor: '0xffff0',
            });
            message.channel.send(embed);
            return;
        }
        // Get the opponent ID
        const mentionsIterator = message.mentions.users.entries();
        const opponent = mentionsIterator.next().value[0];

        let embed = new Discord.MessageEmbed({
            title: 'Aufforderung - 4 Gewinnt',
            description: `<@${opponent}> du wurdest von <@${message.author.id}> zu einem Spiel 4-Gewinnt aufgefordert!`,
        });

        const sentMessage = await message.channel.send(embed);
        sentMessage.react('✅');
        // Create Game in Global save (needs other saving technique)
        global['connectFour_GAMES'] = [];
        // games are related by the message id
        global['connectFour_GAMES'].push({
            message: sentMessage.id,
            players: [
                {
                    id: opponent,
                    opponent: true,
                },
                {
                    id: message.author.id,
                    opponent: false,
                },
            ],
        });
    });
};