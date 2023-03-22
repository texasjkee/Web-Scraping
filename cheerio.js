const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const arrAlab = ["adamsville", "addison", "adger",];

const parse = async () => {
  const getHTML = async (url) => {
    const {data} = await axios.get(url);
    return cheerio.load(data);
  }

  const URL = 'https://www.quicktransportsolutions.com/carrier/alabama/abbeville.php';
  let content = '';

  const $ = await getHTML(URL);
  
  const pagination = $('.pagination').text().split('');
  const numberPagnation = pagination.map(el => +el).filter(el => el === Number(el))

  for(let i = 2; i <= numberPagnation.length; ++i) {
   const urlP = await getHTML(`${URL}?page=${i}`) 
    const a = urlP('.panel-body').each((j, element) => {
      const pageContent = $(element).find('.well-sm').text()
      fs.writeFile(`abbeville${i}.txt`, pageContent, err => {
        if (err) {
          console.error(err);
        }
      });
    });
  }
}

parse();



