let place;

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
    place = prizeData.place;
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop=false;
}

function $(sel) {
  return document.querySelector(sel);
}

const randomNumber = Math.floor(Math.random() * 1000) + 1;

$("#sign_beach_a").addEventListener("click", function(){
  start_game();
  $("#sign_park").classList.add("moved");
  $("#sign_camping").classList.add("moved");
  setTimeout(function(){
    $("#sign_beach").classList.add("shifted");
  }, 500);
  setTimeout(function(){
    $("#confetti_beach").setAttribute("href", "imgs/confetti_beach.svg?" + randomNumber);
  }, 1600);
  setTimeout(function(){
    $("#sign_beach").classList.add("invis");
  }, 2000);
}, false);

$("#sign_park_a").addEventListener("click", function(){
  start_game();
  $("#sign_beach").classList.add("moved");
  $("#sign_camping").classList.add("moved");
  setTimeout(function(){
    $("#sign_park").classList.add("shifted");
  }, 500);
  setTimeout(function(){
    $("#confetti_beach").setAttribute("href", "imgs/confetti_park.svg?" + randomNumber);
  }, 1600);
  setTimeout(function(){
    $("#sign_park").classList.add("invis");
  }, 2000);
}, false);

$("#sign_camping_a").addEventListener("click", function(){
  start_game();
  $("#sign_beach").classList.add("moved");
  $("#sign_park").classList.add("moved");
  setTimeout(function(){
    $("#confetti_beach").setAttribute("href", "imgs/confetti_camping.svg?" + randomNumber);
  }, 1600);
  setTimeout(function(){
    $("#sign_camping").classList.add("invis");
  }, 2000);
}, false);

function start_game() {
  $("#hand_animation").classList.add("invis");
  $("#top_text").classList.add("invis");
  setTimeout(function(){
    $("#head").classList.add("jump");
    $("#tongue").classList.add("jump");
  }, 500);
  setTimeout(function(){
    $("#car").classList.add("moved");
  }, 900);
  setTimeout(function(){
    $("#confetti").setAttribute("href", "imgs/confetti.svg?" + randomNumber);
    $("#big_circle").classList.add("active");
  }, 1600);
  setTimeout(function(){
    $("#car").classList.add("invis");
    $("#road_cars").classList.add("invis");
  }, 2000);
  setTimeout(function(){
    $("#circle_text").classList.remove("invis");
  }, 3000);
  setTimeout(function(){
    $("#ballot_wrapper").classList.remove("invis");
  }, 3200);
}