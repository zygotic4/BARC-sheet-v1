const gsQuery = require("../sheets/gsQuery");
const gsUpdate = require("../sheets/gsUpdate");

module.exports = async (client, gsapi, ssid, user, robloxid, discordid) => {
  const response = await gsQuery(gsapi, ssid, 'A !=', "''");
  let next = response.table.rows.length + 3;
  return await gsUpdate(gsapi, ssid, 'Trooper!A' + next, [[user, robloxid, discordid]]);
};