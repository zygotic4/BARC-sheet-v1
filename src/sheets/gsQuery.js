const axios = require('axios');

module.exports = async (gsapi, ssid, clause, target, opt = false) => {
  target = target.toLowerCase()
  let query
  opt == true ? query = clause : query = `select * where ${clause} ${target}`;
  try {
    let response = await axios.get(`https://docs.google.com/spreadsheets/d/${ssid}/gviz/tq?tq=${encodeURIComponent(query)}`);
    data = response.data;
    data = data.substring(data.indexOf("(") + 1);
    data = data.substring(0, data.length - 2);
    response = JSON.parse(data);
    if (response.table == '' || response.table.rows[0] == '') return false
    return response;
  } catch (error) {
    console.log('gsquery ' + error.response);
  };
};