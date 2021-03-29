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
        console.log(data)
        displaycity(data.city.coord.lat, data.city.coord.lon);
        
        // console.log
    });
}

async function displaycity (lat, lon){
    var apiUrl = ('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey);

  fetch(apiUrl)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data.daily[0].weather[0].main)
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
  
};

// var displaycity = function (cities, searchCities) {
//   if (cities.length === 0) {
//     cityContainerEl.textContent = 'No City found.';
//     return;
//   }

//   locationSearchWeather.textContent = searchCities;

//   for (var i = 0; i < cities.length; i++) {
//     var weatherData = cities[i].owner.login + '/' + cities[i].name;

//     var cityEl = document.createElement('a');
//     cityEl.classList = 'list-item flex-row justify-space-between align-center';
//     cityEl.setAttribute('href', './single-repo.html?repo=' + weatherData);

//     var titleEl = document.createElement('span');
//     titleEl.textContent = weatherData;

//     repoEl.appendChild(titleEl);

//     var statusEl = document.createElement('span');
//     statusEl.classList = 'flex-row align-center';

//     if (cities[i].open_issues_count > 0) {
//       statusEl.innerHTML =
//         "<i class='fas fa-times status-icon icon-danger'></i>" + cities[i]. + ' issue(s)';
//     } else {
//       statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
//     }

//     cityEl.appendChild(statusEl);

//     cityContainerEl.appendChild(cityEl);
//   }
// };

cityFormEl.addEventListener('submit', formSubmitHandler);

