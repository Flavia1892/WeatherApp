let clearSavedDataButton = document.getElementById("saveData");
let loadDataButton = document.getElementById("loadData");
let displaySavedData = document.getElementById("displaySavedData");
let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];



function responseScreen(x) {
  if (x.matches) {
    document.querySelector(".titlePage").style = "font-size:25px";
    document.querySelector(".btn-outline-dark").style.display = "none";
    displaySavedData.style.fontSize = "10px";
  } else {
    document.querySelector(".titlePage").style = "font-size:60px";
    document.querySelector(".btn-outline-dark").style.display = "none";
  }
}
let widthOfScreen = window.matchMedia("(max-width:550px");

responseScreen(widthOfScreen);
widthOfScreen.addEventListener("change", function () {
  responseScreen(widthOfScreen);
});

//The actual functions for functionality
function fetchData(city, country) {
  fetch("keygen.txt")
    .then((res) => res.json())
    .then((textJSON) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=` +
          textJSON.API_KEY
      )
        .then((response) => response.json()) // get Response, and make it a JSON object
        .then((responseJSON) => {
          console.log(responseJSON);
         
          //Here we set the details of the today card according to the user input
          document.querySelector(".cityToday").innerHTML =
            city + " " + responseJSON.sys.country;
          document.getElementById("todayTime").innerHTML = `${getTimeConverter(
            responseJSON.dt
          )}`;

          //here we set the weather for the today card according to the user input

          document.querySelector("#temperatureToday").innerHTML =
            responseJSON.main.temp + " °C";
          document.querySelector(".small").innerHTML =
            responseJSON.weather[0].main;
          document.getElementById("windToday").innerHTML =
            "Wind:" + " " + `<b>${responseJSON.wind.speed}` + "m/sec";
          document.getElementById("humidityToday").innerHTML =
            "Humidity:" + " " + `<b> ${responseJSON.main.humidity}` + "%";
          document.getElementById("pressureToday").innerHTML =
            "Pressure:" + " " + `<b>${responseJSON.main.pressure}`;
          document.querySelector("#picture").innerHTML = `<img
                              src="/styles/${responseJSON.weather[0].main}.webp"
                              width="130px" height="100px" style="border-radius:20px"
                            />`;
        })
        .catch(() => {
          alert("Error 404");
        });

      saveWeatherdata(city);

      //here we use the same API-KEY stored in textJSON to fetch data from forecast API
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=` +
        textJSON.API_KEY
      )
        .then((response) => response.json()) // get Response, and make it a JSON object
        .then((responseJSON) => {
          //let weather = responseJSON.list[7];
          console.log(responseJSON);

          document.querySelector(".containerNextDays").innerHTML = `
          <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>`;

          setTimeout(() => {
            let counter = 7;
            let html = "";
            for (let i = 1; i < 6; i++) {
              html += ` <div class="row d-flex justify-content-center py-5" >
                  <div class="col-md-8 col-lg-6 col-xl-5">
                    <div class="card text-body" style="border-radius: 35px">
                      <div class="card-body p-4">
                        <div class="d-flex">
                          <h6 class="flex-grow-1" id='cityCountry'>${city} ${
                responseJSON.city.country
              }</h6>
                          <h6 class="flex-grow-1"> ${
                            daysOfWeek[
                              getDayConverter(responseJSON.list[counter].dt)
                            ]
                          } </h6>
                          <h6 id='time'>${getTimeConverter(
                            responseJSON.list[counter].dt
                          )} </h6>
                        </div>
        
                        <div class="d-flex flex-column text-center mt-5 mb-4">
                          <h6 class="display-4 mb-0 font-weight-bold">${
                            responseJSON.list[counter].main.temp
                          } °C</h6>
                          <span class="small" style="color: #868b94">${
                            responseJSON.list[counter].weather[0].main
                          }</span>
                        </div>
        
                        <div class="d-flex align-items-center">
                          <div class="flex-grow-1" style="font-size: 1rem">
                            <div>
                              <i class="fas fa-wind fa-fw" style="color: #868b94"></i>
                              <span class="ms-1" id='windspeed'>Wind: <b> ${
                                responseJSON.list[counter].wind.speed
                              } m/sec</b></span>
                            </div>
                            <div>
                              <i class="fas fa-tint fa-fw" style="color: #868b94"></i>
                              <span class="ms-1">Humidity: <b>${
                                responseJSON.list[counter].main.humidity
                              } %</b></span>
                            </div>
                            <div>
                              <i class="fas fa-sun fa-fw" style="color: #868b94"></i>
                              <span class="ms-1">Pressure: <b>${
                                responseJSON.list[counter].main.pressure
                              } </b></span>
                            </div>
                          </div>
                          <div>
                            <img
                              src="/styles/${
                                responseJSON.list[counter].weather[0].main
                              }.webp"
                              width="130px" height="100px" style="border-radius:20px"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                    `;

              document.querySelector(".containerNextDays").innerHTML = html;
              document.querySelector(".reset").style.display = "block";
              counter += 8;
            }
          }, 2000);
        });
    });
}

function getTimeConverter(epochDate) {
  let date = new Date(epochDate * 1000);
  return date.toLocaleString();
}

function getDayConverter(epochDate) {
  let date = new Date(epochDate * 1000);
  let dayOfWeek = date.getDay();
  return dayOfWeek;
}

function getValueByEnter() {
  let value = "";

  document
    .querySelector(".form-control")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        value = this.value;
        let arrOfWords = value.split(",");
        fetchData(arrOfWords[0], arrOfWords[1]);
        this.value = "";
      }
    });
}

function saveWeatherdata(dataFromUser) {
  if (dataFromUser) {
    localStorage.setItem("weatherDataFromUser", dataFromUser);
  } else alert("No data to save");
}

function loadWeatherdata() {
  let savedDataFromUser = localStorage.getItem("weatherDataFromUser");
  if (savedDataFromUser) {
    {
      displaySavedData.innerHTML = `<ul><h3>Your last city searched is: <li id='savedData'>${savedDataFromUser}</li></h3><li id='closeButton'> <button type='button' id='close'>Close</button></li></ul>`;

      document.getElementById("close").addEventListener("click", () => {
        displaySavedData.innerHTML = "";
      });
      document.getElementById("savedData").addEventListener("click", () => {
        fetchData(`${savedDataFromUser}`);
        document.querySelector(".form-control").value = `${savedDataFromUser}`;
        displaySavedData.innerHTML = "";
      });
    }
  } else alert("No data stored to be found!");
}

//the functions to get the current GPS locations for cards
function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else alert("Geolocation is not supported by this browser!");
}
function showPosition(position) {
  fetch("keygen.txt")
    .then((res) => res.json())
    .then((textJSON) => {
      let currLatitude = position.coords.latitude;
      let currLongitutde = position.coords.longitude;

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${currLatitude}&lon=${currLongitutde}&appid=${ textJSON.API_KEY}`
      )
        .then((response) => response.json()) // get Response, and make it a JSON object
        .then((responseJSON) => {
          console.log(responseJSON);

          let currentCity = responseJSON.name;
          document.querySelector(".form-control").value = currentCity;

          fetchData(currentCity);
        });
    });
}
//the function to toggle dark mode
function getDarkMode() {
  let toggleDark = document.getElementById("dark-button");
  let body = document.querySelector("body");

  toggleDark.addEventListener("click", function () {
    body.classList.toggle("dark-theme");
    document.getElementById("loadData").classList.toggle("dark-theme-buttons");
    document.getElementById("saveData").classList.toggle("dark-theme-buttons");
    document
      .getElementById("getLocation")
      .classList.toggle("dark-theme-buttons");
    document.querySelector(".titlePage").classList.toggle("titlePage-dark");
    document
      .querySelector(".modal-content")
      .classList.toggle("modal-content-dark");
    if (body.classList.contains("dark-theme")) {
      toggleDark.style.backgroundImage = "url('/styles/sun.png ')";
    } else {
      toggleDark.style.backgroundImage = "url('/styles/moon.png ')";
    }
  });
}

//Stuff that runs automatically upon loading the page
document.querySelector(".reset").addEventListener("click", () => {
  document.querySelector(".form-control").value = "";
  document.querySelector(".containerNextDays").innerHTML = "";
  document.querySelector(".reset").style.display = "none";
  document.querySelector(".cityToday").innerHTML = "City";
  document.getElementById("todayTime").innerHTML = "Time and date";
  document.querySelector("#temperatureToday").innerHTML = "";
  document.querySelector("#windToday").innerHTML = "";
  document.querySelector("#humidityToday").innerHTML = "";
  document.querySelector("#pressureToday").innerHTML = "";
  document.querySelector(".small").innerHTML = "";
  document.querySelector("#picture").innerHTML = "";
});

document.querySelector(".reset").style.display = "none";
document.querySelector(".pageContent").style.display = "none";
document.querySelector(".form-control").style.display = "none";
document.querySelector("#loading").innerHTML = `
<img src='/styles/load.webp' width='250px' height='250px'>Loading....
  `;
setTimeout(() => {
  document.querySelector(".form-control").style.display = "block";
  document.querySelector(".pageContent").style.display = "block";
  document.querySelector("#loading").style.display = "none";
  //Modal display
  let modal = document.getElementById("myModal");

  let btn = document.querySelector(".form-control");

  btn.addEventListener("mouseover", function () {
    modal.style.display = "block";
  });

  btn.addEventListener("mouseout", function () {
    modal.style.display = "none";
  });
  //End of Modal
}, 3000);

getValueByEnter();
loadDataButton.addEventListener("click", loadWeatherdata); //here we fire up the load local storage data
//here we clear the local storage data
clearSavedDataButton.addEventListener("click", () => {
  localStorage.clear();
  displaySavedData.innerHTML = "";
  alert("Your data has been cleared!");
});

document.querySelector(".btn-outline-dark").style.display = "none";
document
  .getElementById("current-location-button")
  .addEventListener("click", getCurrentLocation);

getDarkMode();
