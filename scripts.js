function responseScreen(x) {
  if (x.matches) {
    document.querySelector(".titlePage").style = "font-size:25px";
    document.querySelector(".btn-outline-dark").style = "font-size:20px";
  } else {
    document.querySelector(".titlePage").style = "font-size:60px";
    document.querySelector(".btn-outline-dark").style = "font-size:40px";
  }
}
let widthOfScreen = window.matchMedia("(max-width:550px");
responseScreen(widthOfScreen);
widthOfScreen.addEventListener("change", function () {
  responseScreen(widthOfScreen);
});

function showWheatherForNextDays() {
  document.querySelector(".containerNextDays").innerHTML = `
  <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>`;

  setTimeout(() => {
    let html = "";
    for (let i = 0; i < 5; i++) {
      html += ` <div class="row d-flex justify-content-center py-5">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card text-body" style="border-radius: 35px">
              <div class="card-body p-4">
                <div class="d-flex">
                  <h6 class="flex-grow-1">Warsaw</h6>
                  <h6>15:07</h6>
                </div>

                <div class="d-flex flex-column text-center mt-5 mb-4">
                  <h6 class="display-4 mb-0 font-weight-bold">13°C</h6>
                  <span class="small" style="color: #868b94">Stormy</span>
                </div>

                <div class="d-flex align-items-center">
                  <div class="flex-grow-1" style="font-size: 1rem">
                    <div>
                      <i class="fas fa-wind fa-fw" style="color: #868b94"></i>
                      <span class="ms-1"> 40 km/h </span>
                    </div>
                    <div>
                      <i class="fas fa-tint fa-fw" style="color: #868b94"></i>
                      <span class="ms-1"> 84% </span>
                    </div>
                    <div>
                      <i class="fas fa-sun fa-fw" style="color: #868b94"></i>
                      <span class="ms-1"> 0.2h </span>
                    </div>
                  </div>
                  <div>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu1.webp"
                      width="100px"
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
    }
  }, 2000);
}
//Modal display
let modal = document.getElementById("myModal");

let btn = document.querySelector("form");

let span = document.getElementsByClassName("close")[0];

btn.addEventListener("mouseover", function () {
  modal.style.display = "block";
});

btn.addEventListener("mouseout", function () {
  modal.style.display = "none";
});
//End of Modal


//Stuff that runs automatically upon loading the page
document
  .querySelector(".btn-outline-dark")
  .addEventListener("click", showWheatherForNextDays);

document.querySelector(".reset").addEventListener("click", () => {
  document.querySelector(".containerNextDays").innerHTML = "";
  document.querySelector(".reset").style.display = "none";
});

document.querySelector(".reset").style.display = "none";
document.querySelector(".pageContent").style.display = "none";
document.querySelector("#loading").innerHTML = `
<img src='/styles/load.webp' width='250px' height='250px'>Loading....
  `;
setTimeout(() => {
  document.querySelector(".pageContent").style.display = "block";
  document.querySelector("#loading").style.display = "none";
}, 3000);
