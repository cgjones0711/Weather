let cityFormEl = document.querySelector("#city-form");
let cityInputEl = document.querySelector("#cityname");
let cityContainerEl = document.querySelector("#city-container");
let locationSearchWeather= document.querySelector("#city-search");
let apiKey = ("8d2ba0552b4bcd1be2f143d448859462")

var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = cityInputEl.value.trim();

  if (city) {
    getCityLocation(city);

    cityContainerEl.textContent = '';
    cityInputEl.value = '';
  } else {
    alert('Please enter a City');
  }
};

async function getCityLocation(city){
    var apiUrl = ("https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+ apiKey)

    fetch(apiUrl)
    .then(function(response) {
        return response .json();

    })
    .then (function (data){
        displaycity(data.city.coord.lat, data.city.coord.lon, data.city.name);
        
        
    });
}

async function displaycity (lat, lon, cityName){
    var apiUrl = ('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey);
   

  fetch(apiUrl)
  .then(function (response) {
    if (response.ok) {
      response.json()
      .then(function (data) {
       noCity(data.daily, cityName );
       console.log (data)
    });
    } else {
      alert('Error: ' + response.statusText);
    }
});
}

    let noCity = function (city, cityName) {
        
        
        if (city.length === 0) {
          cityContainerEl.textContent = 'No City found.';
          return;
        }
        locationSearchWeather.textContent = cityName;
        console.log(cityName)

        for (let i = 0; i < city.length; i++){
            const weatherStatus = city[i];
            
            let statusEl = document.createElement('a');
            statusEl.classList = 'list-item flex-row justify-space-between align-center';

            let titleEL=document.createElement("span");
            let date = new Date(weatherStatus.dt * 1000);
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let dateString = month + "/" + day;
            titleEL.textContent = dateString;
            console.log(dateString)

            let tempEl=document.createElement('span')
            tempEl.textContent=city[i].temp.day;
            console.log(city[i].temp.day);

            let uvEl=document.createElement('span')
            uvEl.textContent=city[i].uvi;
            console.log(city[i].uvi);

            let weatherEl=document.createElement('span')
            weatherEl.textContent=city[i].weather[0];
            console.log(city[i].weather[0]);

            // var tempEl= $('<p class="weatherEl"/>').appendTo('#city-container');
            // tempEl.html=city[0].temp;

            // var weatherEl= $('<p class="weatherEl"/>').appendTo('#city-container');
            // weatherEl.html=city[0].weather[0];

            // var uvEl= $('<p class="uvEl"/>').appendTo('#city-container');
            // uvEl.html=city[0].uv;
         

            

    cityContainerEl.appendChild(statusEl);
            statusEl.appendChild(titleEL);
            // tempEl.appendChild(tempEl);
        }
    }
    
  



cityFormEl.addEventListener('submit', formSubmitHandler);

    
