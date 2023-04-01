let play_game = true;

let url_string = window.location.href; 
let url = new URL(url_string);
let v = url.searchParams.get("v");

// let requestURL = 'js/data.json';
// let request = new XMLHttpRequest();
// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();

// request.onload = function() {
//   const prizeData = request.response;
// }

function $(sel) {
  return document.querySelector(sel);
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop=false;
}

function gstart() {
  play_sound();
  $("#handle1").classList.add("invis");
  $("#handle2").classList.remove("invis");
  $("#initial").classList.add("initial");
  $("#prize1").classList.add("a" + v + "_1");
  $("#prize2").classList.add("a" + v + "_2");
  setTimeout(function(){
      $("#handle1").classList.remove("invis");
      $("#handle2").classList.add("invis");
    }, 400);
}

$("#game").addEventListener("click", function(){
  if(play_game && v >= 3010 && v<= 3034) {
    gstart();
    $("#game").classList.add("played");
    play_game = false;
  }
}, false);