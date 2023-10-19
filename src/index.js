require("dotenv").config();
const util = require('util');
const eventHandler = require("./handlers/eventHandler");
const gsGet = require("./sheets/gsGet");
const gsClear = require("./sheets/gsClear");
const gsUpdate = require("./sheets/gsUpdate");
const gsQuery = require("./sheets/gsQuery");
const gsFind = require("./sheets/gsFind");
const changePoints = require("./manage/changePoints");
const newRecord = require("./manage/newRecord");

const { Client, IntentsBitField, Partials } = require("discord.js");
const { google } = require('googleapis');

const clientDiscord = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.DirectMessageReactions,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.DirectMessageTyping,
  ],
  partials: [
    Partials.Channel,
    Partials.Message
  ],
});

const clientGoogle = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join('\n'),
  [
    'https://www.googleapis.com/auth/spreadsheets'
  ]
);

//clientDiscord.login(process.env.DISCORD_TOKEN);

clientGoogle.authorize((err) => {
  if (err) return console.log(err);
  console.log('connected to sheet');
  gsrun(clientGoogle, google.sheets({version:'v4', auth: clientGoogle}), '1BXbjFypGLNftVGMcHsMnf5TVvaUksS7Y2oZBir7DPVo');
});

const gsrun = async (client, gsapi, ssid) => {
  try {
    // newRecord(client, gsapi, ssid, 'johnson', 51, 52)
    // console.log(await gsGet(gsapi, ssid, 'Sheet1!A1:A2'));
    // await gsQuery(gsapi, ssid, 'A = ', "'spongal'");
    // await gsClear(gsapi, ssid, 'Sheet1!B1');
    // await gsUpdate(gsapi, ssid, 'Sheet1!B1', 'hamb');
    // changePoints(client, gsapi, ssid, 'spongal', 1, 'B', 'C');
  } catch (error) {
    console.log('gsrun: ' + error);
  };
};

eventHandler(clientDiscord);