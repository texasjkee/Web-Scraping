const axios = require('axios'); 
const cheerio = require('cheerio'); 
const fs = require('fs'); 

const URL = 'https://www.quicktransportsolutions.com/carrier/usa-trucking-companies.php';

const parse = async () => {
  const getHTML = async (url) => {
    const {data} = await axios.get(url);
    return cheerio.load(data);
  }

  const $ = await getHTML(URL);
 
  const statesUrl = [];
  const a = $('.col-md-4 ')
  .each((i, el) => {
    const data = $(el).text();
      const foundLink = ($(el).find('a').attr("href"))
        if(foundLink) statesUrl.push(foundLink);
  });
  statesUrl.pop();
  console.log(statesUrl);
}

// parse();
const obj = {
 Alabama:'alabama/trucking-companies.php',
 Alaska:'alaska/truckingcompanies/trucking-companies.php',      
 Arizona:'arizona/trucking-companies.php',
 Arkansas   : 'arkansas/truckingcompanies/trucking-companies.php',    
 California:'california/trucking-companies.php',
 Colorado:'colorado/trucking-companies.php',
 Connecticut:'connecticut/trucking-companies.php',
 Delaware:'delaware/trucking-companies.php',
 Florida:'florida/trucking-companies.php',
 Georgia:'georgia/trucking-companies.php',
 Hawaii:'hawaii/trucking-companies.php',
 Idaho:'idaho/trucking-companies.php',
 Illinois:'illinois/trucking-companies.php',
 Indiana:'iowa/trucking-companies.php',
 Iowa: 'indiana/trucking-companies.php',
 Kansas: 'kansas/truckingcompanies/trucking-companies.php',      
 Kentucky:'kentucky/trucking-companies.php',
 Louisiana:'louisiana/trucking-companies.php',
 Maine:'maine/trucking-companies.php',
 Maryland:'maryland/trucking-companies.php',
 Massachusetts:'massachusetts/trucking-companies.php',
 Michigan:'michigan/trucking-companies.php',
 Minnesota:'minnesota/trucking-companies.php',
 Mississippi: 'mississippi/trucking-companies/trucking-companies.php',
 Missouri: 'missouri/trucking-companies.php',
 Montana: 'montana/trucking-companies/trucking-companies.php',    
 Nebraska: 'nebraska/trucking-companies.php',
 Nevada: 'nevada/trucking-companies.php',
 "New-Hampshire": 'newhampshire/trucking-companies.php',
 "New-Jersey": 'newjersey/trucking-companies.php',
 "New-Mexico": 'newmexico/trucking-companies.php',
 "New-York":'newyork/trucking-companies.php',
 "North-Carolina": 'northcarolina/trucking-companies.php',
 "North-Dakota": 'northdakota/trucking-companies/trucking-companies.php',
 Ohio:'ohio/trucking-companies.php',
 Oklahoma:'oklahoma/trucking-companies.php',
 Oregon: 'oregon/trucking-companies.php',
 "Pennsylvania": 'pennsylvania/trucking-companies.php',
 "Rhode-Island": 'rhodeisland/trucking-companies.php',
 "South-Carolina": 'southcarolina/trucking-companies.php',
 "South-Dakota": 'southdakota/trucking-companies/trucking-companies.php',
 Tennessee: 'tennessee/trucking-companies.php',
 Texas: 'texas/trucking-companies.php',
 Utah: 'utah/trucking-companies.php',
 Vermont: 'vermont/truckingcompanies/trucking-companies.php',
 Virginia: 'virginia/trucking-companies/trucking-companies.php',
 Washington: 'washington/trucking-companies.php',
 "West-Virginia": 'westvirginia/truckingcompanies/trucking-companies.php',
 Wisconsin:'wisconsin/truckingcompanies/trucking-companies.php',
 Wyomin: 'wyoming/trucking-companies/trucking-companies.php'
}
  // 'washingtondc/trucking-companies.php',