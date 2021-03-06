// const Discord = require("discord.js"); //Load discord.js
// const client = new Discord.Client(); //Create the bot

const { MongoClient } = require("mongodb");
const MongoDBProvider = require("commando-provider-mongo");
const path = require("path");
const Commando = require("discord.js-commando");

const config = require("./config.json");
const token = require("./token.json");
const command = require("./command.js");
const firstMessage = require("./first-message.js");
const privateMessage = require("./private-message.js");

const client = new Commando.CommandoClient({
  owner: "399679037695328258",
  commandPrefix: config.prefix,
});

client.once("ready", () => {
  //When the bot is online
  console.log("The client is ready!");

  // command(client, "ping", (message) => {
  //   message.channel.send("Pong!");
  // });

  client.registry
    .registerGroups([
      ["misc", "misc commands"],
      ["moderation", "moderation commands"],
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, "cmds"));

  // command(client, "servers", (message) => {
  //   client.guilds.cache.forEach((guild) => {
  //     message.channel.send(
  //       `${guild.name} has a total of ${guild.memberCount} members!`
  //     );
  //   });
  // });

  // command(client, ["cc", "clearchannel"], (message) => {
  //   if (message.member.hasPermission("ADMINISTRATOR")) {
  //     message.channel.messages.fetch().then((results) => {
  //       message.channel.bulkDelete(results);
  //     });
  //   }
  // });

  // command(client, "status", (message) => {
  //   const content = message.content.replace("!status ", "");

  //   client.user.setPresence({
  //     activity: {
  //       name: content,
  //       type: 0,
  //     },
  //   });
  // });

  // command(client, "embed", (message) => {
  //   const embed = new Discord.MessageEmbed()
  //     .setTitle("Hoertje Gerben")
  //     .addFields({
  //       name: "Gerben:",
  //       value: "Geruchten gaan dat gerben ff zijn gore hoere bek moet houden",
  //     })
  //     .setFooter("Copyright voor Wimmmm");

  //   message.channel.send(embed);
  // });

  // command(client, "serverinfo", (message) => {
  //   const { guild } = message;

  //   const { name, regions, memberCount, owner, afkTimeout } = guild;
  //   const icon = guild.iconURL();

  //   const embed = new Discord.MessageEmbed()
  //     .setTitle(`Server info for "${name}"`)
  //     .setThumbnail(icon)
  //     .addFields(
  //       {
  //         name: "Region",
  //         value: regions,
  //       },
  //       {
  //         name: "Members",
  //         value: memberCount,
  //       },
  //       {
  //         name: "Owner",
  //         value: owner.user.tag,
  //       },
  //       {
  //         name: "AFK Timeout",
  //         value: afkTimeout / 60,
  //       }
  //     );
  //   message.channel.send(embed);
  // });

  // firstMessage(client, '762610140184313896', 'hello world!!!', ['🔥', '❤️'])

  // privateMessage(client, "ping", "pong");
});

client.login(token.token);
