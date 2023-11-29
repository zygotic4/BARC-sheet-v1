const gsQuery = require('../../sheets/gsQuery');
const { EmbedBuilder } = require("discord.js");
const util = require('util');

module.exports = {
  name: 'topcepoints',
  description: 'Display ranking for most CEP',
  aliases: ['topcep'],
  callback: async (client, message, gsapi, ssid) => {
    const embed = new EmbedBuilder();
    const rankingDataWeekly = await gsQuery(gsapi, ssid, `select A, G order by G desc limit 10`, '', true)
    const rankingDataTotal = await gsQuery(gsapi, ssid, `select A, H order by H desc limit 10`, '', true)
    const rankingWeekly = rankingDataWeekly.table.rows.map((user, id) => `${id+1}. ${user.c[0].v}\n  ${user.c[1].v}`).join('\n')
    const rankingTotal = rankingDataTotal.table.rows.map((user, id) => `${id+1}. ${user.c[0].v}\n  ${user.c[1].v}`).join('\n')
    embed
      .setColor('NotQuiteBlack')
      .setTitle('CEP Leaderboard')
      .addFields(
        { name: '**Top Weekly CEP**', value: rankingWeekly, inline: true},
        { name: '**Top Total CEP**', value: rankingTotal, inline: true},
      )
      .setFooter({text: `${module.exports.name} | BARC Bot`});
    return message.reply({embeds: [embed]});
  }
}