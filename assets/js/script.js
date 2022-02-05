var userForm = document.querySelector("#user-form")
var inputValue = document.querySelector("#input-value")
var currentWeatherContainerEl = document.querySelector("#current-weather-container");
var currentWeatherEl = document.querySelector("#current-weather");
var city = "";

var getWeather = function(city) {
    var apiKey = "470f34996c61230089cdebe6c704b095"
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            displayWeather(data, city)
        });
    });
};

var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = inputValue.value;
    if (city) {
        getWeather(city);
        inputValue.value = "";   
    } else {
        alert("Please Enter a City Name");
    }
};

var displayWeather = function(weather, searchTerm) {
    console.log(weather);
    console.log(searchTerm);

    //clear old content
    currentWeatherContainerEl.textContent = "";
    currentWeatherEl.textContent = searchTerm;

    var cityEl = document.createElement("div");
    // cityEl.classList = "list-item flex-row justify-space-between align-center";

    var titleEl = document.createElement("span");
    titleEl.textContent = city;
    cityEl.appendChild(titleEl);
    currentWeatherContainerEl.appendChild(cityEl);

    var tempEl = document.createElement("span");
    tempEl.textContent = "Temp: " + weather.temp
    tempEl.classList = "list-item flex-row justify-space-between align-center";
    currentWeatherContainerEl.appendChild(cityEl);

    
    
}

userForm.addEventListener("submit", formSubmitHandler)






