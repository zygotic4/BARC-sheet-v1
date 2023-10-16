module.exports = async (gsapi, ssid, range, input) => {
  const parameters = {
    spreadsheetId: ssid,
    range: range,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[input]],
    }
  };
  let response = await gsapi.spreadsheets.values.update(parameters);
  return response
};