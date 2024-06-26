const gsQuery = require("./gsQuery");
const gsGet = require("./gsGet");

module.exports = async (gsapi, ssid, target, col) => {
  try {
    const response = await gsQuery(gsapi, ssid, col + " !=", "''");
    if (!response) return false
    let upper = response.table.rows.length + 2;
    for (i = 3; i < upper; i++) {
      let search = await gsGet(gsapi, ssid, "Sheet1!" + col + i);
      if (search[0][0] == target) {
        return i;
      }
    }
  } catch (error) {
    console.log("gssearch " + error);
  }
};