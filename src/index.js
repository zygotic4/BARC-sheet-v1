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

clientGoogle.authorize((err, tokens) => {
  if (err) return console.log(err);
  console.log('connection successful');
  gsrun(clientGoogle);
});

const gsrun = async (client) => {
  const gsapi = google.sheets({version:'v4', auth: client});
  const options = {
    spreadsheetId: '1BXbjFypGLNftVGMcHsMnf5TVvaUksS7Y2oZBir7DPVo',
    range: 'Sheet1!A1:B4'
  };
  let data = await gsapi.spreadsheets.values.get(options);
  let dataArray = data.data.values;
  let newDataArray = dataArray.map((row) => {
    row.push(row[0] + '-' + row[1]);
    return row
  });
  const updateOptions = {
    spreadsheetId: '1BXbjFypGLNftVGMcHsMnf5TVvaUksS7Y2oZBir7DPVo',
    range: 'Sheet1!E1',
    valueInputOption: 'USER_ENTERED',
    resource: { values: newDataArray }
  };
  let response = await gsapi.spreadsheets.values.update(updateOptions);
};
