require("dotenv").config();
const eventHandler = require("./handlers/eventHandler");
const { Client, IntentsBitField, Partials } = require("discord.js");

const { google } = require('googleapis');
const util = require('util')//, {showHidden: false, depth: null, colors: true}

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

clientDiscord.login(process.env.DISCORD_TOKEN);

clientGoogle.authorize((err) => {
  if (err) return console.log(err);
  console.log('connected to sheet');
});

eventHandler(clientDiscord, google.sheets({version:'v4', auth: clientGoogle}), '1BXbjFypGLNftVGMcHsMnf5TVvaUksS7Y2oZBir7DPVo');