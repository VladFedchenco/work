// let game_type = 1;

// let request = new XMLHttpRequest();
// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();

// request.onload = function() {
//   const prizeData = request.response;
//     $("#bllt").innerHTML = prizeData.ballots;
//     game_type = prizeData.game_type;
//     win = "win" + prizeData.ballots;
//     gstart();
// }

$("#can1").addEventListener("click", () => {
  hide_cans();
  setTimeout(function(){
    $("#open1").classList.remove("invis");
  }, 200);
  setTimeout(function(){
    $("#open1").classList.add("hide");
  }, 2000);
}, false);

$("#can2").addEventListener("click", () => {
  hide_cans();
  setTimeout(function(){
    $("#open2").classList.remove("invis");
  }, 200);
  setTimeout(function(){
    $("#open2").classList.add("hide");
  }, 2000);
}, false);

$("#can3").addEventListener("click", () => {
  hide_cans();
  setTimeout(function(){
    $("#open3").classList.remove("invis");
  }, 200);
  setTimeout(function(){
    $("#open3").classList.add("hide");
  }, 2000);
}, false);

const randomNumber = Math.floor(Math.random() * 1000) + 1;

function hide_cans() {
  if (gametype == 2) {
    $("#prize").setAttribute("src", "imgs/tumbler.png");
  }
  $("#pointer").classList.add("invis");
  $("#can1").classList.add("invis");
  $("#can2").classList.add("invis");
  $("#can3").classList.add("invis");
  $("#banner").classList.add("invis");
  setTimeout(function(){
    $("#banner_win").classList.remove("invis");
  }, 200);
  setTimeout(function(){
    $("#gradient").classList.add("invis");
    $("#crab").classList.remove("invis");
    $("#banner_win").classList.add("move");
    $("#pointer").style.display = "none";
  }, 2000);
  setTimeout(function(){
    $("#coins").setAttribute("src", "imgs/coins.svg");
    $("#coins").classList.remove("invis");
  }, 2100);
  setTimeout(function(){
    $("#prize").classList.remove("invis");
    $("#banner_win").style.display = "none";
  }, 4000);
  setTimeout(function(){
    $("#title").classList.remove("hidden");
    $("#crab").style.display = "none";
  }, 5000);
  setTimeout(function(){
    if (gametype == 1) {
      $("#content_win").classList.remove("hidden");
    } else {
      $("#redeem").classList.remove("hidden");
    }
  }, 5500);
}

function $(sel) {
  return document.querySelector(sel);
}

function gstart() {

  setTimeout(function(){
    
  }, 500);
}