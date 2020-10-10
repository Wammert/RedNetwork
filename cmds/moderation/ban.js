const Commando = require("discord.js-commando");
const Embed = require('discord.js');

module.exports = class BanCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "ban",
      group: "moderation",
      memberName: "ban",
      description: "Bans a member from the discord server",
      clientPermissions: ["BAN_MEMBERS"],
      userPermissions: ["BAN_MEMBERS"],
    });
  }

  async run(message) {
    const target = message.mentions.users.first();
    const args = message.content.slice('4') .split(/ +/);

    if (!target) {
      const specifyEmbed = new Embed.MessageEmbed()
      .addFields({
        name: "Error",
        value: "Please specify someone to ban",
      })
      .setColor("#ed1109")
      message.embed(specifyEmbed)
      return;
    }

    if (!args[2]) {
        const reasonEmbed = new Embed.MessageEmbed()
        .addFields({
          name: "Error",
          value: "Please give us a reason to ban the user",
        })
        .setColor("#ed1109")
        message.embed(reasonEmbed)
        return;
      }

    const { guild } = message;
    let reason = args.slice(2).join(" ");

    const member = guild.members.cache.get(target.id);
    if (member.kickable) {
      // You sure embed
      const embedPrompt = new Embed.MessageEmbed()
      .addFields({
        name: "Are you sure?",
        value: `Are you sure you want to ban ${target.username}?`,
      })
      .setColor("ORANGE")

      // Banned embed
      const bannedEmbed = new Embed.MessageEmbed()
      .setTitle("User banned")
      .addFields(
        {
            name: "User",
            value: target.username,
        },
        {
            name: "By",
            value: message.author,
        },
        {
            name: "Reason",
            value: reason,
        }
        )
      .setColor("GREEN")

      message.embed(embedPrompt).then(async msg =>{
          let emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"])

          if (emoji === "✅") {
              msg.delete();
              message.embed(bannedEmbed)
              member.ban({reason}).catch(err => {
                if (err) {
                  return message.reply("Something went wrong");
                }
              })
          } else if (emoji === "❌") {
            msg.delete()

            // Banned embed
            const embed = new Embed.MessageEmbed()
            .addFields(
                {
                    name: "Canceled",
                    value: `Banning ${target.username} has been canceled`,
                }
                )
            .setColor("GREEN")
            message.embed(embed).then(m => m.delete(5000));
          }
      })

    } else {
      const embed = new Embed.MessageEmbed()
      .addFields({
        name: "No Permissions",
        value: "I cannot ban that user!",
      })
      .setColor("#ed1109")
      message.embed(embed)
    }

    async function promptMessage(msg, author, time, reactions) {
      time *=1000;
      
      for(const reaction of reactions){
          await msg.react(reaction);
      }
  
      const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id
  
      return msg.awaitReactions(filter, {max: 1, time: time}).then(collected => collected.first() && collected.first().emoji.name);
    }
  }
};
