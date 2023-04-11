const axios = require('axios'); 
const cheerio = require('cheerio'); 
const fs = require('fs'); 

const parse = async () => {
  const getHTML = async (url) => {
    const {data} = await axios.get(url);
    return cheerio.load(data);
  }

  // for(let state of validUrlStates) {

// const state = "verginia"
// const State = "verginia";

    try {
      // const URL = `https://www.quicktransportsolutions.com/carrier/${state}/truckig-companies/truckig-companies.php`
      const URL = 'https://www.quicktransportsolutions.com/carrier/wyoming/trucking-companies/trucking-companies.php'
      const $ =  await getHTML(URL);
     
      const citiesArray = [];

      const allCities = $('table').each((i, element) => {
        const foundCity = $(element).text() 
        citiesArray.push(foundCity)
      })

      const validArr = [];
      
      for(let city of citiesArray) {
        const strWithoutN = city.replace(/\n/g, ',');
        const citiesArr = strWithoutN.replace(/,,,/g, ',').split(',');
        
        for(let city of citiesArr) {
          if(city && city.length < 30) {
            const validCity = city.replace(/\s/g, '-').toLowerCase();
            validArr.push(validCity)
          }
        }
      }

      fs.appendFile(`./states/${State}/${state}.json`, JSON.stringify(validArr.filter(city => city !== '-')), err => {
        console.log(err);
      })
  } catch (error) {
      console.log(error)  
    }
// }
}

parse();

// const ALL_STATES = 
// [
//   'Alabama',        'Alaska',        'Arizona',
//   'Arkansas',       'California',    'Colorado',
//   'Connecticut',    'Delaware',      'Florida',
//   'Georgia',        'Hawaii',        'Idaho',
//   'Illinois',       'Indiana',       'Iowa',
//   'Kansas',         'Kentucky',      'Louisiana',
//   'Maine',          'Maryland',      'Massachusetts',
//   'Michigan',       'Minnesota',     'Mississippi',
//   'Missouri',       'Montana',       'Nebraska',
//   'Nevada',         'New-Hampshire', 'New-Jersey',
//   'New-Mexico',     'New-York',      'North-Carolina',
//   'North-Dakota',   'Ohio',          'Oklahoma',
//   'Oregon',         'Pennsylvania',  'Rhode-Island',
//   'South-Carolina', 'South-Dakota',  'Tennessee',
//   'Texas',          'Utah',          'Vermont',
//   'Virginia',       'Washington',    'West-Virginia',
//   'Wisconsin',      'Wyomin'
// ];