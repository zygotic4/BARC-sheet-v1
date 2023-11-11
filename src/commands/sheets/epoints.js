const gsQuery = require('../../sheets/gsQuery');
const changePoints = require('../../manage/changePoints');
const { EmbedBuilder } = require("discord.js");
const util = require('util');
const { officer } = require('../../../config.json');

module.exports = {
  name: 'epoints',
  description: 'Display event points of a user',
  aliases: ['ep'],
  callback: async (client, message, gsapi, ssid) => {
    const embed = new EmbedBuilder();
    let args = message.content.slice(1).trim().split(' ');
	  args.map(arg => arg.toLowerCase()).shift();
    let user;
    let n = args.length;
    if (args.length >= 3) {
      if (args[2] != 'change') return
      if (!officer.includes(message.author.id)) {
        embed
          .setColor('NotQuiteBlack')
          .setTitle('Permissions Error')
          .setDescription('You do not have permission to use this command!')
          .setFooter({text: `${module.exports.name} | BARC Bot`})
          message.channel.send({embeds: [embed] })
      }
      if (typeof parseInt(args[3]) === 'number') return n = 5 
      embed 
        .setColor('Red')
        .setTitle('Error')
        .setDescription('Please specify a valid amount!')
        .setFooter({text: `${module.exports.name} | BARC Bot`});
      return message.channel.send({embeds: [embed] });
    }
    switch (n) {
      case 1:
        user = await gsQuery(gsapi, ssid, 'B =', "'" + message.author.id + "'");
        try {
          embed
            .setColor('NotQuiteBlack')
            .setTitle(`${user.table.rows[0].c[0].v}'s Event Points`)
            .addFields(
              { name: 'Player', value: user.table.rows[0].c[0].v, inline: true},
              { name: 'Weekly EP', value: user.table.rows[0].c[4].v.toString(), inline: true},
              { name: 'Total EP', value: user.table.rows[0].c[5].v.toString(), inline: true},
              { name: 'Current Rank', value: user.table.rows[0].c[3].v},
            )
            .setTimestamp()
          message.channel.send({embeds: [embed] })
        } catch (error) {
          console.log(error)
          embed 
            .setColor('Red')
            .setTitle('Error')
            .setDescription('Player could not be found!')
            .setFooter({text: `${module.exports.name} | BARC Bot`});
          message.channel.send({embeds: [embed] });
        }
        break
      case 2:
        user = await gsQuery(gsapi, ssid, 'A =', "'" + args[1] + "'");
        if (!user) {
          embed 
            .setColor('Red')
            .setTitle('Error')
            .setDescription('Player could not be found!')
            .setFooter({text: `${module.exports.name} | BARC Bot`});
          return message.channel.send({embeds: [embed] });
        }
        try {
          embed
            .setColor('NotQuiteBlack')
            .setTitle(`${user.table.rows[0].c[0].v}'s Event Points`)
            .addFields(
              { name: 'Player', value: user.table.rows[0].c[0].v, inline: true},
              { name: 'Weekly EP', value: user.table.rows[0].c[4].v.toString(), inline: true},
              { name: 'Total EP', value: user.table.rows[0].c[5].v.toString(), inline: true},
              { name: 'Current Rank', value: user.table.rows[0].c[3].v},
            )
            .setTimestamp()
          return message.channel.send({embeds: [embed] })
        } catch (error) {
          console.log(error)
          embed 
            .setColor('Red')
            .setTitle('Error')
            .setDescription('Player could not be found!')
            .setFooter({text: `${module.exports.name} | BARC Bot`});
          message.channel.send({embeds: [embed] });
        }
        break
      case 3:
      case 4: 
        embed 
            .setColor('Red')
            .setTitle('Error')
            .setDescription('Please specify a reason!')
            .setFooter({text: `${module.exports.name} | BARC Bot`});
          message.channel.send({embeds: [embed] });
      case 5:
        user = await gsQuery(gsapi, ssid, 'A =', "'" + message.content + "'");
        if (!user) {
          embed 
            .setColor('Red')
            .setTitle('Error')
            .setDescription('Player could not be found!')
            .setFooter({text: `${module.exports.name} | BARC Bot`});
          return message.channel.send({embeds: [embed] });
        }
        const split = args.slice(4);
        const reason = split.join(" ");
        const updatedPoints = await changePoints(client, gsapi, ssid, args[1], args[3], 'E', 'F')
        if (!updatedPoints) return message.channel.send('error')
        embed 
          .setColor('NotQuiteBlack')
          .setTitle('Success')
          .setDescription(`Successfully changed ${args[1]}'s EP by \`${args[3]}\` for reason: \`${reason}\``)
          .setFooter({text: `${module.exports.name} | BARC Bot`});
        message.channel.send({embeds: [embed] });
        break
    }
    return 
  }
}