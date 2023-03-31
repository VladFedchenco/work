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

// function play_sound() {
//   $("#sound").play();
//   $("#sound").loop=false;
// }

function gstart() {
  $("#handle1").classList.add("invis");
  $("#handle2").classList.remove("invis");
  $("#initial").classList.add("initial");
  $("#prize1").classList.add("a3010_1");
  $("#prize2").classList.add("a3010_2");
  setTimeout(function(){
      $("#handle1").classList.remove("invis");
      $("#handle2").classList.add("invis");
    }, 400);
}

$("#game").addEventListener("click", function(){
  gstart();
}, false);