// let requestURL = 'js/data.json';
// let request = new XMLHttpRequest();
// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();

// request.onload = function() {
//   const prizeData = request.response;
//   $("#prize_head").innerText = prizeData.head;
//   $("#prize_id").setAttribute("src", prizeData.prize_id);
//   $("#prize_name").innerText = prizeData.prize_name;
//   $("#prize_underline").innerText = prizeData.prize_underline;
//   $("#prize_size").innerText = prizeData.prize_size;
// }

// let req_af = requestAnimationFrame(wheel_rotation);
// cancelAnimationFrame(req_af);

//let sector = [1417.5, 1372.5, 1327.5, 1282.5, 1237.5, 1192.5, 1147.5, 1102.5];
// <use id="win" href="#sector8" x="621.9" y="555.7" opacity="1" transform="translate(622 -300) scale(1.5) translate(-622 300)" />
// <g id="stars_block" class="invis" transform="translate(622 780) scale(2) translate(-622 -780)">

let sector = [2137.5, 2092.5, 2047.5, 2002.5, 1957.5, 1912.5, 1867.5, 1822.5];
let angle = 0;
let win;
let req_af;
let prize_time = 0;

function $(sel) {
  return document.querySelector(sel);
}

function randomNumber(min, max) {  
    min = Math.ceil(min); 
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

$("#bttn").onclick = function() {
  win = randomNumber(1, 8);
  req_af = requestAnimationFrame(wheel_rotation);
  $("#reset").setAttribute("class", "");
  $("#bttn").setAttribute("class", "invis");
}

$("#reset").onclick = function() {
  cancelAnimationFrame(req_af);
  win = randomNumber(1, 8);
  angle = 0;
  prize_time = 0;
  $("#sectors").setAttribute("transform", "");
  $("#bttn").setAttribute("class", "");
  $("#reset").setAttribute("class", "invis");
  $("#win").setAttribute("class", "invis");
  $("#win").setAttribute("href", "");
  $("#win").setAttribute("transform", "translate(622 -300) scale(1) translate(-622 300)");
  $("#win").setAttribute("opacity", "0");
  $("#stars_block").setAttribute("class", "invis");
  $("#stars_block").setAttribute("transform", "translate(622 780) scale(0) translate(-622 -780)");
  $("#stars_block").setAttribute("opacity", "0");
}

function easing(t) {
  if(t<.5) {
    t = 4*t*t*t;
  } else {
    t = (t-1)*(2*t-2)*(2*t-2)+1;
  }
  return t;
}

function wheel_rotation() {
  if (angle < sector[win-1]) {
    angle += 5;
    $("#sectors").setAttribute("transform", "rotate(" + sector[win-1] * easing(angle / sector[win-1]) + " 621.9 555.7)");
    req_af = requestAnimationFrame(wheel_rotation);
  } else {
    cancelAnimationFrame(req_af);
    $("#win").setAttribute("href", "#sector" + win);
    $("#win").setAttribute("class", "");
    $("#stars_block").setAttribute("class", "");
    req_af = requestAnimationFrame(show_prize);
  }
}

function show_prize() {
  if (prize_time < 100) {
    prize_time++;
    $("#win").setAttribute("transform", "translate(622 -300) scale(" + (1 + 0.5 * easing(prize_time / 100)) + ") translate(-622 300)");
    $("#win").setAttribute("opacity",  easing(prize_time / 100));
    $("#stars_block").setAttribute("transform", "translate(622 780) scale(" + 2 * easing(prize_time / 100) + ") translate(-622 -780)");
    $("#stars_block").setAttribute("opacity",  easing(prize_time / 100));
    req_af = requestAnimationFrame(show_prize);
  } else {
    cancelAnimationFrame(req_af);
  }
}