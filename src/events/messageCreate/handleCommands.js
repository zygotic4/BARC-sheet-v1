const { devs, testServer } = require("../../../config.json");
const getLocalCommands = require("../../utils/getLocalCommands");
const { EmbedBuilder } = require("discord.js");

module.exports = async (client, message, gsapi, ssid) => {
  if (!message.content.startsWith("-")) return;

  const localCommands = getLocalCommands();
  let commandName = message.content.slice(1);
  const splitCmd = commandName.split(" ");
  commandName = splitCmd[0].toLowerCase();
  embed = new EmbedBuilder();
  try {
    let commandObject =
      localCommands.find((cmd) => cmd.name === commandName) ||
      localCommands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );
    if (!commandObject) {
      return;
    }
    if (commandObject.devOnly) {
      if (!devs.includes(message.author.id)) {
        embed.setColor("Red").setDescription("Cannot be used here.");

        return message.channel.send({ embeds: [embed] });
      }
    }
    if (commandObject.testOnly) {
      if (!(message.guild.id === testServer)) {
        embed.setColor("Red").setDescription("Cannot be used here.");

        return message.channel.send({ embeds: [embed] });
      }
    }
    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!message.author.permissions.has(permission)) {
          embed
            .setColor("Red")
            .setDescription("Insufficient permissions: User");

          return message.channel.send({ embeds: [embed] });
        }
      }
    }
    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = message.guild.members.me;
        if (!bot.permissions.has(permission)) {
          embed.setColor("Red").setDescription("Insufficient permissions: Bot");

          return message.channel.send({ embeds: [embed] });
        }
      }
    }
    await commandObject.callback(client, message, gsapi, ssid);
  } catch (error) {
    console.log(`handleCommands.js ${error}`);
  }
};
