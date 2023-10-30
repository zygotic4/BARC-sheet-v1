const axios = require('axios');

module.exports = async (gsapi, ssid, clause, target) => {
  let query = `select * where ${clause} ${target}`;
  console.log(query)
  console.log(encodeURIComponent(query))
  console.log('select%20*%20where%20B%20%3D%2010')
  try {
    let response = await axios.get(`https://docs.google.com/spreadsheets/d/${ssid}/gviz/tq?tq=${encodeURIComponent(query)}`);
    data = response.data;
    data = data.substring(data.indexOf("(") + 1);
    data = data.substring(0, data.length - 2);
    response = JSON.parse(data);
    if (response.table == '') return false
    return response;
  } catch (error) {
    console.log('gsquery ' + error.response);
  };
};