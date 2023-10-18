require("dotenv").config();
const util = require('util');
const gsGet = require("./sheets/gsGet");
const gsClear = require("./sheets/gsClear");
const gsUpdate = require("./sheets/gsUpdate");
const gsQuery = require("./sheets/gsQuery");
const gsFind = require("./sheets/gsFind");

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
    // console.log(await gsGet(gsapi, ssid, 'Sheet1!A1:A2'));
    // await gsQuery(gsapi, ssid, 'A = ', "'spongal'");
    // await gsClear(gsapi, ssid, 'Sheet1!B1');
    // await gsUpdate(gsapi, ssid, 'Sheet1!B1', 'hamb');
    // addPoints(client, gsapi, ssid, 'spongal', 1, 'B', 'C');
  } catch (error) {
    console.log('gsrun: ' + error);
  };
};

const addPoints = async (client, gsapi, ssid, user, points, col1, col2) => {
  let index = await gsFind(client, gsapi, ssid, user, 'A');

  let p = await gsGet(gsapi, ssid, 'Sheet1!' + col1 + index + ':' + col2 + index);

  let week = parseInt(p[0][0]);
  let total = parseInt(p[0][1]);

  week += points;
  total += points;

  return await gsUpdate(gsapi, ssid, 'Sheet1!' + col1 + index + ':' + col2 + index, [week, total]);
};