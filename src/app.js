const path = require('path');
const express = require('express');
const hbs = require('hbs');


const port = process.env.PORT || 3000;

const app = express();

const solarSystemApi = require('./utils/solarSystem');
const parseJson = require('./utils/parseJson');

//Define paths for Express

const publicDirectoryPath = path.join(__dirname,'../public');
const viewsDirectoryPath = path.join(__dirname,'../templates/views');
const partialsDirectoryPath = path.join(__dirname,'../templates/partials');

//Setup Handlebar

app.set('view engine','hbs');
app.set('views',viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

//Setup static directory

app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{

  res.render('index');
})

app.get('/planet',(req,res)=>{
  if((!req.query.planetIndex) || req.query.planetIndex>8 || req.query.planetIndex<1){
    return res.send({
      error:"Invalid Planet index"
    })
  }
  let planetPosition = parseInt(req.query.planetIndex)-1;
  
  solarSystemApi(parseJson()[planetPosition].name,(error,response)=>{
    if(error){
      return res.send({
        error
      })
    }
    let moonlength;
    if(response.moons){
      moonlength = response.moons.length;
    }
    else{
      moonlength=0;
    }

    res.send({
      name:response.name,
      moons:moonlength,
      gravity:response.gravity,
      avgTemp:response.avgTemp,
      day:parseJson()[planetPosition].day,
      year:parseJson()[planetPosition].year,
      facts:parseJson()[planetPosition].facts
    })
  });

})

app.listen(port,()=>{
  console.log(`Server started on port ${port}`);
})





