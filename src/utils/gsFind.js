const axios = require('axios');
const util = require('util');

module.exports = async (gsapi, ssid, target) => {
  let query = 'select A'//`select * where A = '${target}'`
  try {
    let response = await axios.get(`https://docs.google.com/spreadsheets/d/${ssid}/gviz/tq?tq=${encodeURI(query)}`);
    if (response == '') return console.log('no records found');

    str = response.data
    str = str.substring(str.indexOf("(") + 1);
    str = str.substring(0, str.indexOf(")"));
    response = JSON.parse(str);
    console.log(util.inspect(response.table.rows, {showHidden: false, depth: null, colors: true}));
  } catch (error) {
    console.error('gsfind ' + error);
  };
};