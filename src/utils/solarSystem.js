
const request = require('request');

const solarSystemApi = (planet,callback)=>{

  const url = `https://api.le-systeme-solaire.net/rest/bodies/${planet}`;

  request({url,json:true},(error,{body})=>{
    if(error){
      callback("Could not connect to the server",undefined);
    }
    else{
      callback(undefined,{
        name:body.englishName,
        moons:body.moons,
        gravity:body.gravity,
        avgTemp:body.avgTemp
      });
    }
  })

}

module.exports = solarSystemApi;