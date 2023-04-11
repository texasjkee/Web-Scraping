module.exports = transformAllDataToStr = data => {
  const mcNumber = data.mc !== null ? data.mc.match(/(\d+)/g)[0] : null;
  return `${data.state}/ ${data.city}/ ${mcNumber}/ ${data.name}/ ${data.phone}/ ${data.since} \n`
}
