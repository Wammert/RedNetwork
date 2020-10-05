const Discord = require('discord.js'); //Load discord.js

module.exports = {
    name: 'announce',
    description: 'This is a announcement command',
    execute(message, args){
        const embed = new Discord.MessageEmbed()
        .setTitle('RedNetwork Announcement')
        .addField('Player Name', message.author.username)
        .setColor(0xF72424)
        message.channel.send(embed);
    }
}