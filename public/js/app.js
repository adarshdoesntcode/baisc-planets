
const planetName = document.querySelector("#planet-name");
const temp = document.querySelector("#temp");
const gravity = document.querySelector("#gravity");
const year = document.querySelector("#year");
const day = document.querySelector("#day");
const moons = document.querySelector("#moons");
const right = document.querySelector("#right");
const left = document.querySelector("#left");
const planet = document.querySelector("#planet");
const facts = document.querySelector('#facts');

let planetIndex = 0;

window.onload = ()=>{
  planetIndex++;
  fetchCall(planetIndex);
}
left.addEventListener("click",()=>{
  // planetName.textContent = "Loading..."
  // facts.textContent="";
  // temp.textContent = "-";
  // gravity.textContent ="-";
  // year.textContent = "-";
  //  day.textContent = "-";
  //  moons.textContent="-";
  if(planetIndex==1){
    planetIndex = 8;  
  }
  else{
    planetIndex--;
  }
  fetchCall(planetIndex);
})


right.addEventListener("click",()=>{
  // planetName.textContent = "Loading..."
  // facts.textContent="";
  // temp.textContent = "-";
  // gravity.textContent ="-";
  // year.textContent = "-";
  //  day.textContent = "-";
  //  moons.textContent="-";
  if(planetIndex==8){
    planetIndex = 1;  
  }
  else{
    planetIndex++;
  }
  fetchCall(planetIndex);
})


const fetchCall = (planetIndex)=>{

  const url =`/planet?planetIndex=${planetIndex}`;
  
  fetch(url).then((response)=>{
    response.json().then((data)=>{
      if(data.error)
      {
        alert(data.error);
      }
      else
      {
        hideall();
        planetName.textContent = data.name;
        temp.innerHTML = Math.round(data.avgTemp-273.15)+'&deg;';
        gravity.textContent = data.gravity;
        year.textContent = data.year;
        day.textContent = data.day;
        planet.style.background = `url(/img/bodies/${data.name}.jpg)`;
        facts.textContent=data.facts;
        moons.textContent=data.moons;
        unhideall();
        AOS.refreshHard();
      }
    }
    )
  })
  }
  
  
const hideall = ()=>{
  planetName.classList.add("hide");
  facts.classList.add("hide");
  temp.classList.add("hide");
  gravity.classList.add("hide");
  year.classList.add("hide");
   day.classList.add("hide");
   moons.classList.add("hide");
}

const unhideall = ()=>{
  planetName.classList.remove("hide");
  facts.classList.remove("hide");
  temp.classList.remove("hide");
  gravity.classList.remove("hide");
  year.classList.remove("hide");
   day.classList.remove("hide");
   moons.classList.remove("hide");
}