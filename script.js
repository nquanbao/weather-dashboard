var searchInput = document.getElementById('search-input')
var searchBtn = document.querySelector(".search-btn")
var resultEl = document.querySelector(".show-size")
var historyEl = document.querySelector(".search-history")
var btnELs = document.querySelectorAll(".btn")
var cityEl = "";
var apiKeyEl = "63f111d13dbf89c52eb18d5426a99934";
var historySearch = JSON.parse(localStorage.getItem("search-history")) || []

//function to get city name
function getCity (url){
    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        var currentDate = dayjs().format('DD/MM/YYYY')
        // var dateEl = currentDate.add(i,'day')
        // console.log(dateEl)
        var dataRow = document.createElement("p")
            dataRow.classList.add('currentday')
            var cityName = document.createElement('h3')
            var dateRow = document.createElement("li")
            var tempRow = document.createElement("li")
            var humRow  = document.createElement("li")
            var windRow = document.createElement("li")
            // var currentDate = dayjs().format('DD/MM/YYYY')
            cityName.textContent = data.city.name + " (" + currentDate + ")"
            tempRow.textContent = "Temp: " + data.list[0].main.temp + " F";
            humRow.textContent = "Humidity: " + data.list[0].main.humidity + " %";
            windRow.textContent = "Wind speed: " + data.list[0].wind.speed +" MPH";
            resultEl.appendChild(dataRow)
            dataRow.appendChild(cityName)
            dataRow.appendChild(tempRow)
            dataRow.appendChild(humRow)
            dataRow.appendChild(windRow)
        for (var i = 1; i < 6; i++){
            // var dateEl = currentDate.add(i,'day')
            // console.log(dateEl)
            var dataRow = document.createElement("ul")
            dataRow.classList.add('forecast')
            var cityName = document.createElement('h3')
            var dateRow = document.createElement("li")
            var tempRow = document.createElement("li")
            var humRow  = document.createElement("li")
            var windRow = document.createElement("li")
            // var currentDate = dayjs().format('DD/MM/YYYY')
            cityName.textContent = currentDate
            tempRow.textContent = "Temp: " + data.list[i].main.temp + " F";
            humRow.textContent = "Humidity: " + data.list[i].main.humidity + " %";
            windRow.textContent = "Wind speed: " + data.list[i].wind.speed +" MPH";
            resultEl.appendChild(dataRow)
            dataRow.appendChild(cityName)
            dataRow.appendChild(tempRow)
            dataRow.appendChild(humRow)
            dataRow.appendChild(windRow)
        }
    })
    .catch(function(err){
        console.log("Something went wrong!")
    })
}
function showhistory (historySearch){
    for ( var i = 0; i < historySearch.length; i++){
        var pastSearch = document.createElement('button')
        pastSearch.classList.add("btn")
        pastSearch.textContent = historySearch[i]
        historyEl.appendChild(pastSearch)
    }
}
showhistory(historySearch)
//local storage
function localSto (datainput){
    historySearch.push(datainput)
    localStorage.setItem("search-history",JSON.stringify(historySearch))
}

searchBtn.addEventListener("click", function(){
    cityEl = searchInput.value 
    localSto(cityEl)
    var urlSeacrh = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityEl + "&appid=" + apiKeyEl;
    getCity(urlSeacrh)
})