module.exports = async (gsapi, ssid, range) => {
  const parameters = {
    spreadsheetId: ssid,
    range: range,
  };
  try {
    return await gsapi.spreadsheets.values.clear(parameters);    
  } catch (error) {
    console.log('gsclear ' + error);
  };
};