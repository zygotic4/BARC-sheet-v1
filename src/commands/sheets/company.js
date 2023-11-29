const gsQuery = require('../../sheets/gsQuery');
const { EmbedBuilder } = require("discord.js");
const util = require('util');

module.exports = { //THIS WILL BE THE ADD COMMAND
  name: 'company',
  description: 'Display company of a user',
  aliases: [],
  callback: async (client, message, gsapi, ssid) => {
    const embed = new EmbedBuilder();
    let user = await gsQuery(gsapi, ssid, 'B =', "'" + message.author.id + "'");
    if (!user) return message.channel.send('user not found');
    console.log(util.inspect(user.table.rows[0].c[3].v, {showHidden: false, depth: null, colors: true}))
  }
}