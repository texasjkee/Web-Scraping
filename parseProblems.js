const axios = require('axios'); 
const cheerio = require('cheerio'); 
const fs = require('fs'); 

// const URL = `https://www.quicktransportsolutions.com/truckingcompany/alabama/marcus-crabb-usdot-3560034.php`
// const URLwithSince = `https://www.quicktransportsolutions.com/truckingcompany/alabama/highly-favorite-llc-usdot-1290715.php`;
// const URLwithMc = `https://www.quicktransportsolutions.com/truckingcompany/alabama/horizon-transportation-logistics-inc-usdot-3553062.php`
// const URLwithFax = `https://www.quicktransportsolutions.com/truckingcompany/alabama/jerome-hollis-usdot-970491.php`

// const checkMcFunc = require('./checkMcFunc.js');
const ParseAllCompaniesPages = require('./Parse/ParseAllCompaniesPages.js');
const transformFunc = require('./finalFunc.js');
 
const STATE_CITIES = ['auburn'];
const CURRENT_STATE = 'Alabama';

const parse = async () => {
  const getHTML = async (url) => {
    const {data} = await axios.get(url);
    return cheerio.load(data);
  }

for(let city of STATE_CITIES) {
  const pagesUrl = await ParseAllCompaniesPages(city);
  for(let URL of pagesUrl) {
    const $ = await getHTML(URL);
    const companyOnPage = [];

    const links = $('.well')
      .each((i, el) => {
        const foundLink = ($(el).find('a').attr("href"))
        companyOnPage.push(foundLink)
      });
    for(let company of companyOnPage) {
      const $ = await getHTML(company);
      console.log(company)

      const companyDate = {
        state: null,
        city: null,
        mc: null,
        name: null,
        phone: null,
        since: null,
      }
      
      const getColumData = $('.col-md-12').each((i, data) => {
        //TO_DO: think || and &&, example (if i === 1 || 2);
        //       includes('MC') true or false;
      
        if(i === 1) {
          const columData = $(data).text(); 

          const sinceIndex = columData.search('since');
          console.log(sinceIndex)
          const since = sinceIndex !== -1 ? columData.slice(sinceIndex).match(/\d{8}/)[0] : ' ';

          const companyData = columData.split('\n')[1];
          const name = companyData.split('is')[0];

          const mcIndex = companyData.search('MC')
          const companyMc = companyData.slice(mcIndex);

          companyDate.state = CURRENT_STATE;
          companyDate.city = city;
          companyDate.mc = companyMc;
          companyDate.name = name;
          companyDate.since = since;
          console.log(name);
        }

        if(i === 2) {
          const columData = $(data).text(); 
          const foundPhone = columData.match(/\d{3}-\d{3}-\d{4}/g)[0];
          companyDate.phone = foundPhone;
        }
      })
      
      const validCompanyData = transformFunc(companyDate);      
      
      fs.appendFile(`states/${CURRENT_STATE}/${city}.txt`, validCompanyData, err => {
        if (err) {
          console.error(err);
        }
      });
      }
    }
  }
}
parse();