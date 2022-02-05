var userForm = document.querySelector("#user-form")
var inputValue = document.querySelector("#input-value")
var city = "";

var getWeather = function(city) {
    var apiKey = "470f34996c61230089cdebe6c704b095"
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data, city)
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
}

userForm.addEventListener("submit", formSubmitHandler)






