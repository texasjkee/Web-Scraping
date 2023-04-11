module.exports = transformAllDataToStr = data => {
  let mcNumber;

  const checkRareMc = data.mc ? data.mc.match(/(\d+)/g) : null;
  console.log(checkRareMc)
  if(checkRareMc){
    mcNumber = data.mc !== null ? checkRareMc : null;
  } else mcNumber = null;
  return `${data.state}/ ${data.city}/ ${mcNumber}/ ${data.name}/ ${data.phone}/ ${data.since} \n`
}
