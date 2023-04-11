const CURRENT_CITY = 'auburn';

const fs = require('fs');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const CREDENTIALS = JSON.parse(fs.readFileSync('credention.json'));
const RESPONSES_SHEET_ID = '1J2MoR48cYnPVN9X9rY3l32zp_T9tml63VpEUeTIZwTk';
const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);

const strCities = fs.readFileSync(`./states/alabama/${CURRENT_CITY}.txt', 'utf-8`);
const arrCities = strCities.split('\n');

const validGoogleRows = [];

arrCities.forEach(city => {
    const allCityData = city.split('/').filter(data => data = data.length > 3)
        const validObj = {
            state: allCityData[0],
            city: allCityData[1],
            mc_number: allCityData[2],
            company: allCityData[3],
            phone: allCityData[4],
            since: allCityData[5],
        }
    const valid = validObj.phone !== undefined;
    if(valid) {
        validGoogleRows.push(validObj);
    }   
})

const addRow = async (rows) => {

    await doc.useServiceAccountAuth({
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    });

    await doc.loadInfo();

    // Index of the sheet
    let sheet = doc.sheetsByIndex[0];

    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        await sheet.addRow(row);
    }
};

addRow(validGoogleRows);
