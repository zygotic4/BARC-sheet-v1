const gsSearch = require("../sheets/gsSearch");
const gsGet = require("../sheets/gsGet");
const gsUpdate = require("../sheets/gsUpdate");

module.exports = async (client, gsapi, ssid, user, points, col1, col2) => {
  let index = await gsSearch(gsapi, ssid, user, 'A');
  if (!index) return false
  let p = await gsGet(gsapi, ssid, 'Sheet1!' + col1 + index + ':' + col2 + index);
  if (!p) return false
  let week = parseInt(p[0][0]);
  let total = parseInt(p[0][1]);
  points = parseInt(points);
  week += points;
  total += points;
  if (total < 0) {
    total = 0;
  };
  if (week < 0) {
    week = 0;
  };
  return await gsUpdate(gsapi, ssid, 'Sheet1!' + col1 + index + ':' + col2 + index, [[week.toString(), total.toString()]]);
};