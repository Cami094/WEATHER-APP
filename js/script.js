
const App= document.getElementById('weather-body');




function giveData(){

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
      alert( "La tua posissione non è disponibile in questo momento")
      }

      function showPosition(position){
          var lat= position.coords.latitude;
          var long=position.coords.longitude;

         console.log(lat,long);
          showData(lat,long);
      }

    }


function showData (latitude,longitude){
    const apikey = "958f9296f4c9a8040b55707989640db8"; 
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
console.log(api);
retData(api);
}

async function retData(api){
    const apiUrlData= await fetch(api);
    const DataApi= await apiUrlData.json()
   //console.log(DataApi)

    revelData(DataApi);
}
function revelData (DataWeather){
   console.log(DataWeather);
   const {main,sys} = DataWeather;
   console.log(main)
   console.log(main.feels_like);
   console.log(main.humidity);
   console.log(DataWeather.name);
   console.log(DataWeather.weather[0].main);
   console.log(DataWeather.weather[0].description);
   console.log(DataWeather.wind);
   console.log(DataWeather.wind.speed);
   console.log(sys.sunrise);
   console.log(sys.sunset);
console.log(DataWeather.weather[0].icon)
   sunrise(sys.sunrise)
   var finalTemp= Math.floor(main.feels_like-273)
var sunriseTime = sunrise(sys.sunrise)
var sunsetTime= sunset(sys.sunset);
var imageicon= DataWeather.weather[0].icon;
console.log(sunriseTime);
console.log(sunsetTime)

App.innerHTML=`  

<input type="text" class="search-bar">
<button class="search" onClick="Click()"><i class="bi bi-zoom-in"></i></button>
<div class="city-name">
<h2>${DataWeather.name}</h2>
</div>
<div class="weather-icon">
<img src="http://openweathermap.org/img/wn/${imageicon}@2x.png" alt="">
</div>

<div class="Weather-main">
<h2>${DataWeather.weather[0].main}</h2>
</div>
<div class="weather-data">
<h2>${finalTemp}<sup>&#176</sup>C</h2>
</div>
<div class="Weather-description">
<h2>${DataWeather.weather[0].description}</h2>
</div>
<div class="Weather-Humidity">
<h2>Humidita:${main.humidity}</h2>
</div>
<div class="Weather-wind">
<h2>Velocita del vento:${DataWeather.wind.speed}</h2>
</div>
<div class="Weather-sunrise">
<h3> Ora dell'alba${sunriseTime}</h3>
</div>
<div class="Weather-sunset">
<h3>Ora del Tramonto${sunsetTime}</h3>
</div>
`
}

function sunrise(data){
    var date = new Date(data * 1000);
var timestr = date.toLocaleTimeString();

console.log( timestr);
return timestr

}
function sunset(data){
    var date = new Date(data * 1000);
var timestr = date.toLocaleTimeString();

console.log( timestr);
return timestr

};
let weather ={
    apikey: "4ab82265e3adeaa828a4e0ca876ea717",
    fetchWeather:function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=4ab82265e3adeaa828a4e0ca876ea717").
        then((response)=> response.json())
        .then((DataWeather)=> revelData(DataWeather))
    },
    
    search: function ( ){
        this.fetchWeather(document.querySelector(".search-bar").value)
    }
    
};

function Click(){
    weather.search();
}

