const Discord = require('discord.js');

module.exports = (client) => {
    /**
     * Handler for Connect-Four Game
     */
    client.on('messageReactionAdd', (messageReaction) => {
        // gets all the games
        let games = global['connectFour_GAMES'];
        // finds the current game associated with the message id
        let result = games.find(element => element.message == messageReaction.message.id);
        if (!result) return;
        // checks if the user who reacted is the opponent
        let opponent = result.players.find(element => element.opponent == true);
        if (!opponent) return;
        let usersReacted = messageReaction.users;
        let opponentReacted = usersReacted.cache.find(value => value == opponent.id);
        // creates a channel for the game
        let channel = messageReaction.message.channel;
        let guild = channel.guild;
        guild.channels.create('4-gewinnt-8N4W', {
            type: 'text',
            topic: '4 Gewinnt',
            permissionOverwrites: [
                {

                }
            ]
        });
        console.log(result, opponent, opponentReacted);
    });
};