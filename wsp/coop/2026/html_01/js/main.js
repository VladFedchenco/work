let total_amount, ballots_amount, instant_win;
let clmn_amount = [0, 0, 0, 0, 0, 0, 0];
let fields = [$("#c1"), $("#c2"), $("#c3"), $("#c4"), $("#c5"), $("#c6"), $("#c7")];

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  instant_win = prizeData.instant_win;
  ballots_amount = prizeData.ballots_amount;
  $("#entries_left").innerHTML = ballots_amount;
  total_amount = ballots_amount;
  $("#number").innerHTML = prizeData.ballots_amount;
  $("#sweeps_title").innerHTML = prizeData.sweeps_title;
  setTimeout(function(){
    gstart();
  }, 1000);
}

if( $("#enter_ballots") ) {
  const p = document.querySelectorAll('.bttn_plus');
  const m = document.querySelectorAll('.bttn_minus');

  for (let i = 0; i < 7; i++) {
    (function(index) {
      let amount = clmn_amount[index];
      let field = fields[index];

      p[index].addEventListener("click", () => {
        amount = amount_plus(amount);
        counterBttnPlus(amount, field);
      }, false);

      m[index].addEventListener("click", () => {
        amount = amount_minus(amount);
        counterBttnMinus(amount, field);
      }, false);
    })(i);
  }
}

$("#enter_ballots").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
  play_sound();
  $("#sweepstakes").classList.add("final");
  if(instant_win) {
    $("#top_wrapper").classList.add("invis");
  }
  $("#animation").classList.add("invis");
  $("#sweeps_header").classList.add("invis");
  $("#sweeps_congrats").classList.remove("invis");
  $("#sweeps_footer").classList.add("invis");
  setTimeout(function(){
    $("#top_wrapper").classList.add("hidden");
    $("#sweeps_header").classList.add("hidden");
    $("#sweeps_footer").classList.add("hidden");
  }, 500);
  setTimeout(function(){
    $("#more_chances").classList.remove("invis");
  }, 800);
}, false);

function gstart() {
  $("#animation").classList.add("play");
  $("#triangles").setAttribute("href", "imgs/triangles.svg?v=" + randomNumber());
  if(instant_win) {
    setTimeout(function(){
      $("#ttl").classList.remove("invis");
    }, 2200);
    setTimeout(function(){
      $("#prize_img").classList.remove("invis");
    }, 2500);
    setTimeout(function(){
      $("#prize_info").classList.remove("invis");
    }, 2800);
    setTimeout(function(){
      $("#plus").classList.remove("invis");
    }, 3600);
    setTimeout(function(){
      $("#sweepstakes").classList.remove("invis");
    }, 4000);
  } else {
    $("#animation").classList.add("v2");
    $("#top_wrapper").classList.add("invis");
    setTimeout(function(){
      $("#sweepstakes").classList.remove("invis");
    }, 2600);
  }
}

function randomNumber() {
  return Math.floor(Math.random() * 10000) + 1;
}

function $(sel) {
  return document.querySelector(sel);
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop=false;
}

function counterBttnPlus(a, f) {
  f.innerHTML = a;
  $("#entries_left").innerHTML = ballots_amount;
  if(ballots_amount == 0) {
    $("#enter_ballots").classList.remove("disable");
  }
}

function counterBttnMinus(a, f) {
  f.innerHTML = a;
  $("#entries_left").innerHTML = ballots_amount;
  if(ballots_amount > 0) {
    $("#enter_ballots").classList.add("disable");
  }
}

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
