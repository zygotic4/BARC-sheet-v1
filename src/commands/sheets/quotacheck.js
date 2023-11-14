const { EmbedBuilder } = require("discord.js");
const { officer } = require('../../../config.json');
const { quota_dusk, quota_sd, quota_storm, quota_trooper, quota_arc } = require('../../../config.json');
const gsQuery = require('../../sheets/gsQuery');
const util = require('util')//, {showHidden: false, depth: null, colors: true}

module.exports = { // I WANT TO SHORTEN THE SWITCHCASE TO THE FIRST 2 LINES THEN RUN SOME KIND OF FUNCTION THAT DOES WHAT'S REPEATED 5 TIMES
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
          try {
            const dusk = await gsQuery(gsapi, ssid, 'D =', "'dusk'")
            const dusk_passed = await gsQuery(gsapi, ssid, `select * where D = 'dusk' and E >= ${quota_dusk[0]} and G >= ${quota_dusk[1]}`, '', true)
            //const dusk_excused = await gsQuery(gsapi, ssid, `select * where D = 'dusk' and //whatever column is in//`, '', true)
            const dusk_failed = dusk.table.rows.filter(o1 => !dusk_passed.table.rows.some(o2 => o1.c[0].v === o2.c[0].v));
            let passedusers = []
            let excusedusers = []
            let failedusers = []
            for (i = 0; i < dusk_passed.table.rows.length; i++) {
              passedusers.push(dusk_passed.table.rows[i].c[0].v)
            }
            // for (i = 0; i < dusk_excused.table.rows.length; i++) {
            //   excusedusers.push(dusk_excused.table.rows[i].c[0].v)
            // }
            for (i = 0; i < dusk_failed.length; i++) {
              failedusers.push(dusk_failed[i].c[0].v)
            }
            passedusers.length > 0 ? passedusers = passedusers.join(" ") : passedusers = 'N/A'
            excusedusers.length > 0 ? excusedusers = excusedusers.join(" ") : excusedusers = 'N/A'
            failedusers.length > 0 ? failedusers = failedusers.join(" ") : failedusers = 'N/A'
            embed
              .setColor('NotQuiteBlack')
              .setTitle(`Dusk Quota Check`)
              .addFields(
                { name: 'Passed', value: `\`${passedusers}\``},
                { name: 'Excused', value: `\`${excusedusers}\``},
                { name: 'Failed', value: `\`${failedusers}\``},
              )
              .setTimestamp()
            message.channel.send({embeds: [embed] })
          } catch (error) {
            console.log('qc: ' + error)
          }
          break
        case 'sd':
          try {
            let sd = await gsQuery(gsapi, ssid, 'D =', "'sd'")
            let sd_passed = await gsQuery(gsapi, ssid, `select * where D = 'sd' and E >= ${quota_sd[0]} and G >= ${quota_sd[1]}`, '', true)
            //const sd_excused = await gsQuery(gsapi, ssid, `select * where D = 'sd' and //whatever column is in//`, '', true)
            const sd_failed = sd.table.rows.filter(o1 => !sd_passed.table.rows.some(o2 => o1.c[0].v === o2.c[0].v));
            let passedusers = []
            let excusedusers = []
            let failedusers = []
            for (i = 0; i < sd_passed.table.rows.length; i++) {
              passedusers.push(sd_passed.table.rows[i].c[0].v)
            }
            // for (i = 0; i < sd_excused.table.rows.length; i++) {
            //   excusedusers.push(sd_excused.table.rows[i].c[0].v)
            // }
            for (i = 0; i < sd_failed.length; i++) {
              failedusers.push(sd_failed[i].c[0].v)
            }
            passedusers.length > 0 ? passedusers = passedusers.join(" ") : passedusers = 'N/A'
            excusedusers.length > 0 ? excusedusers = excusedusers.join(" ") : excusedusers = 'N/A'
            failedusers.length > 0 ? failedusers = failedusers.join(" ") : failedusers = 'N/A'
            embed
              .setColor('NotQuiteBlack')
              .setTitle(`Speed Demon Quota Check`)
              .addFields(
                { name: 'Passed', value: `\`${passedusers}\``},
                { name: 'Excused', value: `\`${excusedusers}\``},
                { name: 'Failed', value: `\`${failedusers}\``},
              )
              .setTimestamp()
            message.channel.send({embeds: [embed] })
          } catch (error) {
            console.log('qc: ' + error)
          }
          break
        case 'storm':
          try {
            let storm = await gsQuery(gsapi, ssid, 'D =', "'storm'")
            let storm_passed = await gsQuery(gsapi, ssid, `select * where D = 'storm' and E >= ${quota_storm[0]} and G >= ${quota_storm[1]}`, '', true)
            //const storm_excused = await gsQuery(gsapi, ssid, `select * where D = 'storm' and //whatever column is in//`, '', true)
            const storm_failed = storm.table.rows.filter(o1 => !storm_passed.table.rows.some(o2 => o1.c[0].v === o2.c[0].v));
            let passedusers = []
            let excusedusers = []
            let failedusers = []
            for (i = 0; i < storm_passed.table.rows.length; i++) {
              passedusers.push(storm_passed.table.rows[i].c[0].v)
            }
            // for (i = 0; i < storm_excused.table.rows.length; i++) {
            //   excusedusers.push(storm_excused.table.rows[i].c[0].v)
            // }
            for (i = 0; i < storm_failed.length; i++) {
              failedusers.push(storm_failed[i].c[0].v)
            }
            passedusers.length > 0 ? passedusers = passedusers.join(" ") : passedusers = 'N/A'
            excusedusers.length > 0 ? excusedusers = excusedusers.join(" ") : excusedusers = 'N/A'
            failedusers.length > 0 ? failedusers = failedusers.join(" ") : failedusers = 'N/A'
            embed
              .setColor('NotQuiteBlack')
              .setTitle(`Storm Quota Check`)
              .addFields(
                { name: 'Passed', value: `\`${passedusers}\``},
                { name: 'Excused', value: `\`${excusedusers}\``},
                { name: 'Failed', value: `\`${failedusers}\``},
              )
              .setTimestamp()
            message.channel.send({embeds: [embed] })
          } catch (error) {
            console.log('qc: ' + error)
          }
          break
        case 'trooper':
          let trooper = await gsQuery(gsapi, ssid, 'D =', "'trooper'")
          let trooper_passed = await gsQuery(gsapi, ssid, `select * where D = 'trooper' and E >= ${quota_trooper[0]} and G >= ${quota_trooper[1]}`, '', true)
          break
        case 'arc':
          let arc = await gsQuery(gsapi, ssid, 'D =', "'arc'")
          let arc_passed = await gsQuery(gsapi, ssid, `select * where D = 'arc' and E >= ${quota_arc[0]} and G >= ${quota_arc[1]}`, '', true)
          break
      }
    } catch (error) {
      
    }
  }
}