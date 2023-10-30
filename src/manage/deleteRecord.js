const gsSearch = require("../sheets/gsSearch");
const gsGet = require("../sheets/gsGet");
const gsUpdate = require("../sheets/gsUpdate");
const gsQuery = require("../sheets/gsQuery");

module.exports = async (client, gsapi, ssid, user) => {
  try {
    let index = await gsSearch(gsapi, ssid, user, 'A');
    const response = await gsQuery(gsapi, ssid, "A != ", "''");
    let upper = response.table.rows.length + 2;
    let p = await gsGet(gsapi, ssid, 'Sheet1!A' + (index + 1) + ':R' + upper);

    return await gsUpdate(gsapi, ssid, 'Sheet1!A' + index, p);
  } catch (error) {
    console.log('deleterecord ' + error)
  }
};