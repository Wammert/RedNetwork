const Discord = require('discord.js'); //Load discord.js

const client = new Discord.Client(); //Create the bot

const prefix = '!'; //Prefix the bot is listening to

const config = require('./config.json');

const fs = require('fs'); //Require fs

client.commands = new Discord.Collection(); //Create discord collection

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => { //Tell the bot is online
    console.log('The client is ready!');
})

client.on('message', message =>{//When a message is send
    if(!message.content.startsWith(prefix) || message.author.bot) return; //Check if message is with prefix or message is from the bot

    const args = message.content.slice(prefix.length).split(/ +/); //Make it possible to do multiple commands (So with a space)
    const command = args.shift().toLowerCase(); //Make the command lowercase

    if (command === 'ping'){ //Ping command
        client.commands.get('ping').execute(message, args);
    } else if (command === 'announce'){ //Announce command
        client.commands.get('announce').execute(message, args);
    }
});

client.login(config.token);
