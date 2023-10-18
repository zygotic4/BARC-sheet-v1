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
    // await gsQuery(gsapi, ssid, 'A = "spongal"');
    // await gsClear(gsapi, ssid, 'Sheet1!B1');
    // await gsUpdate(gsapi, ssid, 'Sheet1!B1', 'hamb');
    addEp(client, gsapi, ssid, 'spongal', 1);
  } catch (error) {
    console.log('gsrun: ' + error);
  };
};

const addEp = async (client, gsapi, ssid, user, points) => {
  let index = await gsFind(client, gsapi, ssid, user, 'A');
  
};