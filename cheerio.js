const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const transformFunc = require('./parseCompanyData.js');
const checkMcFunc = require('./checkMcFunc.js');

// const arrAlab = ["adamsville", "addison", "adger",];

const parse = async () => {
  const getHTML = async (url) => {
    const {data} = await axios.get(url);
    return cheerio.load(data);
  }

  // const URL = 'https://www.quicktransportsolutions.com/truckingcompany/alabama/chris-craddock-trucking-company-usdot-2016086.php';
  // const URLwithSince = 'https://www.quicktransportsolutions.com/truckingcompany/alabama/chitty-trucking-usdot-1158271.php';
  const URLfirstPage ='https://www.quicktransportsolutions.com/carrier/alabama/abbeville.php'
  // const URL = 'https://www.quicktransportsolutions.com/truckingcompany/alabama/4-ts-transport-usdot-2061891.php' 
  const $ = await getHTML(URLfirstPage);

  const contentCitiesPages = [];

  const validJSON = [];

  const links = $('.well')
    .each((i, el) => {
      const foundLink = ($(el).find('a').attr("href"))
      contentCitiesPages.push(foundLink)
    });

  for(link of contentCitiesPages) {
    const $ = await getHTML(link)

    const allData = {
      sinceData: [],
      addressData: [],
    }

    const parseCurrentCompanyData = $('td').each((i, el) => {
      const since = $(el).text();

      if(allData.sinceData.length < 22) {
        allData.sinceData.push(since) 
      }

      const address = $('address').text();
      allData.addressData.push(address); 
    });

    const mc = allData.sinceData[11]

    if(checkMcFunc(mc)) {
      validJSON.push(transformFunc(allData))
    } 
  }

  fs.appendFile('cities/abbeville.json', JSON.stringify(validJSON), err => {
    if (err) {
      console.error(err);
    }
  });
}

parse();