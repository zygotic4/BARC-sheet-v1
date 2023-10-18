module.exports = async (gsapi, ssid, range) => {
  const parameters = {
    spreadsheetId: ssid,
    range: range,
  };
  try {
    let dataobj = await gsapi.spreadsheets.values.get(parameters);
    return dataobj.data.values;
  } catch (error) {
    console.log(error)
  };
};