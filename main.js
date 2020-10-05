const Discord = require('discord.js'); //Load discord.js
const client = new Discord.Client(); //Create the bot

const config = require('./config.json');
const command = require('./command.js');

client.once('ready', () => { //Tell the bot is online
    console.log('The client is ready!');

    command(client, 'ping', message => {
        message.channel.send('Pong!');
    })

    command(client, 'servers', message => {
        client.guilds.cache.forEach((guild) => {
            message.channel.send(`${guild.name} has a total of ${guild.memberCount} members!`)
        })
    })

    command(client, ['cc', 'clearchannel'], message => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
            })
        }
    })

    command(client, 'status', message => {
        const content = message.content.replace('!status ', '')

        client.user.setPresence({
            activity: {
                name: content,
                type: 0,
            },
        })
    })
})

client.login(config.token);
