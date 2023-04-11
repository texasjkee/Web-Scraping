const axios = require('axios'); 
const cheerio = require('cheerio'); 
const fs = require('fs'); 

const parse = async () => {
  const getHTML = async (url) => {
    const {data} = await axios.get(url);
    return cheerio.load(data);
  }
  const URL = 'https://www.quicktransportsolutions.com/carrier/alabama/auburn.php';

  const $ = await getHTML(URL);
  
  // const domElem = $("*[itemprop = 'name']").get(0);
  const companiesURL = [];

  const domElem= $("*[itemtype = 'https://schema.org/Organization']")
      .each((i, el) => {
        const data = $(el).text();
        const mc = data.includes('MC');
        if(mc) {
          const foundLink = ($(el).find('a').attr("href"))
          companiesURL.push(foundLink);
        }
      });
  // console.log(companiesURL.length)
}

parse();