const { EmbedBuilder } = require("discord.js");
const fs = require('fs');
const updateJSON = require("../../utils/updateJSON");
const { devs, hicom, officer, staff_dusk, staff_sd, staff_storm } = require('../../../config.json');

module.exports = {
  name: 'perms',
  description: 'View or change permissions for a user',
  aliases: [],
  callback: async (client, message, gsapi, ssid) => {
    const embed = new EmbedBuilder();
    let args = message.content.slice(1).trim().split(' ');
	  args.map(arg => arg.toLowerCase()).shift();
    if (args.length >= 4) {
      if (args[2] != 'add' && args[2] != 'remove') {
        embed
          .setColor('NotQuiteBlack')
          .setTitle('Error')
          .setDescription('Invalid command!')
          .setFooter({text: `${module.exports.name} | BARC Bot`})
        return message.channel.send({embeds: [embed] })
      }
      if (!hicom.includes(message.author.id)) {
        embed
          .setColor('NotQuiteBlack')
          .setTitle('Permissions Error')
          .setDescription('You do not have permission to use this command!')
          .setFooter({text: `${module.exports.name} | BARC Bot`})
        return message.channel.send({embeds: [embed] })
      }
    }
    switch (args.length) {
      case 1:
        //show user perms
        break
      case 2:
        //show user perms
        break 
      case 3:
        embed 
          .setColor('Red')
          .setTitle('Error')
          .setDescription('Please specify a valid permission!')
          .setFooter({text: `${module.exports.name} | BARC Bot`});
        message.channel.send({embeds: [embed] });
        break
      case 4:
        const rawElement = args[1].substring(2, args[1].length - 1)
        console.log(rawElement)
        try {
          await message.guild.members.fetch(rawElement);
        } catch (error) {
          if (error.code === 50035) {
            embed 
              .setColor('Red')
              .setTitle('Error')
              .setDescription(`Could not find a member or role for "${args[1]}"! Make sure that you tag members.`)
              .setFooter({text: `${module.exports.name} | BARC Bot`});
            return message.channel.send({embeds: [embed] });
          } else {
            console.error(error);
            return false;
          }
        }
        const element = rawElement
        const action = args[2].toLowerCase()
        if (action !== 'add' && action !== 'remove') {
          embed 
            .setColor('Red')
            .setTitle('Error')
            .setDescription('Please specify a valid action!')
            .setFooter({text: `${module.exports.name} | BARC Bot`});
          return message.channel.send({embeds: [embed] });
        }
        const key = args[3].toLowerCase()
        try {
          const jsonData = JSON.parse(fs.readFileSync('config.json', 'utf8'));
          // Check if the objectName is a key in the JSON object
          if (!Object.keys(jsonData).includes(key)) {
            embed 
              .setColor('Red')
              .setTitle('Error')
              .setDescription('Please specify a valid permission!')
              .setFooter({text: `${module.exports.name} | BARC Bot`});
            return message.channel.send({embeds: [embed] });
          }
        } catch (error) {
          return console.error('Error reading or parsing JSON file: ', error);
        }
        updateJSON('config.json', element, action, key)
        break  
    }
    return;
  }
}