const { EmbedBuilder } = require("discord.js");
const { officer, quota_dusk, quota_sd, quota_storm, quota_trooper, quota_arc } = require('../../../config.json');
const gsQuery = require('../../sheets/gsQuery');

module.exports = {
  name: 'quotacheck',
  description: 'Display quota completion of a company (CM+)',
  aliases: ['qc'],
  callback: async (client, message, gsapi, ssid) => {
    const embed = new EmbedBuilder();
    const companies = ['dusk', 'sd', 'storm', 'trooper', 'arc'];
    const company = message.content.split(" ").slice(1)[0]?.toLowerCase();
    if (!company || !companies.includes(company)) {
      embed
        .setColor('Red')
        .setTitle('Error')
        .setDescription('Enter a valid company!')
        .setFooter({ text: `${module.exports.name} | BARC Bot` });
      return message.channel.send({ embeds: [embed] });
    }
    if (!officer.includes(message.author.id)) {
      embed
        .setColor('NotQuiteBlack')
        .setTitle('Permissions Error')
        .setDescription('You do not have permission to use this command!')
        .setFooter({ text: `${module.exports.name} | BARC Bot` });
      return message.channel.send({ embeds: [embed] });
    }
    try {
      const result = await processCompany(company, gsapi, ssid);
      message.channel.send({ embeds: [result] });
    } catch (error) {
      console.error('qc: ' + error);
    }
  },
};

const processCompany = async (company, gsapi, ssid) => {
  const embed = new EmbedBuilder();
  const quota = { dusk: quota_dusk, sd: quota_sd, storm: quota_storm, trooper: quota_trooper, arc: quota_arc };
  try {
    const companyData = await gsQuery(gsapi, ssid, 'D = ', `'${company}'`);
    const passedData = await gsQuery(gsapi, ssid, `select * where D = '${company}' and E >= ${quota[company][0]} and G >= ${quota[company][1]}`, '', true);
    const failedUsers = companyData.table.rows.filter((o1) => !passedData.table.rows.some((o2) => o1.c[0].v === o2.c[0].v)).map((user) => user.c[0].v);
    const passedUsers = passedData.table.rows.map((user) => user.c[0].v);
    const passed = passedUsers.length > 0 ? passedUsers.join(" ") : 'N/A';
    const failed = failedUsers.length > 0 ? failedUsers.join(" ") : 'N/A';
    embed
      .setColor('NotQuiteBlack')
      .setTitle(`${company.charAt(0).toUpperCase() + company.slice(1)} Quota Check`)
      .addFields(
        { name: 'Passed', value: `\`${passed}\`` },
        { name: 'Failed', value: `\`${failed}\`` },
      )
      .setTimestamp();
    return embed;
  } catch (error) {
    console.error('processCompany: ' + error);
    throw error;
  }
}