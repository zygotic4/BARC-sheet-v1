const { EmbedBuilder } = require("discord.js");
const { officer } = require('../../../config.json');
const { quota_dusk, quota_sd, quota_storm, quota_trooper, quota_arc } = require('../../../config.json');
const gsQuery = require('../../sheets/gsQuery');

module.exports = {
  name: 'quotacheck',
  description: 'Display quota completion of a company (CM+)',
  aliases: ['qc'],
  callback: async (client, message, gsapi, ssid) => {
    const embed = new EmbedBuilder();
    const companies = ['dusk', 'sd', 'storm', 'trooper', 'arc']
    const company = message.content.split(" ").slice(1)
    if (company[0] != undefined) company[0] = company[0].toLowerCase()
    if (company.length > 1 || !companies.includes(company[0])) {
      embed 
        .setColor('Red')
        .setTitle('Error')
        .setDescription('Enter a valid company!')
        .setFooter({text: `${module.exports.name} | BARC Bot`});
      message.channel.send({embeds: [embed] });
    }
    if (!officer.includes(message.author.id)) {
      embed
        .setColor('NotQuiteBlack')
        .setTitle('Permissions Error')
        .setDescription('You do not have permission to use this command!')
        .setFooter({text: `${module.exports.name} | BARC Bot`})
      message.channel.send({embeds: [embed] })
    }
    try {
      switch(company[0]) {
        case 'dusk':
          let dusk = await gsQuery(gsapi, ssid, 'D =', 'dusk')
          console.log(dusk)
          let dusk_passed = await gsQuery(gsapi, ssid, `select * where D = 'dusk' and E >= '${parseInt(quota_dusk[0])}' and G >= '${parseInt(quota_dusk[0])}'`, null, true)
          console.log(dusk_passed)
          break
        case 'sd':
          let sd = await gsQuery(gsapi, ssid, 'D =', 'sd')
          let sd_passed = await gsQuery(gsapi, ssid, `select * where 'D' = sd and 'E' >= ${quota_sd[0]} and 'G' >= ${quota_sd[1]}`, null, true)
          break
        case 'storm':
          let storm = await gsQuery(gsapi, ssid, 'D =', 'storm')
          let storm_passed = await gsQuery(gsapi, ssid, `select * where 'D' = storm and 'E' >= ${quota_storm[0]} and 'G' >= ${quota_storm[1]}`, null, true)
          break
        case 'trooper':
          let trooper = await gsQuery(gsapi, ssid, 'D =', 'trooper')
          let trooper_passed = await gsQuery(gsapi, ssid, `select * where 'D' = trooper and 'E' >= ${quota_trooper[0]} and 'G' >= ${quota_trooper[1]}`, null, true)
          break
        case 'arc':
          let arc = await gsQuery(gsapi, ssid, 'D =', 'arc')
          let arc_passed = await gsQuery(gsapi, ssid, `select * where 'D' = arc and 'E' >= ${quota_arc[0]} and 'G' >= ${quota_arc[1]}`, null, true)
          break
      }
    } catch (error) {
      
    }
  }
}