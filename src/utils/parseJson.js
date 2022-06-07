const fs = require('fs');

const planetJSON = ()=>{
  try{
    const bufferJSON = fs.readFileSync('./utils/planets.json');
    const dataJSON = bufferJSON.toString();
    return JSON.parse(dataJSON);
  }catch(e)
  {
    return []
  }
}

module.exports = planetJSON;