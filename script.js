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
       noCity(data.daily, cityName)
     
    });
    } else {
      alert('Error: ' + response.statusText);
    }
});
}

    let noCity = function (city, cityName, dateString) {
        if (city.length === 0) {
          cityContainerEl.textContent = 'No City found.';
          return;
        }
        locationSearchWeather.textContent = cityName;

        for (let i = 0; i < city.length; i++) {
            const weatherStatus = city[i];
            console.log(weatherStatus)
            let statusEl = document.createElement('a');
            statusEl.classList = 'list-item flex-row justify-space-between align-center';

            let titleEL=document.createElement("span");
            let date = new Date(weatherStatus.dt * 1000);
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let dateString = month + "/" + day;
            console.log(dateString)
                titleEL.textContent = dateString;
            cityContainerEl.appendChild(statusEl);
            statusEl.appendChild(titleEL);
            .appendChild(dateString)
        }
  
    }
    
  
// })
// function appendData(data) {
//     var mainContainer = document.getElementById("city-search");
//     for (var i = 0; i < data.length; i++) {
//       var div = document.createElement("div");
//     div.data
//       mainContainer.appendChild(div);
//     }
//   }
// location = document.getElementById('city').value;
// city.push(location);
// localStorage.setItem(city)



cityFormEl.addEventListener('submit', formSubmitHandler);


