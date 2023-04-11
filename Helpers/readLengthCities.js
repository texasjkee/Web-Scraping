const fs = require('fs'); 

// const arr = require('./states/Texas/texas.json');

// for(city of arr) {
//   const str = `${city} \n`
//   fs.appendFile('./texasCities.txt', str, err => {
//     console.log(err);
//   })
// }

// fs.readdir('./states/', (err, data) => {
//   for(let state of data) {
//     fs.readdir(`./states/${state}`, (err, content) => {
//       if(state !== 'Alabama') {const cities = require(`./states/${state}/${content}`)
//         const citiesLength = cities.length;
//         const str = `${state} has ${citiesLength} cities. \n`;
//         fs.appendFile('./statesHasCities.txt', str, err => {
//           console.log(err);
//         })
//       }
//     })
//   }
// })