const axios = require('axios'); 
const cheerio = require('cheerio'); 
const fs = require('fs'); 

const transformFunc = require('./parseCompanyData.js'); 
const checkMcFunc = require('./checkMcFunc.js');
 
const STATE_CITIES = ['auburn']

const CURRENT_STATE = 'Alabama';

const parse = async () => {
  const getHTML = async (url) => {
    const {data} = await axios.get(url);
    return cheerio.load(data);
  }

  for(city of STATE_CITIES){
    const paginationUrlArr = [];

    const cityUrlfirstPage =`https://www.quicktransportsolutions.com/carrier/alabama/${city}.php`
    paginationUrlArr.push(cityUrlfirstPage)

    const $ = await getHTML(cityUrlfirstPage) 
    const pagination = $('.pagination').text().split('');
    const numberPagnation = pagination.map(el => +el).filter(el => el === Number(el))

    for(let i = 2; i <= numberPagnation.length; ++i) {
      const cityURLotherPage= `${cityUrlfirstPage}?page=${i}` 
      paginationUrlArr.push(cityURLotherPage)
    }

    for(URL2 of paginationUrlArr) {
      // if(1){
      const contentCitiesPages = [];

      const $ = await getHTML(URL2);

      let dataText = '';

      const links = $('.well')
        .each((i, el) => {
          const foundLink = ($(el).find('a').attr("href"))
          contentCitiesPages.push(foundLink)
        });

      for(link of contentCitiesPages) {
        // if(1) {
        // const $ = await getHTML('https://www.quicktransportsolutions.com/truckingcompany/alabama/cdm-carriers-llc-usdot-3339678.php')
        // const $ = await getHTML('https://www.quicktransportsolutions.com/truckingcompany/alabama/highly-favorite-llc-usdot-1290715.php')
        const $ = await getHTML(link)

        const allData = {
          sinceData: [],
          addressData: [],
          state: [],
          city: [],
        }

        const parseCurrentCompanyData = $('td').each((i, el) => {
          const since = $(el).text();

          if(allData.sinceData.length < 24) {
            allData.sinceData.push(since) 
          }

          const address = $('address').text();
          allData.addressData.push(address); 
        });
        
        allData.state.push(CURRENT_STATE)
        allData.city.push(city)

        const mc = allData.sinceData[11]
        console.log(mc)

        if(checkMcFunc(mc)) {
          dataText += transformFunc(allData)
        } 
      }

      fs.appendFile(`states/${CURRENT_STATE}/${city}.txt`, dataText, err => {
        if (err) {
          console.error(err);
        }
      });
    }
  }
// }
}
// }

parse();