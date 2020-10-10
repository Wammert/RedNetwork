const Commando = require("discord.js-commando");
const Embed = require('discord.js');

module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "add",
      group: "misc",
      memberName: "add",
      description: "Adds numbers together",
      argsType: "multiple",
    });
  }

  async run(message, args) {
    let sum = 0;

    for (const arg of args) {
      sum += parseInt(arg);
    }
    const embed = new Embed.MessageEmbed()
    .setTitle("RedNetwork Calculator")
    .addFields({
      name: "Answer",
      value: `The sum is ${sum}!`,
    })
    .setColor("#3be324")
    message.embed(embed)
    }
};
