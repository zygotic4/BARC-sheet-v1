require("dotenv").config();

const { google } = require('googleapis');

const clientGoogle = new google.auth.JWT(
  process.env.client_email,
  null,
  process.env.private_key.split(String.raw`\n`).join('\n'),
  [
    'https://www.googleapis.com/auth/spreadsheets'
  ]
);

clientGoogle.authorize((err) => {
  if (err) return console.log(err);
  console.log('connection successful');
  gsrun(clientGoogle, '1BXbjFypGLNftVGMcHsMnf5TVvaUksS7Y2oZBir7DPVo', google.sheets({version:'v4', auth: client}));
});

const gsrun = async (client, gsapi, ssid) => {
  console.log(gsread(client, gsapi, ssid, 'Sheet1!A1:A2'));
  // const updateOptions = {
  //   spreadsheetId: ssid,
  //   range: 'Sheet1!E1',
  //   valueInputOption: 'USER_ENTERED',
  //   resource: { values: newDataArray }
  // };
  // let response = await gsapi.spreadsheets.values.update(updateOptions);
};

const gsread = async (client, gsapi, ssid, range) => {
  const parameters = {
    spreadsheetId: ssid,
    range: range,
  };
  let options = await gsapi.speadsheets.values.get(parameters);
  let data = options.data.values;
  let dataArray = data.map((row) => {
    row.push(row[0] + '-' + row[1]);
    return row;
  });
};