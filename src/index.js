require("dotenv").config();
const gsGet = require("./utils/gsGet");
const gsClear = require("./utils/gsClear");
const gsUpdate = require("./utils/gsUpdate");

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
    // await gsClear(gsapi, ssid, 'Sheet1!B1');
    // await gsUpdate(gsapi, ssid, 'Sheet1!B1', 'hamb');
  } catch (error) {
    console.log('gsrun: ' + error);
  };
};

const gsfind = async (gsapi, ssid, query) => {
  const parameters = {
    spreadsheetId: ssid,
    upper: 100,
  };
  spread.getRequestHeaders().then((authorization) => {
    const query = `select * where K='${searchId}'`; // K can be changed to the col the data is on
    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&gid=${sheetId}&tq=${encodeURI(query)}`;
    let options = {
      url: url,
      method: "GET",
      headers: authorization,
    };
    request(options, err, res, result) => {
      if (err) {
        console.log(err);
        return;
      }
      if (result === ("")) {
      return message.channel.send(`\`${QUERY}\` Did not match to any records.`); //ID didnt match
      } else {
      message.channel.send(`\`${QUERY}\` has been matched with; ${result}`) //confirms ID has matched
      csvParse(result, {}, (err, ar) => console.log(ar)) // console logs results
````  }
    }
  })

}