fetch("https://api.openweathermap.org/data/2.5/forecast?q="+"Dallas"+"&appid="+"bb0b09d5ca94947c226b173fba818e45")
.then(response => response.json())
.then(function(data){
    console.log(data);

})

var cityFormEl = document.querySelector("#city-form");
var locationButtonsEl = document.querySelector("#location-buttons");
var cityInputEl = document.querySelector("#cityname");
var cityContainerEl = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#city-search");

var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityname = cityInputEl.value.trim();

  if (cityname) {
    getUserRepos(cityname);

    cityContainerEl.textContent = '';
    cityInputEl.value = '';
  } else {
    alert('Please enter a City');
  }
};

var buttonClickHandler = function (event) {
  var city = event.target.getAttribute("data-location");

  if (city) {
    getFeaturedcity(city);

    cityContainerEl.textContent = '';
  }
};

var getCityLocation = function () {
  var apiUrl = ();

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data, city);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to OpenWeather');
    });
};

var getFeaturedCity = function (language) {
  var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+"Dallas"+"&appid="+"bb0b09d5ca94947c226b173fba818e45";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displaycity(data.items, language);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};

var displaycity = function (cities, searchTerm) {
  if (cities.length === 0) {
    cityContainerEl.textContent = 'No City found.';
    return;
  }

  repoSearchTerm.textContent = searchTerm;

  for (var i = 0; i < cities.length; i++) {
    var cityName = cities[i].owner.login + '/' + cities[i].name;

    var repoEl = document.createElement('a');
    repoEl.classList = 'list-item flex-row justify-space-between align-center';
    repoEl.setAttribute('href', './single-repo.html?repo=' + cityName);

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
