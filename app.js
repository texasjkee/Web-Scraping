const puppeteer = require('puppeteer');

const URL = 'https://www.quicktransportsolutions.com/carrier/usa-trucking-companies.php' 

const scrapping = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URL);
  // await page.screenshot({path: 'example.png'});

  const container = await page.$$('.container')

  for(const DOMelement of container) {
    const foundDomElement = await page.evaluate(el => el.innerText, DOMelement) 
    
    console.log( foundDomElement)
  }
  console.log(container)
  await browser.close();
}

scrapping();