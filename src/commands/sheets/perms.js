const { EmbedBuilder } = require("discord.js");
const { updateJSON } = require("../../utils/updateJSON");
const { hicom } = require('../../../config.json');

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
        const nicknameToFind = args[1]
        // Fetch all members of the guild
        await message.guild.members.fetch();
        // Find the user by nickname
        const targetMember = message.guild.members.cache.find(member => member.nickname == nicknameToFind);
        // Check if the member was found
        if (!targetMember) {
          embed 
            .setColor('Red')
            .setTitle('Error')
            .setDescription('Player could not be found!')
            .setFooter({text: `${module.exports.name} | BARC Bot`});
          return message.channel.send({embeds: [embed] });
        }
        let element = targetMember
        let action = args[2]
        let key = args[3]
        break  
    }
    //updateJSON('config.json', key, action, element)
  }
}