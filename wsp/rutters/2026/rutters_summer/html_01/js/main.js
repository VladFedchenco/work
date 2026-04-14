let game_type, clmn1_amount = 0, clmn2_amount = 0, clmn3_amount = 0, total_amount, ballots_amount;

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  ballots_amount = prizeData.ballots_amount;
  total_amount = ballots_amount;
  game_type = prizeData.game_type;
  if(game_type == 1 || game_type == 3) {
    $("#more_plays").classList.remove("invis");
  }
  if(game_type == 2 || game_type == 4) {
    $("#more_chances").classList.remove("invis");
  }
  if(game_type == 1 || game_type == 2) {
    $("#ballots").innerHTML = prizeData.ballots;
    $("#ballot_enter").innerHTML = prizeData.ballot_enter;
    $("#ballot_amount").setAttribute("href", "imgs/ballot_" + ballots_amount + ".png");
  }
  if(game_type == 3 || game_type == 4) {
    $("#ttl2").innerHTML = "You’ve Won:";
    $("#ttl3").innerHTML = prizeData.prize_title;
    $("#prize").setAttribute("src", prizeData.prize);
    $("#details").innerHTML = prizeData.prize_detail;
    $("#note").innerHTML = prizeData.prize_note;
    $("#ballot_wrapper").classList.add("invis");
    $("#more_plays").classList.add("lower");
    $("#more_chances").classList.add("lower");
  }
}

const randomNumber = Math.floor(Math.random() * 1000) + 1;

function $(sel) {
  return document.querySelector(sel);
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop=false;
}

$("#bttn_play").addEventListener("click", function(){
  animation_start();
});

$("#animation").addEventListener("click", function(){
  animation_start();
});

function animation_start() {
  $("#game").classList.add("play");
  setTimeout(function(){
    $("#bttn_play").classList.add("invis");
    $("#hand").classList.add("invis");
  }, 500);
  setTimeout(function(){
    play_sound();
  }, 800);
  setTimeout(function(){
    $("#fireworks").setAttribute("href", "imgs/fireworks.svg?v=" + randomNumber);
  }, 1800);
  setTimeout(function(){
    if(game_type == 1 || game_type == 2) {
      $("#animation_bg").classList.add("reveal");
    }
    if(game_type == 3 || game_type == 4) {
      $("#star").classList.add("reveal");
    }
  }, 2400);
  setTimeout(function(){
    if(game_type == 1 || game_type == 2) {
      $("#ballot_amount").classList.add("reveal");
    }
    if(game_type == 3 || game_type == 4) {
      $("#prize").classList.add("reveal");
      $("#ttl3").classList.add("reveal");
      $("#details").classList.add("reveal");
      $("#note").classList.add("reveal");
    }
  }, 2800);
  setTimeout(function(){
    if(game_type == 3) {
      $("#more_plays").classList.add("reveal");
      $("#main").classList.add("short2");
    }
    if(game_type == 4) {
      $("#more_chances").classList.add("reveal");
      $("#main").classList.add("tall");
    }
  }, 4100);
}

if( $("#enter_ballots") ) {
  $("#enter_ballots").addEventListener("click", function(){
    $("#ballot_wrapper").classList.add("invis");
    $("#congrats").classList.remove("invis");
    $("#ttl1").classList.add("invis");
    $("#ttl2").classList.add("invis");
    $("#animation").classList.add("invis");
    if(game_type == 1 || game_type == 3) {
      $("#more_plays").classList.add("reveal");
    }
    if(game_type == 2 || game_type == 4) {
      $("#more_chances").classList.add("reveal");
    }
    setTimeout(function(){
      if(game_type == 1) {
        $("#main").classList.add("short");
      }
    }, 400);
  }, false);
}

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

if( $("#enter_ballots") ) {

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