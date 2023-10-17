require("dotenv").config();
const gsGet = require("./utils/gsGet");
const gsClear = require("./utils/gsClear");
const gsUpdate = require("./utils/gsUpdate");
const gsFind = require("./utils/gsFind");

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
  gsrun(clientGoogle, google.sheets({version:'v4', auth: clientGoogle}), '1BXbjFypGLNftVGMcHsMnf5TVvaUksS7Y2oZBir7DPVo');
});

const gsrun = async (client, gsapi, ssid) => {
  try {
    console.log(await gsGet(gsapi, ssid, 'Sheet1!A1:A2'));
    await gsFind(gsapi, ssid, 'specific')
    // await gsClear(gsapi, ssid, 'Sheet1!B1');
    // await gsUpdate(gsapi, ssid, 'Sheet1!B1', 'hamb');
  } catch (error) {
    console.log('gsrun: ' + error);
  };
};