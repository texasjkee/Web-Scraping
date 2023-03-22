const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const AlabamaCitiesArray = require('./states/Alabama/AlabamaCitiesArray.js')

const parse = async () => {
  const getHTML = async (url) => {
    const {data} = await axios.get(url);
    return cheerio.load(data);
  }

  const paginationArray = [];

  // const alabama = await getHTML('https://www.quicktransportsolutions.com/carrier/alabama/trucking-companies.php')

  for(city of AlabamaCitiesArray) {
    let URL = `https://www.quicktransportsolutions.com/carrier/alabama/${city}.php` 
    const $ = await getHTML(URL);
    const pagination = $('.pagination').text();
    console.log(pagination, city)
  }
}

parse();



