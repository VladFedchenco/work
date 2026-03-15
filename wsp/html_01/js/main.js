let clmn1_amount = 0, clmn2_amount = 0, clmn3_amount = 0, clmn4_amount = 0, clmn5_amount = 0, clmn6_amount = 0, total_amount, ballots_amount;

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  ballots_amount = prizeData.ballots_amount;
  total_amount = ballots_amount;
  const game_type = prizeData.game_type;
  $("#box_ballots").innerHTML = prizeData.ballots_amount;
  $("#ballots").innerHTML = prizeData.ballots;
  $("#ballot_enter").innerHTML = prizeData.ballot_enter;

  $("#game").classList.add("play");
  setTimeout(function(){
    $("#animation_wrapper").classList.remove("invis");
  }, 700);
  setTimeout(function(){
    $("#fireworks").setAttribute("src", "imgs/fireworks.svg?v=" + randomNumber);
  }, 1100);
  setTimeout(function(){
    $("#box_ballots").classList.add("vis");
    $("#box_giveaway").classList.add("vis");
  }, 1300);
  setTimeout(function(){
    $("#ballot_title").classList.remove("invis");
  }, 2000);
}

const randomNumber = Math.floor(Math.random() * 1000) + 1;


if( $("#enter_ballots") ) {
  $("#enter_ballots").addEventListener("click", function(){
    play_sound();
    // $("#ballot_wrapper").classList.add("invis");
    // $("#congrats").classList.remove("invis");
    $("#ttl1").classList.add("invis");
    $("#animation_wrapper").classList.add("invis");
    $("#ballot_title").classList.add("invis");
    $("#enter_ballots").classList.add("invis");
    const elements1 = document.querySelectorAll('.counter_left');
    elements1.forEach(element => {
      element.classList.add('invis');
    });
    const elements2 = document.querySelectorAll('.counter_right');
    elements2.forEach(element => {
      element.classList.add('invis');
    });
    setTimeout(function(){
      $("#enter_ballots").classList.add("hide");
      $("#ballot_wrapper").classList.add("move");
      $("#ttl2").classList.add("visible");
    }, 400);
    setTimeout(function(){
      $("#game").style.minHeight = "540px";
      $("#more_ballots").classList.remove("invis");
    }, 1000);
  }, false);
}


let field1 = $("#clmn1_amount"), field2 = $("#clmn2_amount"), field3 = $("#clmn3_amount"), field4 = $("#clmn4_amount"), field5 = $("#clmn5_amount"), field6 = $("#clmn6_amount");


if( $("#enter_ballots") ) {

  $("#c1_plus").addEventListener("click", () => {
    clmn1_amount = amount_plus(clmn1_amount);
    counterBttnPlus(clmn1_amount, field1);
  }, false);

  $("#c1_minus").addEventListener("click", () => {
    clmn1_amount = amount_minus(clmn1_amount);
    counterBttnMinus(clmn1_amount, field1);
  }, false);

  $("#c2_plus").addEventListener("click", () => {
    clmn2_amount = amount_plus(clmn2_amount);
    counterBttnPlus(clmn2_amount, field2);
  }, false);

  $("#c2_minus").addEventListener("click", () => {
    clmn2_amount = amount_minus(clmn2_amount);
    counterBttnMinus(clmn2_amount, field2);
  }, false);

  $("#c3_plus").addEventListener("click", () => {
    clmn3_amount = amount_plus(clmn3_amount);
    counterBttnPlus(clmn3_amount, field3);
  }, false);

  $("#c3_minus").addEventListener("click", () => {
    clmn3_amount = amount_minus(clmn3_amount);
    counterBttnMinus(clmn3_amount, field3);
  }, false);

  $("#c4_plus").addEventListener("click", () => {
    clmn4_amount = amount_plus(clmn4_amount);
    counterBttnPlus(clmn4_amount, field4);
  }, false);

  $("#c4_minus").addEventListener("click", () => {
    clmn4_amount = amount_minus(clmn4_amount);
    counterBttnMinus(clmn4_amount, field4);
  }, false);

  $("#c5_plus").addEventListener("click", () => {
    clmn5_amount = amount_plus(clmn5_amount);
    counterBttnPlus(clmn5_amount, field5);
  }, false);

  $("#c5_minus").addEventListener("click", () => {
    clmn5_amount = amount_minus(clmn5_amount);
    counterBttnMinus(clmn5_amount, field5);
  }, false);

  $("#c6_plus").addEventListener("click", () => {
    clmn6_amount = amount_plus(clmn6_amount);
    counterBttnPlus(clmn6_amount, field6);
  }, false);

  $("#c6_minus").addEventListener("click", () => {
    clmn6_amount = amount_minus(clmn6_amount);
    counterBttnMinus(clmn6_amount, field6);
  }, false);

}


$("#popup_info1").addEventListener("click", () => {
  $("#popup_bg").classList.remove("invis");
}, false);
$("#popup_info2").addEventListener("click", () => {
  $("#popup_bg").classList.remove("invis");
}, false);
$("#popup_info3").addEventListener("click", () => {
  $("#popup_bg").classList.remove("invis");
}, false);
$("#popup_info4").addEventListener("click", () => {
  $("#popup_bg").classList.remove("invis");
}, false);
$("#popup_info5").addEventListener("click", () => {
  $("#popup_bg").classList.remove("invis");
}, false);
$("#popup_info6").addEventListener("click", () => {
  $("#popup_bg").classList.remove("invis");
}, false);

$("#close_bttn").addEventListener("click", () => {
  $("#popup_bg").classList.add("invis");
}, false);
$("#close_bttn2").addEventListener("click", () => {
  $("#popup_bg").classList.add("invis");
}, false);

function $(sel) {
  return document.querySelector(sel);
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop=false;
}

function counterBttnPlus(a, f) {
  f.innerHTML = a;
  if(ballots_amount == 0) {
    $("#enter_ballots").classList.remove("inactive");
    $("#enter_ballots").innerHTML = "CONTINUE";
  }
}

function counterBttnMinus(a, f) {
  f.innerHTML = a;
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