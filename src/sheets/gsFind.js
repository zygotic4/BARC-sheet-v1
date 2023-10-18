const gsQuery = require("./gsQuery");
const gsGet = require("./gsGet");

module.exports = async (client, gsapi, ssid, target, col) => {
  try {
    const response = await gsQuery(gsapi, ssid, col + ' !=', "''");
    let upper = response.table.rows.length + 2;
    for (i = 2; i < upper; i++) {
      let search = await gsGet(gsapi, ssid, 'Sheet1!A' + i)
        if (search[0][0] == target) {
      return i
    };
  };
  } catch (error) {
    console.log(error)
  }
};