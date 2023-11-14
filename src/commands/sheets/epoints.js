const gsQuery = require('../../sheets/gsQuery');
const changePoints = require('../../manage/changePoints');
const { EmbedBuilder } = require("discord.js");
const { officer } = require('../../../config.json');

module.exports = { // i want to add an officer rank checker by checking discord role ids against a user 
  name: 'epoints',
  description: 'Display event points of a user',
  aliases: ['ep'],
  callback: async (client, message, gsapi, ssid) => {
    const embed = new EmbedBuilder();
    let args = message.content.slice(1).trim().split(' ');
	  args.map(arg => arg.toLowerCase()).shift();
    let n;
    args.length >= 5 ? n = 5 : n = args.length
    if (args.length >= 3) {
      if (args[2] != 'change') {
        embed
          .setColor('NotQuiteBlack')
          .setTitle('Error')
          .setDescription('Invalid command!')
          .setFooter({text: `${module.exports.name} | BARC Bot`})
        message.channel.send({embeds: [embed] })
      }
      if (!officer.includes(message.author.id)) {
        embed
          .setColor('NotQuiteBlack')
          .setTitle('Permissions Error')
          .setDescription('You do not have permission to use this command!')
          .setFooter({text: `${module.exports.name} | BARC Bot`})
        message.channel.send({embeds: [embed] })
      }
    }
    switch (n) {
      case 1:
        try {
          let user = await gsQuery(gsapi, ssid, 'B =', "'" + message.author.id + "'");
          if (!user) { 
            embed 
              .setColor('Red')
              .setTitle('Error')
              .setDescription('Player could not be found!')
              .setFooter({text: `${module.exports.name} | BARC Bot`});
            return message.channel.send({embeds: [embed] });
          }
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
          console.log('ep 1: ' + error)
        }
        break
      case 2:
        try {
          let user = await gsQuery(gsapi, ssid, 'A =', "'" + args[1] + "'");
          if (!user) { 
            embed 
              .setColor('Red')
              .setTitle('Error')
              .setDescription('Player could not be found!')
              .setFooter({text: `${module.exports.name} | BARC Bot`});
            return message.channel.send({embeds: [embed] });
          }
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
          console.log('ep 2: ' + error)
        }
        break
      case 3:
        embed 
          .setColor('Red')
          .setTitle('Error')
          .setDescription('Please specify a valid amount!')
          .setFooter({text: `${module.exports.name} | BARC Bot`});
        message.channel.send({embeds: [embed] });
        break
      case 4: 
        embed 
          .setColor('Red')
          .setTitle('Error')
          .setDescription('Please specify a reason!')
          .setFooter({text: `${module.exports.name} | BARC Bot`});
        message.channel.send({embeds: [embed] });
        break
      case 5:
        try {
          let user = await gsQuery(gsapi, ssid, 'A =', "'" + message.content + "'");
          if (!user) { 
            embed 
              .setColor('Red')
              .setTitle('Error')
              .setDescription('Player could not be found!')
              .setFooter({text: `${module.exports.name} | BARC Bot`});
            return message.channel.send({embeds: [embed] });
          }
          if (isNaN(args[3]) && isNaN(parseFloat(args[3]))) {
            embed 
            .setColor('Red')
            .setTitle('Error')
            .setDescription('Please specify a valid amount!')
            .setFooter({text: `${module.exports.name} | BARC Bot`});
            return message.channel.send({embeds: [embed] });
          }
          const split = args.slice(4);
          const reason = split.join(" ");
          const updatedPoints = await changePoints(client, gsapi, ssid, args[1], args[3], 'E', 'F');
          if (!updatedPoints) {
            embed 
            .setColor('Red')
            .setTitle('Error')
            .setDescription('Command failed to execute!')
            .setFooter({text: `${module.exports.name} | BARC Bot`});
            return message.channel.send({embeds: [embed] });
          }
          embed 
            .setColor('NotQuiteBlack')
            .setTitle('Success')
            .setDescription(`Successfully changed ${args[1]}'s EP by \`${args[3]}\` for reason: \`${reason}\``)
            .setFooter({text: `${module.exports.name} | BARC Bot`});
          return message.channel.send({embeds: [embed] });
        } catch (error) {
          console.log('ep change: ' + error);
        };
        break
    }
    return;
  }
};