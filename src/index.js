// require("dotenv").config();

const { google } = require('googleapis');

const clientGoogle = new google.auth.JWT(
  'barc-92@barc-sheet-v1.iam.gserviceaccount.com', //process.env.client_email,
  null,
  '\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCesEzwAksoYRSk\nWejqWu9YZnPWVj38ORZtEynTCUZfCj8Cp01HPCmqyDfsvp58EwTP1UDQShzVDcQY\nGstTMZlcaUillBT8/jcv2NoNDyCzKqAu87x68Fw8RhXE7GMxNiu1xAdsUyRUTH3u\niXLkgRl4yKiTHm8qXuv5SwaPvEGGkB+Ou+ZE8G9GWPGYqnp9qjzoYNzibb6ic7B8\n06591p1xHKRpm74KwBeBix/wSnJmTJxScW1VkfPL/KAMRes2zQtbiO67WmqwT1vI\nK6lh8P5H3CBTRTCOcszH7pjoGnlL3BLmm9b4++G2PMy45uaFlva19RwMKHZCi7lM\nKBAtlrFZAgMBAAECggEABke7Pm2+JGKghYHwFNj1IKOABsXc/Xlo6MzZr+TDEzR9\nmpDydFTuNThn9jJJEBH/SRZgfUh27FD3fMNlXpfXlkUDFK0lSNSVbIsBfi4mFiZ5\nYRemUvCQ8JW5e39QzFF02Lm3AtN7huvhY/+ukK/cnooabyVviCwU3LCFGZ/SsWI8\n1SeOFkEvJ2HDbauMVtnbaIoAT69TzLMUgUl/zEjHzXHtGk03oKo5jZGK2QmUNCj4\n739q1caP4+AlDzKEBg+zD8AHl5VoZmaercMGk25tEvYW873r/yp8GckeByR0hmXp\njFG6dRVuV6wc2ftPmmrNRaji7Fb3TPcFUHQUXUwmAQKBgQDS711d+bHorXCb6qcN\nJFN+orREXnnMTkj7qiF5oTxnPShJGN88BZLb27lWY3KFOZ4+AzltITi5BCrwqDWn\no0ZO0dUnUzaurBoeRwbT0/h+b7FUgZ8qEpemEAJ6n9Kars0XhAPos7/KFNuvaga8\nIH+2uo56CNQl8MTq34PMKNa9mQKBgQDAl29SIBWwStesO0IaGpPyHg3l1H8Z+K6V\nuoODFoQo44oIlKUGGFbliMJAAEhbauD+Od1CxsALU9dAcvGUKKjPNsiaqsvbwGXT\noBmEFJEsoiDNi+DxfAnxS0NKYGHUAEbR13ZUDPxSWQ07Xre9IDCUyYpv4gt5a08F\nORSS2B5pwQKBgCuM5i8P7a6HmLdoVEM/W8nKmAOBqg4Hn8PuFWlCY/FAzD+DVhvT\nXsXr8LEoaS2eftB44/NnJ4nzlVYItMM+z7ZYVnT/FkwsFlxn973mhui78NXsyUrr\necn8hjaBJv9u1cNkK1ZxPkjf05e9AVT4NMYqcF470mle85k2usR9LhEJAoGAOiW+\ns5ICWl7ObS7bD1yU7JYMZibZVTMTKxvMFykWL+47P8n5ZTS2D8lRtNchAZDsa3V3\nC3FMjF7873WE4NHB3gZRXPlSYX/efp2o9orrJgmxU7325ZIowlSR9YPSJZsLxtGB\n5XCiQg6nAxTe7tgoMtQC2zLpefhfPFl2j7t2u0ECgYAB3vYuWiTGwPSdRA6QFrmo\nkDwSQwd1Xpwgr+Cs98aunO54XTludijCsG0uSFTxEvf88euxCUdhgiF05x0nms48\n+DFajHeonzvwvHnt3UjR2tz1CMCyGLpO/tc6WfVZ5ppXxFBdliEwb4M+wSUAiXOb\ntcEyZQ2BGYO+ySurGUuLSg==\n-----END PRIVATE KEY-----\n'
  .split(String.raw`\n`).join('\n'),
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