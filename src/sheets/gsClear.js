module.exports = async (gsapi, ssid, range) => {
  const parameters = {
    spreadsheetId: ssid,
    range: range,
  };
  return await gsapi.spreadsheets.values.clear(parameters);
};