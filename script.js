// fetch("https://api.openweathermap.org/data/2.5/forecast?q="+"Dallas"+"&appid="+"bb0b09d5ca94947c226b173fba818e45")
// .then(response => response.json())
// .then(function(data){
    

// })

var cityFormEl = document.querySelector("#city-form");
var locationButtonsEl = document.querySelector("#location-buttons");
var cityInputEl = document.querySelector("#cityname");
var cityContainerEl = document.querySelector("#city-container");
var locationSearchWeather= document.querySelector("#city-search");

var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityname = cityInputEl.value.trim();

  if (cityname) {
    getCityLocation(cityname);

    cityContainerEl.textContent = '';
    cityInputEl.value = '';
  } else {
    alert('Please enter a City');
  }
};

var buttonClickHandler = function (event) {
  var Dallas = event.target.getAttribute("data-location");

  if (Dallas) {
    getCityLocation(Dallas);

    cityContainerEl.textContent = '';
  }
};

var getCityLocation = function (city) {
  var apiUrl = ("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid="+"bb0b09d5ca94947c226b173fba818e45")

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data, city);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to OpenWeather');
    });
};

var displayWeather = function (Dallas) {
  var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+ Dallas + "&appid="+"bb0b09d5ca94947c226b173fba818e45";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displaycity(data.items, Dallas);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};

var displaycity = function (cities, searchCities) {
  if (cities.length === 0) {
    cityContainerEl.textContent = 'No City found.';
    return;
  }

  locationSearchWeather.textContent = searchCities;

  for (var i = 0; i < cities.length; i++) {
    var cityName = cities[i].owner.login + '/' + cities[i].name;

    var locationEl = document.createElement('a');
    locationEl.classList = 'list-item flex-row justify-space-between align-center';
    locEl.setAttribute('href', './single-repo.html?repo=' + cityName);

    var titleEl = document.createElement('span');
    titleEl.textContent = repoName;

    repoEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    if (cities[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + cities[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    cityEl.appendChild(statusEl);

    cityContainerEl.appendChild(cityEl);
  }
};

cityFormEl.addEventListener('submit', formSubmitHandler);
locationButtonsEl.addEventListener('click', buttonClickHandler);
