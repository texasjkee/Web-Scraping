const fs = require('fs');
const path = require('path');

const allCities = [];

fs.readdirSync('./states/Texas/',{withFileTypes: true})
  .forEach((dirEntry) => {
    if(dirEntry.isDirectory()) {
      // console.log(`Directory: ${dirEntry.name}`)
    } else if (dirEntry.isFile()) {
      // console.log(`File: ${dirEntry.name}`);
      const cityName = path.parse(dirEntry.name).name
      allCities.push(cityName)
    }
});

module.exports = {allCities}