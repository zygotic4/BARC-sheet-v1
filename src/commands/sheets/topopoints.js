const gsQuery = require('../../sheets/gsQuery');
const { EmbedBuilder } = require("discord.js");
const util = require('util');

module.exports = {
  name: 'topopoints',
  description: 'Display ranking for most OP',
  aliases: ['topop'],
  callback: async (client, message, gsapi, ssid) => {
    const embed = new EmbedBuilder();
    const rankingDataWeekly = await gsQuery(gsapi, ssid, `select A, I order by I desc limit 10`, '', true)
    const rankingDataTotal = await gsQuery(gsapi, ssid, `select A, J order by J desc limit 10`, '', true)
    const rankingWeekly = rankingDataWeekly.table.rows.map((user, id) => `${id+1}. ${user.c[0].v}\n  ${user.c[1].v}`).join('\n')
    const rankingTotal = rankingDataTotal.table.rows.map((user, id) => `${id+1}. ${user.c[0].v}\n  ${user.c[1].v}`).join('\n')
    embed
      .setColor('NotQuiteBlack')
      .setTitle('OP Leaderboard')
      .addFields(
        { name: '**Top Weekly OP**', value: rankingWeekly, inline: true},
        { name: '**Top Total OP**', value: rankingTotal, inline: true},
      )
      .setFooter({text: `${module.exports.name} | BARC Bot`});
    return message.reply({embeds: [embed]});
  }
}