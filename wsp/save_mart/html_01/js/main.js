let clmn1_amount = 0, clmn2_amount = 0, clmn3_amount = 0, total_amount, ballots_amount;

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  ballots_amount = prizeData.ballots_amount;
  total_amount = ballots_amount;
  const game_type = prizeData.game_type
  if(game_type == 1) {
    $("#circle_top").innerHTML = prizeData.ballots_amount;
    $("#circle_bttm").innerHTML = prizeData.circle_bttm;
  }
  $("#ballots").innerHTML = prizeData.ballots;
  $("#ballot_enter").innerHTML = prizeData.ballot_enter;

  $("#game").classList.add("play");
  $("#stars").setAttribute("href", animation + randomNumber);
}

const randomNumber = Math.floor(Math.random() * 1000) + 1;

function $(sel) {
  return document.querySelector(sel);
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop=false;
}

if( $("#enter_ballots") ) {
  $("#enter_ballots").addEventListener("click", function(){
    play_sound();
    $("#circle_text").classList.add("invis");
    $("#ballot_wrapper").classList.add("invis");
    $("#congrats").classList.remove("invis");
    $("#ttl1").classList.add("invis");
    $("#ttl2").classList.add("invis");
    $("#animation").classList.add("invis");
    setTimeout(function(){
      $("#game").style.minHeight = "500px";
      $("#more_ballots").classList.remove("invis");
    }, 1000);
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