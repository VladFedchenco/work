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

$("#sign_beach_a").addEventListener("click", function(){
  start_game();
  $("#sign_park").classList.add("moved");
  $("#sign_camping").classList.add("moved");
  setTimeout(function(){
    $("#sign_beach").classList.add("shifted");
  }, 500);
  setTimeout(function(){
    $("#sign_beach").classList.add("invis");
  }, 2000);
  setTimeout(function(){
    $("#confetti_beach").setAttribute("href", "imgs/confetti_beach.svg?" + randomNumber);
  }, 2300);
}, false);

$("#sign_park_a").addEventListener("click", function(){
  start_game();
  $("#sign_beach").classList.add("moved");
  $("#sign_camping").classList.add("moved");
  setTimeout(function(){
    $("#sign_park").classList.add("shifted");
  }, 500);
  setTimeout(function(){
    $("#sign_park").classList.add("invis");
  }, 2000);
  setTimeout(function(){
    $("#confetti_beach").setAttribute("href", "imgs/confetti_park.svg?" + randomNumber);
  }, 2300);
}, false);

$("#sign_camping_a").addEventListener("click", function(){
  start_game();
  $("#sign_beach").classList.add("moved");
  $("#sign_park").classList.add("moved");
  setTimeout(function(){
    $("#sign_camping").classList.add("invis");
  }, 2000);
  setTimeout(function(){
    $("#confetti_beach").setAttribute("href", "imgs/confetti_camping.svg?" + randomNumber);
  }, 2300);
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

$("#c1_plus").addEventListener("click", function(){
  clmn1_amount = amount_plus(clmn1_amount);
  if(clmn1_amount >= 10) {
    $("#clmn1_amount").classList.add("small");
  }
  $("#clmn1_amount").innerHTML = clmn1_amount;
  $("#clmn1_ballots").innerHTML = clmn1_amount;
}, false);

$("#c1_minus").addEventListener("click", function(){
  clmn1_amount = amount_minus(clmn1_amount);
  if(clmn1_amount < 10) {
    $("#clmn1_amount").classList.remove("small");
  }
  $("#clmn1_amount").innerHTML = clmn1_amount;
  $("#clmn1_ballots").innerHTML = clmn1_amount;
}, false);

$("#c2_plus").addEventListener("click", function(){
  clmn2_amount = amount_plus(clmn2_amount);
  if(clmn2_amount >= 10) {
    $("#clmn2_amount").classList.add("small");
  }
  $("#clmn2_amount").innerHTML = clmn2_amount;
  $("#clmn2_ballots").innerHTML = clmn2_amount;
}, false);

$("#c2_minus").addEventListener("click", function(){
  clmn2_amount = amount_minus(clmn2_amount);
  if(clmn2_amount < 10) {
    $("#clmn2_amount").classList.remove("small");
  }
  $("#clmn2_amount").innerHTML = clmn2_amount;
  $("#clmn2_ballots").innerHTML = clmn2_amount;
}, false);

$("#c3_plus").addEventListener("click", function(){
  clmn3_amount = amount_plus(clmn3_amount);
  if(clmn3_amount >= 10) {
    $("#clmn3_amount").classList.add("small");
  }
  $("#clmn3_amount").innerHTML = clmn3_amount;
  $("#clmn3_ballots").innerHTML = clmn3_amount;
}, false);

$("#c3_minus").addEventListener("click", function(){
  clmn3_amount = amount_minus(clmn3_amount);
  if(clmn3_amount < 10) {
    $("#clmn3_amount").classList.remove("small");
  }
  $("#clmn3_amount").innerHTML = clmn3_amount;
  $("#clmn3_ballots").innerHTML = clmn3_amount;
}, false);

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
    $("#car").classList.add("invis");
    $("#road_cars").classList.add("invis");
  }, 2000);
  setTimeout(function(){
    $("#confetti").setAttribute("href", "imgs/confetti.svg?" + randomNumber);
    $("#big_circle").classList.add("active");
  }, 2300);
  setTimeout(function(){
    $("#circle_text").classList.remove("invis");
  }, 3000);
  setTimeout(function(){
    $("#ballot_wrapper").classList.remove("invis");
  }, 3200);
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