const { GoogleSpreadsheet } = require('google-spreadsheet');
const fs = require('fs');

const RESPONSES_SHEET_ID = '1J2MoR48cYnPVN9X9rY3l32zp_T9tml63VpEUeTIZwTk';
const CREDENTIALS = JSON.parse(fs.readFileSync('credention.json'));
const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);

const getRow = async (email) => {

    // use service account creds
    await doc.useServiceAccountAuth({
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    });

    // load the documents info
    await doc.loadInfo();

    // Index of the sheet
    let sheet = doc.sheetsByIndex[1];

    // Get all the rows
    let rows = await sheet.getRows();
    console.log(rows[0]._rawData);
    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        if (row.email == email) {
            console.log(row.user_name);
            console.log(row.password);
        }
    };
};

getRow('email@gmail.com');

const addRow = async (rows) => {

    // use service account creds
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

let rows = [{
    email: 'email@email.com',
    user_name: 'ramesh',
    password: 'abcd@1234'
}, {
    email: 'email@gmail.com',
    user_name: 'dilip',
    password: 'abcd@1234'
}];

// addRow(rows);

const updateRow = async (keyValue, oldValue, newValue) => {

    // use service account creds
    await doc.useServiceAccountAuth({
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    });

    await doc.loadInfo();

    // Index of the sheet
    let sheet = doc.sheetsByIndex[0];

    let rows = await sheet.getRows();

    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        if (row[keyValue] === oldValue) {
            rows[index][keyValue] = newValue;
            await rows[index].save();
            break; 
        }
    };
};

// updateRow('email', 'email@gmail.com', 'ramesh@ramesh.com')

const deleteRow = async (keyValue, thisValue) => {

    // use service account creds
    await doc.useServiceAccountAuth({
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    });

    await doc.loadInfo();

    // Index of the sheet
    let sheet = doc.sheetsByIndex[0];

    let rows = await sheet.getRows();

    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        if (row[keyValue] === thisValue) {
            await rows[index].delete();
            break; 
        }
    };
};

// deleteRow('email', 'ramesh@ramesh.com');