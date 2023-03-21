const axios = require('axios');
const cheerio = require('cheerio');

const parse = async () => {
  const getHTML = async (url) => {
    const {data} = await axios.get(url);
    return cheerio.load(data);
  }
  
  const $ = await getHTML('https://www.quicktransportsolutions.com/truckingcompany/arkansas/readers-logistics-llc-usdot-3789667.php')

  //----------------------------------------------------------------------------
  const mcAndDateArray = [];
  const adressArray = [];

  const adress = $('address').text();
  adressArray.push(adress)

  const mcAndDate = $('td').each((i, element) => {
    const data = $(element).text() 
    mcAndDateArray.push(data)
  })
}

parse();


