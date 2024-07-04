function responseScreen(x) {
  if (x.matches) {
    document.querySelector(".titlePage").style = "font-size:25px";
  }
  else document.querySelector(".titlePage").style = "font-size:60px";
}
let widthOfScreen = window.matchMedia("(max-width:550px");
responseScreen(widthOfScreen);
widthOfScreen.addEventListener("change", function () {
  responseScreen(widthOfScreen);
});
