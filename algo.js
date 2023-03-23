// const realPhoneNumber = phoneNumber.filter(el => el.indexOf('-', 0) !== -1)
//need 2 index in array 
// console.log(allData[0], allData[1])

//------------------------------------------------------------------------------
  const URL = 'https://www.quicktransportsolutions.com/carrier/arkansas/truckingcompanies/trucking-companies.php'
  
  const $$ =  await getHTML(URL);
 
  const citiesArray = [] 

  const allCities = $('table').each((i, element) => {
    const foundCity = $(element).text() 
    citiesArray.push(foundCity)
  })
  console.log(citiesArray[1])


  // let citiesArray = '';

  // const URL = 'https://www.quicktransportsolutions.com/carrier/alabama/trucking-companies.php'
  
  // const $ = await getHTML(URL) 

  // const allCities = $('table').text();
  //   fs.writeFile('cities.txt', allCities, err => {
  //     if (err) {
  //       console.error(err);
  //     }
  //   });

  // ---------------------------------------------------------------------------
  // const AlabamaCitiesArray = require('./states/Alabama/AlabamaCitiesArray.js');
  //
  // for(city of AlabamaCitiesArray) {
  //   let URL = `https://www.quicktransportsolutions.com/carrier/alabama/${city}.php` 
  //   const $ = await getHTML(URL);
  //   const pagination = $('.pagination').text();
  //   console.log(pagination, city)
  // }
//------------------------------------------------------------------------------
//all companies
  // const test = $('.row .clearfix').text();
// 


//------------------------------------------------------------------------------
// Get all links on page. 

// const content = [];

// const $ = await getHTML(URL);
// const test = $('.well')
//   .each((i, el) => {
//     const link = ($(el).find('a').attr("href"))
//     content.push(link)
//   });
// console.log(content.length) 

//------------------------------------------------------------------------------
// Get pagination
// 
// const pagination = $('.pagination').text().split('');
// const numberPagnation = pagination.map(el => +el).filter(el => el === Number(el))

// for(let i = 2; i <= numberPagnation.length; ++i) {
//  const urlP = await getHTML(`${URL}?page=${i}`) 
//   const a = urlP('.panel-body').each((j, element) => {
//     const pageContent = $(element).find('.well-sm').text()
//     fs.writeFile(`abbeville${i}.txt`, pageContent, err => {
//       if (err) {
//         console.error(err);
//       }
//     });
//   });
// }

//------------------------------------------------------------------------------
// Get all information about company
  // const allData = {
  //  sinceData: [],
  //  addressData: [],
  // }

  // const address = $('address').text();
  // allData.addressData.push(address); 

  // const getSince = $('td').each((i, el) => {
  //   const since = $(el).text();

  //   if(allData.sinceData.length < 22) {
  //     allData.sinceData.push(since) 
  //   }
  // });

  // fs.appendFile('cities/abbeville.json', JSON.stringify(allData), err => {
  //   if (err) {
  //     console.error(err);
  //   }
  // });