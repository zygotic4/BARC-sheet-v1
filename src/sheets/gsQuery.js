const axios = require('axios');

module.exports = async (gsapi, ssid, clause, target) => {
  let query = `select * where ${clause} ${target}`;
  try {
    let response = await axios.get(`https://docs.google.com/spreadsheets/d/${ssid}/gviz/tq?tq=${encodeURI(query)}`);
    data = response.data;
    data = data.substring(data.indexOf("(") + 1);
    data = data.substring(0, data.length - 2);
    response = JSON.parse(data);
    if (response.table.rows == '') return console.log('no records found');
    return response;
  } catch (error) {
    console.log('gsquery ' + error);
  };
};