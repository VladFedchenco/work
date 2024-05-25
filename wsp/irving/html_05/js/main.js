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
  $("#note").innerHTML = prizeData.note;
  $("#ballots").innerHTML = prizeData.ballots;
  $("#ballot_enter").innerHTML = prizeData.ballot_enter;
  $("#username").innerHTML = prizeData.username + "!";
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop=false;
}

function $(sel) {
  return document.querySelector(sel);
}

const randomNumber = Math.floor(Math.random() * 1000) + 1;

function signs(a, b, c, d) {
  start_game();
  a.classList.add("moved");
  b.classList.add("moved");
  setTimeout(function(){
    c.classList.add("shifted");
  }, 500);
  setTimeout(function(){
    $("#confetti_beach").setAttribute("href", d + randomNumber);
  }, 2300);
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
    $("#road_cars").classList.add("invis");
  }, 2500);
  setTimeout(function(){
    $("#circle_text").classList.remove("invis");
  }, 3500);
  setTimeout(function(){
    $("#ballot_wrapper").classList.remove("invis");
  }, 3700);
}

let sb = $("#sign_beach"), sp = $("#sign_park"), sc = $("#sign_camping");
let cb = "imgs/confetti_beach.svg?", cp = "imgs/confetti_park.svg?", cc = "imgs/confetti_camping.svg?";

$("#sign_beach_a").addEventListener("click", () => {
  signs(sp, sc, sb, cb);
}, false);

$("#sign_park_a").addEventListener("click", () => {
  signs(sb, sc, sp, cp);
}, false);

$("#sign_camping_a").addEventListener("click", () => {
  signs(sb, sp, sc, cc);
}, false);

$("#enter_ballots").addEventListener("click", function(){
  $("#circle_text").classList.add("invis");
  $("#ballot_wrapper").classList.add("invis");
  $("#game_container").classList.add("invis");
  if(clmn1_amount == 1) {
    $("#clmn1_ballots_img").setAttribute("src", "imgs/ballot_fuel_life.svg");
  }
  if(clmn2_amount == 1) {
    $("#clmn2_ballots_img").setAttribute("src", "imgs/ballot_fuel_year.svg");
  }
  if(clmn3_amount == 1) {
    $("#clmn3_ballots_img").setAttribute("src", "imgs/ballot_travel.svg");
  }
  $("#congrats").classList.remove("invis");
}, false);

let field1 = $("#clmn1_amount"), field2 = $("#clmn2_amount"), field3 = $("#clmn3_amount");
let ballot1 = $("#clmn1_ballots"), ballot2 = $("#clmn2_ballots"), ballot3 = $("#clmn3_ballots");

function counterBttnPlus(a, f, b) {
  if(a >= 10) {
    f.classList.add("small");
  }
  f.innerHTML = a;
  b.innerHTML = a;
}

function counterBttnMinus(a, f, b) {
  if(a < 10) {
    f.classList.remove("small");
  }
  f.innerHTML = a;
  b.innerHTML = a;
}

$("#c1_plus").addEventListener("click", () => {
  clmn1_amount = amount_plus(clmn1_amount);
  counterBttnPlus(clmn1_amount, field1, ballot1);
}, false);

$("#c1_minus").addEventListener("click", () => {
  clmn1_amount = amount_minus(clmn1_amount);
  counterBttnMinus(clmn1_amount, field1, ballot1);
}, false);

$("#c2_plus").addEventListener("click", () => {
  clmn2_amount = amount_plus(clmn2_amount);
  counterBttnPlus(clmn2_amount, field2, ballot2);
}, false);

$("#c2_minus").addEventListener("click", () => {
  clmn2_amount = amount_minus(clmn2_amount);
  counterBttnMinus(clmn2_amount, field2, ballot2);
}, false);

$("#c3_plus").addEventListener("click", () => {
  clmn3_amount = amount_plus(clmn3_amount);
  counterBttnPlus(clmn3_amount, field3, ballot3);
}, false);

$("#c3_minus").addEventListener("click", () => {
  clmn3_amount = amount_minus(clmn3_amount);
  counterBttnMinus(clmn3_amount, field3, ballot3);
}, false);

function amount_plus(num) {
  if(num < 30) {
    if(ballots_amount > 0) {
      num++;
      ballots_amount--;
    }
  }
  return num;
}

function amount_minus(num) {
  if(num > 0) {
    if(ballots_amount < total_amount) {
      num--;
      ballots_amount++;
    }
  }
  return num;
}