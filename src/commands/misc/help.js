const { EmbedBuilder } = require("discord.js");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = {
  name: 'help',
  description: 'Lists all commands',
  aliases: ['h', 'cmds', 'commands'],
  callback: async (client, message) => {
    const embed = new EmbedBuilder();
    const localCommands = getLocalCommands();
    embed
      .setColor('NotQuiteBlack')
      .setTitle('Help')
      .setDescription(
        localCommands.map((cmd) => `**${cmd.name}** \n${cmd.description}\n`).join('')
      )
      .setFooter({text: `${module.exports.name} | BARC Bot`});
    return message.reply({embeds: [embed]});
  }
}