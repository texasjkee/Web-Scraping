module.exports = function transformJSONtoValidOutPut(jsonArg) {
  console.log(jsonArg.sinceData[23])

  const transformToValidArray = jsonArg.addressData.toString().split(/(\n+)/)
  const companyMC = `${jsonArg.sinceData[11]}`
  const companyName = `${transformToValidArray[2]}`
  const companyPhone = `${transformToValidArray[12]}`
  const city = jsonArg.city;
  const state = jsonArg.state;

  const companySinceNumber = +jsonArg.sinceData[23];   
  let companySince = '';

  if (companySinceNumber) {
    if(companySinceNumber.toString().length === 8) {
      companySince = companySinceNumber;
    }
  } else { companySince = ' '; } 

  // companySinceNumber ? companySinceNumber : ' ';
  return `"${state}", "${city}", "${companyMC}", "${companyName}", "${companyPhone}", "Sience: ${companySince}" \n` 
}
