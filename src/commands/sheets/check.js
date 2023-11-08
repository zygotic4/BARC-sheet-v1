const gsQuery = require('../../sheets/gsQuery');
const { EmbedBuilder } = require("discord.js");
const util = require('util')

module.exports = {
  name: 'check',
  description: 'Display info on a user',
  aliases: [],
  callback: async (client, message, gsapi, ssid) => {
    const embed = new EmbedBuilder();
    let args = message.content.slice(1).trim().split(' ');
	  args.map(arg => arg.toLowerCase()).shift();
    let user
    switch (args.length) {
      case 1:
        user = await gsQuery(gsapi, ssid, 'B =', message.author.id);
        if (!user) return message.channel.send('user not found');
        console.log(util.inspect(user.table.rows[0].c[0].v, {showHidden: false, depth: null, colors: true}))
        break
      case 2:
        user = await gsQuery(gsapi, ssid, 'A =', args[1]);
        if (!user) return message.channel.send('user not found');
        console.log(util.inspect(user.table.rows[0].c[0].v, {showHidden: false, depth: null, colors: true}))
        break
    }
  }
}