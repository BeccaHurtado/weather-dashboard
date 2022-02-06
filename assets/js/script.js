var userForm = document.querySelector("#user-form")
var inputValue = document.querySelector("#input-value")
var currentWeatherContainerEl = document.querySelector("#current-weather-container");
var city = "";
var apiKey = "470f34996c61230089cdebe6c704b095"

var getWeather = function(city) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey +"&units=imperial"

    // make a request to the url
    fetch(apiUrl)
    .then(function(response) {
        // request was successful
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
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
    .catch(function(error) {
        alert('Unable to connect to Weather Dashboard');
    });
};
        

var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = inputValue.value;
    if (city) {
        getWeather(city);
        var previousSearch = JSON.parse(localStorage.getItem("weather-dashboard")) || []
        previousSearch.push(city)
        localStorage.setItem("weather-dashboard", JSON.stringify(previousSearch))
        inputValue.value = "";   
    } else {
        alert("Please Enter a City Name");
    }
};

var displayWeather = function(weather, searchTerm) {
    console.log(weather);
    console.log(searchTerm);
    console.log(weather.main.temp)
    console.log(weather.main.humidity)
    console.log(weather.uvi)

    //clear old content
    currentWeatherContainerEl.textContent = "";

    var searchTermEl = document.createElement("div");
    searchTermEl.textContent = searchTerm
    searchTermEl.classList = "h1 text-capitalize";
    currentWeatherContainerEl.appendChild(searchTermEl);

    var tempEl = document.createElement("div");
    tempEl.textContent = "Temp: " + weather.main.temp
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
    
    var imgEl = document.createElement("img");
    imgEl.src= `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    currentWeatherContainerEl.appendChild(imgEl);
}

function forecast (lat, lon, city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=currentminutelyhourlyalerts&appid=${apiKey}`
    fetch(apiUrl)
    .then(function(response) {
        // request was successful
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                var html = ""
                for (i=0; i < 5; i++) {
                    html += `<div class="card" style="width: 18rem;">
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <h6 class="card-subtitle mb-2 text-muted">Description:${data.daily[i].weather[0].description} <img src="https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png"></h6>
                      <p class="card-text">Temp:${data.daily[i].temp.max}</p>
                      <p class="card-text">Humidity:${data.daily[i].humidity}</p>
                      <p class="card-text">Uvi:${data.daily[i].uvi}</p>
                      <p class="card-text">Wind:${data.daily[i].wind_speed}</p>
                    
                    </div>
                  </div>`
                }
                document.getElementById("5-day-forecast").innerHTML = html
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function(error) {
        alert('Unable to connect to Weather Dashboard');
    });
};


userForm.addEventListener("submit", formSubmitHandler)






