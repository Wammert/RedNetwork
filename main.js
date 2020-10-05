const Discord = require('discord.js'); //Load discord.js
const client = new Discord.Client(); //Create the bot

const config = require('./config.json');
const command = require('./command.js');

client.once('ready', () => { //Tell the bot is online
    console.log('The client is ready!');

    command(client, 'ping', message => {
        message.channel.send('Pong!');
    })
})

client.login(config.token);
