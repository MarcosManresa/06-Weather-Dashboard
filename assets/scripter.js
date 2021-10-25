var now = dayjs();
var when = (now.format("MM/DD/YYYY"));
var ciz = "";
var look = $("#look-now");
var btnLook = $("#look-now-bn");



btnLook.on("click", popUpWeather);


function popUpWeather(event) {
  event.preventDefault();
  if (look.val().trim() !== "") {
    ciz = look.val().trim();
    weatherNow(ciz);


    var yurw = document.getElementById("lister");
    yurw.textContent = "";

    var findcity = localStorage.getItem("visitedCities");
    if (findcity === null) {
      findcity = [];
    } else {
      findcity = JSON.parse(findcity);
    }

    findcity.push(ciz);

    var whereDidYouCome= JSON.stringify(findcity);
    localStorage.setItem("visitedCities", whereDidYouCome);


    for (let i = 0; i < findcity.length; i++) {
      var show = document.createElement("li");
      show.setAttribute("class", "item-ok");
      show.setAttribute("id", "city-link");
      show.textContent = findcity[i];
      yurw.appendChild(show);
    }
  }
}


function weatherNow(city) {
  const Key = "ba9a7a1af9e02f0a7f3a7ba9afc65081";
  var URL = "https://api.openweathermap.org/data/2.5/weather?q=" + ciz + "&APPID=" + Key + "&units=imperial";

  $.ajax({
    url: URL,
    method: "GET",
  }).then(function (weatherData) {

    var con = weatherData.weather[0].icon;
    var conURL = "https://openweathermap.org/img/wn/" + con + "@2x.png";
    var now = dayjs();
    var ciz = document.getElementById("current-name");
    ciz.innerHTML = (weatherData.name + " " + "(" + now.format("MM/DD/YYYY") + ")" + '<img src="' + conURL + '">');


    var damp = document.getElementById("damp");
    damp.textContent = "Humidity: " + weatherData.main.humidity + "%";

    var hot = document.getElementById("hot");
    hot.textContent = "Temp: " + weatherData.main.temp + " °F";

    var sped = document.getElementById("sped");
    sped.textContent = "Wind Speed: " + weatherData.wind.speed + " MPH";

   
    var okok = weatherData.coord.lon;
    var ok = weatherData.coord.lat;
    var feeok = "https://api.openweathermap.org/data/2.5/uvi?";
    var okfee = feeok + "lat=" + ok + "&lon=" + okok + "&appid=" + Key

    $.ajax({
      url: okfee,
      method: "GET",
    }).then(function (uvIndexData) {
      var terra = document.getElementById("u-ind");
      terra.textContent = "UV Index: " + uvIndexData.value;

      var uvText = uvIndexData.value;
      if (uvText <= 6) {
        terra.setAttribute("class", "badge bg-warning");
      }
      else if (uvText <= 2) {
        terra.setAttribute("class", "badge bg-success");
      }
      else if (uvText > 6) {
        terra.setAttribute("class", "badge bg-danger");
      }
    });

    
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/onecall?units=imperial&" + "lat=" + ok + "&lon=" + okok + "&exclude=current,minutely,hourly,alerts" + "&appid=" + Key,
      method: "GET",
    }).then(function (forecastData) {
      $("#cast4").empty();

      for (var i = 1; i < 6; i++) {
        var fourcast = document.getElementById("cast4");

        var hah = forecastData.daily[i].dt;
        var u2 = dayjs(u2).format('MM/DD/YYYY');

        var are = document.createElement("div");
        are.setAttribute("class", "col-sm");
        fourcast.appendChild(are);
        

        var are2 = document.createElement("div");
        are2.setAttribute("class", "card card-body bg-primary border-dark");
        are.appendChild(are2);

        var lol = document.createElement("p");
        lol.textContent = u2;
        are2.appendChild(lol);

        var pff2 = document.createElement('img');
        pff2.setAttribute("src", "https://openweathermap.org/img/wn/" + forecastData.daily[i].weather[0].icon + "@2x.png");
        pff2.setAttribute("alt", forecastData.daily[i].weather[0].description);
        are2.appendChild(pff2);

        var yure = forecastData.daily[i].humidity;
        var lol3 = document.createElement("p");
        are2.appendChild(lol3);
        lol3.textContent = "Humidity:" + yure + "%";

        var alalr = forecastData.daily[i].temp.day;
        var lol2 = document.createElement("p");
        are2.appendChild(lol2);
        lol2.textContent = "Temp:" + alalr + "°F";

        
      }
    })
  });
};
