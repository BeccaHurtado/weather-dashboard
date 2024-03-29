var today = new Date()
var dd = today.getDate()
var mm = today.getMonth() + 1
var yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}
today = mm + '/' + dd + '/' + yyyy
console.log(today)
var userForm = document.querySelector("#user-form")
var inputValue = document.querySelector("#input-value")
var currentWeatherContainerEl = document.querySelector("#current-weather-container");
var pastSearchButtonEl = document.querySelector("past-search-button")
var city = "";
var apiKey = "470f34996c61230089cdebe6c704b095"

var getWeather = function (city) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial"

    // make a request to the url
    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    var lat = data.coord.lat
                    var lon = data.coord.lon
                    forecast(lat, lon, city);
                    displayWeather(data, city);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Weather Dashboard');
        });
};


var formSubmitHandler = function (event) {
    event.preventDefault();
    var city = inputValue.value;
    if (city) {
        getWeather(city);
        var previousSearch = JSON.parse(localStorage.getItem("weather-dashboard")) || []
        if (previousSearch.indexOf(city) === -1) {
            previousSearch.push(city)
            localStorage.setItem("weather-dashboard", JSON.stringify(previousSearch))
            displayPreviousSearch();
        }
        inputValue.value = "";
    } else {
        alert("Please Enter a City Name");
    }

    pastSearch(city)
};

var displayWeather = function (weather, searchTerm) {
    console.log(weather);
    console.log(searchTerm);
    console.log(weather.main.temp)
    console.log(weather.main.humidity)
    console.log(weather.uvi)

    //clear old content
    currentWeatherContainerEl.textContent = "";

    var searchTermEl = document.createElement("div");
    searchTermEl.textContent = searchTerm
    searchTermEl.classList = "h1 text-capitalize current-weather-title";
    currentWeatherContainerEl.appendChild(searchTermEl);

    var searchDate = document.createElement("div");
    searchDate.textContent = today
    searchDate.classList = "list-item flex-row justify-space between align-center pb-3 pt-3";
    currentWeatherContainerEl.appendChild(searchDate);

    var tempEl = document.createElement("div");
    tempEl.textContent = "Temp: " + weather.main.temp + " ºF"
    tempEl.classList = "list-item flex-row justify-space between align-center pb-3 pt-3";
    currentWeatherContainerEl.appendChild(tempEl);

    var windEl = document.createElement("div");
    windEl.textContent = "Wind: " + weather.wind.speed + " MPH"
    windEl.classList = "list-item flex-row justify-space between align-center pb-3 pt-3";
    currentWeatherContainerEl.appendChild(windEl);

    var humidityEl = document.createElement("div");
    humidityEl.textContent = "Humidity: " + weather.main.humidity
    humidityEl.classList = "list-item flex-row justify-space between align-center pb-3 pt-3";
    currentWeatherContainerEl.appendChild(humidityEl);

    var descriptionEl = document.createElement("div");
    descriptionEl.textContent = "Description: " + weather.weather[0].description
    descriptionEl.classList = "list-item flex-row justify-space between align-center pb-3 pt-3";
    currentWeatherContainerEl.appendChild(descriptionEl);

    // var imgEl = document.createElement("img");
    // imgEl.src= "https://openweathermap.org/img/wn/" + weather.weather[0].icon + ".png"
    // currentWeatherContainerEl.appendChild(imgEl);

}

function forecast(lat, lon, city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=currentminutelyhourlyalerts&appid=${apiKey}&units=imperial`

    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    var fiveDayTitle = `<div><h3>Five Day Forecast</h3></div>`
                    var fiveDayHtml = ""
                    for (i = 0; i < 5; i++) {
                        var date = new Date(data.daily[i + 1].dt * 1000)
                        var dd = date.getDate()
                        var mm = date.getMonth() + 1
                        var yyyy = date.getFullYear();
                        date = mm + '/' + dd + '/' + yyyy
                        fiveDayHtml += 
                        `
                        <div class="d-inline-flex flex-wrap>
                        <div class="weather-card card m-2">
                            <ul class="list-unstyled p-3">
                                <li>${date}</li>
                                <li>${data.daily[i].weather[0].description} <img src="https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png"></li>
                                <li>Temp: ${data.daily[i].temp.max} ºF</li>
                                <li>Humidity: ${data.daily[i].humidity}</li>
                                <li>Uvi: ${data.daily[i].uvi}</li>
                                <li: ${data.daily[i].wind_speed} MPH</li>
                            </ul>
                        </div>
                        </div>
                        `
                    }
                    document.getElementById("5-day-forecast").innerHTML = fiveDayTitle + fiveDayHtml
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Weather Dashboard');
        });
};

function pastSearch(previousSearch) {
    var pastHTML = ""
    var previousSearch = JSON.parse(localStorage.getItem("weather-dashboard")) || []
    for (i = 0; i < previousSearch.length; i++) {
        pastHTML += `<p><button class="past-search btn btn-light" type="click">${previousSearch[i]}</button></p>`
    }
    document.getElementById("past-searches").innerHTML = pastHTML;

}

var pastSearchHandler = function(event) {
    var city = event.target.getAttribute("data-city")
    if (city) {
        displayWeather()
        forecast()
    }
}

userForm.addEventListener("submit", formSubmitHandler)
pastSearchButtonEl.addEventListener("click", pastSearchHandler)






