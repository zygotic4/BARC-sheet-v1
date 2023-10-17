module.exports = async (gsapi, ssid, range, input) => {
  const parameters = {
    spreadsheetId: ssid,
    range: range,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[input]],
    }
  };
  return response = await gsapi.spreadsheets.values.update(parameters);
};