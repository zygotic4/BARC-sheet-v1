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
    let user
    if (args.length >= 3) {
      if (args[2] != 'change') return message.channel.send('invalid command');
      if (!officer.includes(message.author.id)) return message.channel.send('you do not have permission to run this command');
    }
    const split = args.slice(4);
    const reason = split.join(" ");
    switch (args.length) {
      case 1:
        user = await gsQuery(gsapi, ssid, 'B =', message.author.id);
        if (!user) return message.channel.send('user not found');
        console.log(util.inspect(user.table.rows[0].c[4].v, {showHidden: false, depth: null, colors: true}))
        break
      case 2:
        user = await gsQuery(gsapi, ssid, 'A =', message.content);
        if (!user) return message.channel.send('user not found');
        console.log(util.inspect(user.table.rows[0].c[4].v, {showHidden: false, depth: null, colors: true}))
        break
      case 3:
        message.channel.send('specify a valid amount')
        break
      case 4: 
        message.channel.send('specify a reason')
      case 5:
        const updatedPoints = await changePoints(client, gsapi, ssid, args[1], args[3], 'E', 'F')
        if (!updatedPoints) return message.channel.send('error')
        message.channel.send(`Changed ${args[1]}'s EP by ${args[3]} for reason ${reason}`)
        break
    }
    return 
  }
}