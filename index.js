const express = require('express');
const {google} = require('googleapis');

const app = express();
const PORT = 3333;

app.get('/', async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credention.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
  })
  
  const client = await auth.getClient();
  
  const googleSheets = google.sheets({version: "v4", auth: client});

  const spreadsheetId = "1J2MoR48cYnPVN9X9rY3l32zp_T9tml63VpEUeTIZwTk";
  
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId
  })
  
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1"
  })

  res.send(getRows.data);

})

app.listen(PORT, (req, res) => console.log('Running on 3333'))