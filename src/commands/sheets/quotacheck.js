const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: 'quotacheck',
  description: 'Display quota completion of a company (CM+)',
  aliases: ['qc'],
  callback: async (client, message, gsapi, ssid) => {
    const embed = new EmbedBuilder();
    const company = message.content.split(" ").slice(1)
  }
}