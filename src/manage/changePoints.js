const gsFind = require("../sheets/gsFind");
const gsGet = require("../sheets/gsGet");
const gsUpdate = require("../sheets/gsUpdate");

module.exports = async (client, gsapi, ssid, user, points, col1, col2) => {
  let index = await gsFind(client, gsapi, ssid, user, 'A');

  let p = await gsGet(gsapi, ssid, 'Sheet1!' + col1 + index + ':' + col2 + index);

  let week = parseInt(p[0][0]);
  let total = parseInt(p[0][1]);

  week += points;
  total += points;

  return await gsUpdate(gsapi, ssid, 'Sheet1!' + col1 + index + ':' + col2 + index, [week, total]);
};