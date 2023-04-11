const express = require('express');
const {google} = require('googleapis');
const fs = require('fs');

const {allCities} = require('./fsCycle.js')

const app = express();
const PORT = 3333;

const validData = []

// allCities.forEach(city => {
//   let content = fs.readFileSync(`./states/Texas/${city}.txt`, 'utf-8')
//   const a = content.split(/(\n+)/).filter(el =>  el !== `\n`)
//   validData.push(a)
// })


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

  // arr.forEach(async (el, i) => {
    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Sheet1!A:B",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [
          // [...realValid[0]]
          // ["test","test"]
        ]      
      }
    })
  // })

  res.send(getRows.data);
})

app.listen(PORT, (req, res) => console.log('Running on 3333'));