const gsQuery = require('../../sheets/gsQuery');
const { EmbedBuilder } = require("discord.js");
const util = require('util');

module.exports = {
  name: 'epoints',
  description: 'Display event points of a user',
  aliases: ['ep'],
  callback: async (client, message, gsapi, ssid) => {
    const embed = new EmbedBuilder();
    let args = message.content.slice(1).trim().split(' ');
	  args.map(arg => arg.toLowerCase()).shift();
    console.log(args)
    switch (args.length) {
      case 0:
        break
      case 1:
        break
      case 2:
        break
    }
    let user = await gsQuery(gsapi, ssid, 'B =', message.author.id);
    if (!user) return message.channel.send('user not found');
    console.log(util.inspect(user.table.rows[0].c[4].v, {showHidden: false, depth: null, colors: true}))
  }
}