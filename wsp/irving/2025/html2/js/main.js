let place;

let clmn1_amount = 0, clmn2_amount = 0, clmn3_amount = 0, total_amount, ballots_amount;

let l1 = $("#sign_1 .arrow_text").textContent.length;
let l2 = $("#sign_2 .arrow_text").textContent.length;
let l3 = $("#sign_3 .arrow_text").textContent.length;

if(l1 > 14) {
  let fontsize = 60 - 2.3 * (l1 - 14);
  $("#sign_1 .arrow_text").setAttribute("font-size", fontsize);
  $("#sign_1 .arrow_text").setAttribute("transform", "translate(0 " + fontsize / 4 + ")");
}

if(l2 > 14) {
  let fontsize = 60 - 2.3 * (l2 - 14);
  $("#sign_2 .arrow_text").setAttribute("font-size", fontsize);
  $("#sign_2 .arrow_text").setAttribute("transform", "translate(0 " + fontsize / 4 + ")");
}

if(l3 > 14) {
  let fontsize = 60 - 2.3 * (l3 - 14);
  $("#sign_3 .arrow_text").setAttribute("font-size", fontsize);
  $("#sign_3 .arrow_text").setAttribute("transform", "translate(0 " + fontsize / 4 + ")");
}

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  ballots_amount = prizeData.ballots_amount;
  total_amount = ballots_amount;
  $("#cup_prize_text h2").innerHTML = prizeData.prize_top;
  $("#cup_prize_text h3").innerHTML = prizeData.prize_mdl;
  if(prizeData.prize_mdl == "fuel discount") {
    $("#subheadline").textContent = "You’ve WON a";
  }
  $("#cup_prize_text h4").innerHTML = prizeData.prize_bttm;
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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let randomInt = getRandomInt(1, 5);
$("#car").setAttribute("href", "imgs/car" + randomInt + ".svg");

const randomNumber = Math.floor(Math.random() * 1000) + 1;

function start_game() {
  play_sound();
  $("#hand").classList.add("invis");
  $("#pointer").classList.add("invis");
  $("#top_text").classList.add("invis");
  $("#head").classList.add("bark");
  $("#head2").classList.add("bark");
  $("#dog_body").classList.add("bark");
  setTimeout(function(){
    $("#car").classList.add("moved");
  }, 500);
  setTimeout(function(){
    $("#car").classList.add("moved");
  }, 900);
  setTimeout(function(){
    $("#road").classList.add("invis");
    $("#color_bg").classList.add("visible");
    $("#cup_top_title").classList.add("visible");
    $("#dog").classList.add("invis");
    $("#confetti").setAttribute("href", "imgs/confetti.svg?" + randomNumber);
  }, 2300);
  setTimeout(function(){
    $("#car").classList.add("invis");
    $("#prize_cup").classList.add("visible");
  }, 2500);
  setTimeout(function(){
    $("#cup_prize_text").classList.add("visible");
  }, 2600);
  setTimeout(function(){
    $("#ballot_wrapper").classList.remove("invis");
  }, 3700);
}

$("#sign_1").addEventListener("click", () => {
  $("#sign_1").classList.add("rotate");
  $("#color_bg").setAttribute("fill", "url(#color_bg1)");
  start_game();
}, false);

$("#sign_2").addEventListener("click", () => {
  $("#sign_2").classList.add("rotate");
  $("#color_bg").setAttribute("fill", "url(#color_bg2)");
  start_game();
}, false);

$("#sign_3").addEventListener("click", () => {
  $("#sign_3").classList.add("rotate");
  $("#color_bg").setAttribute("fill", "url(#color_bg3)");
  $("#main").classList.add("white");
  start_game();
}, false);

$("#enter_ballots").addEventListener("click", function(){
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