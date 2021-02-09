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
  win = 1;
  req_af = requestAnimationFrame(wheel_rotation);
  $("#bttn").setAttribute("class", "op");
  $("#initial_headline").setAttribute("class", "op");
  setTimeout(function(){
    $("#bttn").setAttribute("class", "invis op");
    $("#initial_headline").setAttribute("class", "invis op");
  }, 300)
}

function easing(t) {
  if(t<.5) {
    t = 2*t*t;
  } else {
    t = -1+(4-2*t)*t;
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
  if (prize_time < 50) {
    prize_time++;
    $("#win").setAttribute("transform", "translate(622 -300) scale(" + (1 + 0.5 * easing(prize_time / 50)) + ") translate(-622 300)");
    $("#win").setAttribute("opacity",  easing(prize_time / 50));
    $("#stars_block").setAttribute("transform", "translate(622 780) scale(" + 2 * easing(prize_time / 50) + ") translate(-622 -780)");
    $("#stars_block").setAttribute("opacity",  easing(prize_time / 50));
    req_af = requestAnimationFrame(show_prize);
  } else {
    $("#bttn").setAttribute("class", "op");
    $("#prize_text").setAttribute("class", "op");
    $("#next_headline").setAttribute("class", "op");
    setTimeout(function(){
      $("#bttn").setAttribute("class", "");
      $("#prize_text").setAttribute("class", "");
      $("#next_headline").setAttribute("class", "");
    }, 300)
    cancelAnimationFrame(req_af);
  }
}