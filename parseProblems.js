
const axios = require('axios'); 
const cheerio = require('cheerio'); 
const fs = require('fs'); 

const transformFunc = require('./parseCompanyData.js'); 
const checkMcFunc = require('./checkMcFunc.js');
const ParseAllCompaniesInCity = require('./Parse/ParseAllCompaniesInCity.js');
 
const STATE_CITIES = ['auburn']
const CURRENT_STATE = 'Alabama';

const parse = async () => {
  const getHTML = async (url) => {
    const {data} = await axios.get(url);
    return cheerio.load(data);
  }

  for(city of STATE_CITIES) {
    const citiesURL = await ParseAllCompaniesInCity(city);
    
    console.log(citiesURL)
    // for(URL2 of paginationUrlArr) {
    //   const contentCitiesPages = [];

    //   const $ = await getHTML(paginationUrlArr[0]);

    //   let dataText = '';

    //   const links = $('.well')
    //     .each((i, el) => {
    //       const foundLink = ($(el).find('a').attr("href"))
    //       contentCitiesPages.push(foundLink)
    //     });

  // const allData = {
  //   sinceData: [],
  //   addressData: [],
  //   state: [],
  //   city: [],
  // }

  // const parseCurrentCompanyData = $('td').each((i, el) => {
  //   const since = $(el).text();

  //   if(allData.sinceData.length < 24) {
  //     allData.sinceData.push(since) 
  //   }

  //   const address = $('address').text();
  //   allData.addressData.push(address); 
  // });
  
  // allData.state.push(CURRENT_STATE)
  // allData.city.push(city)

  // const mc = allData.sinceData[11]

  // if(checkMcFunc(mc)) {
  //   dataText += transformFunc(allData)
  // } 

  // fs.appendFile(`states/${CURRENT_STATE}/${city}.txt`, dataText, err => {
  //   if (err) {
  //     console.error(err);
  //   }
  // });
}
}
  // }
// }
parse();