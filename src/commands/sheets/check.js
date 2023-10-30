const gsQuery = require('../../sheets/gsQuery');
const gsGet = require('../../sheets/gsGet');
const { EmbedBuilder } = require("discord.js");
const util = require('util')

module.exports = {
  name: 'check',
  description: 'Display info on a user',
  aliases: [],
  callback: async (client, message, gsapi, ssid) => {
    const embed = new EmbedBuilder();
    // let index = await gsSearch(gsapi, ssid, 10, 'B');
    // console.log('index ' + index)
    // if (!index) return message.channel.send('user not found')
    let user = await gsQuery(gsapi, ssid, 'B =', message.author.id);

    console.log(util.inspect(user), {showHidden: false, depth: null, colors: true})
  }
}