const gsQuery = require('../../sheets/gsQuery');
const { EmbedBuilder } = require("discord.js");
const util = require('util');

module.exports = {
  name: 'topepoints',
  description: 'Display ranking for most EP',
  aliases: ['topep'],
  callback: async (client, message, gsapi, ssid) => {
    const embed = new EmbedBuilder();
    const rankingDataWeekly = await gsQuery(gsapi, ssid, `select A, E order by E desc limit 10`, '', true)
    const rankingDataTotal = await gsQuery(gsapi, ssid, `select A, F order by F desc limit 10`, '', true)
    const rankingWeekly = rankingDataWeekly.table.rows.map((user, id) => `${id+1}. ${user.c[0].v}\n  ${user.c[1].v}`).join('\n')
    const rankingTotal = rankingDataTotal.table.rows.map((user, id) => `${id+1}. ${user.c[0].v}\n  ${user.c[1].v}`).join('\n')
    embed
      .setColor('NotQuiteBlack')
      .setTitle('EP Leaderboard')
      .addFields(
        { name: '**Top Weekly EP**', value: rankingWeekly, inline: true},
        { name: '**Top Total EP**', value: rankingTotal, inline: true},
      )
      .setFooter({text: `${module.exports.name} | BARC Bot`});
    return message.reply({embeds: [embed]});
  }
}