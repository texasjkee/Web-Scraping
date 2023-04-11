module.exports = checkMc = mc => {
  let mcArr;

  if(mc){
    mcArr = mc.split('')
  }

  if(mcArr[0] != ('\n')) return mc
}

// checkMc(undefined);

//TO_DO: think || and &&, example (if i === 1 || 2);
//       includes('MC') true or false;

// https://schema.org/Organization

// const URL = `https://www.quicktransportsolutions.com/truckingcompany/alabama/marcus-crabb-usdot-3560034.php`
// const URLwithSince = `https://www.quicktransportsolutions.com/truckingcompany/alabama/highly-favorite-llc-usdot-1290715.php`;
// const URLwithMc = `https://www.quicktransportsolutions.com/truckingcompany/alabama/horizon-transportation-logistics-inc-usdot-3553062.php`
// const URLwithFax = `https://www.quicktransportsolutions.com/truckingcompany/alabama/jerome-hollis-usdot-970491.php`

// const checkMcFunc = require('./checkMcFunc.js');