const gsQuery = require('../../sheets/gsQuery');
const changePoints = require('../../manage/changePoints');
const { EmbedBuilder } = require("discord.js");
const { officer, hicom } = require('../../../config.json');

module.exports = {
  name: 'opoints',
  description: 'Display officer points of a user',
  aliases: ['op'],
  callback: async (client, message, gsapi, ssid) => {
    const embed = new EmbedBuilder();
    const args = message.content.slice(1).trim().split(' ').map(word => word.toLowerCase().trim());
    let n = Math.min(args.length, 5);
    if (n >= 2 && args[2] !== 'change' ) return sendErrorEmbed(embed, 'Error', 'Invalid command!', message);
    if (n >= 3 && !hicom.includes(message.author.id) || !officer.includes(message.author.id)) return sendErrorEmbed(embed, 'Permissions Error', 'You do not have permission to use this command!', message);
    switch (n) {
      case 1:
      case 2:
        try {
          const queryKey = n === 1 ? 'B =' : 'A =';
          const user = await getUserData(args[1] || message.author.id, gsapi, ssid, queryKey);
          if (!user) return sendErrorEmbed(embed, 'Error', 'Player could not be found!', message);
          return sendUserEmbed(embed, user, message);
        } catch (error) {
          console.log(`op ${n}: ${error}`);
        }
        break;
      case 3:
        return sendErrorEmbed(embed, 'Error', 'Please specify a valid amount!', message);
      case 4:
        return sendErrorEmbed(embed, 'Error', 'Please specify a reason!', message);
      case 5:
        try {
          const user = await getUserData(args[1], gsapi, ssid, 'A =');
          if (!user) return sendErrorEmbed(embed, 'Error', 'Player could not be found!', message);
          if (isNaN(args[3]) && isNaN(parseFloat(args[3]))) {
            return sendErrorEmbed(embed, 'Error', 'Please specify a valid amount!', message);
          }
          const reason = args.slice(4).join(" ");
          const updatedPoints = await changePoints(client, gsapi, ssid, args[1], args[3], 'I', 'J');
          if (!updatedPoints) {
            return sendErrorEmbed(embed, 'Error', 'Command failed to execute!', message);
          }
          return sendSuccessEmbed(embed, `Successfully changed ${args[1]}'s OP by \`${args[3]}\` for reason: \`${reason}\``, message);
        } catch (error) {
          console.log(`op change: ${error}`);
        }
        break;
    }
  },
};

const getUserData = async (userId, gsapi, ssid, queryKey) => {
  try {
    const user = await gsQuery(gsapi, ssid, `${queryKey}`, `'${userId}'`);
    return user && user.table.rows[0];
  } catch (error) {
    console.error(`getUserData: ${error}`);
  }
}

const sendUserEmbed = async (embed, user, message) => {
  embed
    .setColor('NotQuiteBlack')
    .setTitle(`${user.c[0].v}'s Event Points`)
    .addFields(
      { name: 'Player', value: user.c[0].v, inline: true },
      { name: 'Weekly OP', value: user.c[4].v.toString(), inline: true },
      { name: 'Total OP', value: user.c[5].v.toString(), inline: true },
      { name: 'Current Rank', value: user.c[3].v },
    )
    .setTimestamp();
  message.channel.send({ embeds: [embed] });
}

const sendErrorEmbed = async (embed, title, description, message) => {
  embed
    .setColor('Red')
    .setTitle(title)
    .setDescription(description)
    .setFooter({ text: `${module.exports.name} | BARC Bot` });
  message.channel.send({ embeds: [embed] });
}

const sendSuccessEmbed = async (embed, description, message) => {
  embed
    .setColor('NotQuiteBlack')
    .setTitle('Success')
    .setDescription(description)
    .setFooter({ text: `${module.exports.name} | BARC Bot` });
  message.channel.send({ embeds: [embed] });
}