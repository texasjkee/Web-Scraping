module.exports = function transformJSONtoValidOutPut(jsonArg) {
  const transformToValidArray = jsonArg.addressData.toString().split(/(\n+)/)
  const companyMC = `MC Number: ${jsonArg.sinceData[11]}`
  const companyName = `${transformToValidArray[2]}`
  const companyPhone = `${transformToValidArray[12]}`
  
  const companySinceNumber = +jsonArg.sinceData[21];   
  const companySince = companySinceNumber ? companySinceNumber : ' ';
 
  return `${companyMC} ${companyName}${companyPhone} Sience: ${companySince}` 
}
