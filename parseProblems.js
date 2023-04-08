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

  // for(let city of STATE_CITIES) {
    // const citiesUrl = await ParseAllCompaniesInCity(city);
    
    // for(let URL of citiesUrl) {
      const contentCitiesPages = [];
      // const URL = `https://www.quicktransportsolutions.com/truckingcompany/alabama/marcus-crabb-usdot-3560034.php`
      // const URLwithSince = `https://www.quicktransportsolutions.com/truckingcompany/alabama/highly-favorite-llc-usdot-1290715.php`;
      // const URLwithMc = `https://www.quicktransportsolutions.com/truckingcompany/alabama/horizon-transportation-logistics-inc-usdot-3553062.php`
      const URLwithFax = `https://www.quicktransportsolutions.com/truckingcompany/alabama/jerome-hollis-usdot-970491.php`
      const $ = await getHTML(URLwithFax);

      let dataText = '';

      // const links = $('.well')
      //   .each((i, el) => {
      //     const foundLink = ($(el).find('a').attr("href"))
      //     contentCitiesPages.push(foundLink)
      //   });
      
      // const allData = {
      //   sinceData: [],
      //   addressData: [],
      //   state: CURRENT_STATE,
      //   city: STATE_CITIES
      // }
      
      const companyDate = {
        name: null,
        mc: null,
        phone: null,
        since: null,
      }
      
      const getColumData = $('.col-md-12').each((i, data) => {

        //TO_DO: think || and &&, example (if i === 1 || 2);
        //       includes('MC') true or false;
      
        if(i === 1) {
          const columData = $(data).text(); 

          const companyData = columData.split('\n')[1];
          const companyName = companyData.split('is')[0];
          const mcIndex = companyData.search('MC')
          const companyMc = companyData.slice(mcIndex);
          console.log(companyName);
          console.log(companyMc)
        }

        // if(i === 2) {
        //   const columData = $(data).text(); 
        //   const foundPhone = columData.match(/\d{3}-\d{3}-\d{4}/g)[0];
        //   console.log(foundPhone)
        //   // companyDate.phone = foundPhone;
        // }
      })

      fs.appendFile(`states/${CURRENT_STATE}/problemCity.txt`, dataText, err => {
        if (err) {
          console.error(err);
        }
      });
    // }
  }
// }
parse();