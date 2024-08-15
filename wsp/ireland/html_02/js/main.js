let place;

let clmn1_amount = 0, clmn2_amount = 0, clmn3_amount = 0, total_amount, ballots_amount;

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  ballots_amount = prizeData.ballots_amount;
  total_amount = ballots_amount;
  $("#circle_top").innerHTML = prizeData.circle_top;
  $("#circle_mdl").innerHTML = prizeData.circle_mdl;
  $("#circle_bttm").innerHTML = prizeData.circle_bttm;
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop=false;
}

function $(sel) {
  return document.querySelector(sel);
}

const randomNumber = Math.floor(Math.random() * 1000) + 1;

function signs(b, c) {
  start_game();
  b.classList.add("moved");
  setTimeout(function(){
    c.classList.add("shifted");
  }, 500);
  setTimeout(function(){
    c.classList.add("invis");
  }, 2500);
}

function start_game() {
  play_sound();
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
  }, 2300);
  setTimeout(function(){
    $("#car").classList.add("invis");
  }, 2500);
  setTimeout(function(){
    $("#circle_text").classList.remove("invis");
    $("#info_box").classList.remove("invis");
  }, 3500);
}

let s2 = $("#sign_02"), s3 = $("#sign_03");

$("#sign_02_a").addEventListener("click", () => {
  signs(s3, s2);
}, false);

$("#sign_03_a").addEventListener("click", () => {
  signs(s2, s3);
}, false);
