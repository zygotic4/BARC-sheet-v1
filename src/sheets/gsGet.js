module.exports = async (gsapi, ssid, range) => {
  const parameters = {
    spreadsheetId: ssid,
    range: range,
  };
  let dataobj = await gsapi.spreadsheets.values.get(parameters);
  return dataobj.data.values;
};