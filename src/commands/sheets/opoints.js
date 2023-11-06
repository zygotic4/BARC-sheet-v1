const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: 'opoints',
  description: 'Display officer points of a user',
  aliases: ['op'],
  callback: async (client, message, gsapi, ssid) => {
    const embed = new EmbedBuilder();
    let user = await gsQuery(gsapi, ssid, 'B =', message.author.id);
    if (!user) return message.channel.send('user not found');
    console.log(util.inspect(user.table.rows[0].c[4].v, {showHidden: false, depth: null, colors: true}))
  }
}