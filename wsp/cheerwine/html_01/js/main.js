let clmn1_amount = 0, clmn2_amount = 0, clmn3_amount = 0, clmn4_amount = 0, total_amount, ballots_amount, bonus;

const randomNumber = Math.floor(Math.random() * 1000) + 1;

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  ballots_amount = prizeData.ballots_amount;
  total_amount = ballots_amount;
  bonus = prizeData.bonus;
  $("#prize_image").setAttribute("src", prizeData.prize_image);
  $("#prize_title").innerHTML = prizeData.prize_title;
  $("#prize_info").innerHTML = prizeData.prize_info;
  $("#ballots_amount").innerHTML = total_amount;
}

$("#bottle").addEventListener("click", function() {
  play_sound();
  $("#bubbles").setAttribute("href", "imgs/bubbles.svg?v=" + randomNumber);
  $("#bottle").classList.add("play");
  $("#logo_promotion").classList.add("invis");
  $("#click").classList.add("invis");
  $("#initial_title").classList.add("invis");
  setTimeout(function(){
    $("#bottle").classList.add("invis");
  }, 2000);
  setTimeout(function(){
    $("#bottle").classList.add("hidden");
    $("#logo_promotion").classList.add("hidden");
    $("#click").classList.add("hidden");
    $("#initial_title").classList.add("hidden");
    $("#win_block").classList.add("play");
  }, 2300);
  setTimeout(function(){
    $("#prize_image").classList.remove("invis");
  }, 2500);
  setTimeout(function(){
    $("#prize_title").classList.remove("invis");
    $("#prize_info").classList.remove("invis");
  }, 2900);
  setTimeout(function(){
    if (ballots_amount) {
      if(bonus) {
        $(".bttn_blue").classList.remove("invis");
      } else {
        $("#ballot_wrapper").classList.remove("invis");
      }
    } else {
      $(".bttn_blue").classList.remove("invis");
    }
    if(bonus) {
        $("#bttm_links").classList.remove("invis");
    }
  }, 3300);
});

if( $("#enter_ballots") ) {
  $("#enter_ballots").addEventListener("click", function(){
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    
    play_sound2();

    $("#ttl").classList.add("invis");
    $("#enter_ballots").classList.add("invis");
    $("#top_block").classList.add("invis");
    $("#win_block").classList.add("congrats");

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
      $("#congrats_top").classList.remove("invis");
      $("#bttm_links").classList.remove("invis");
    }, 400);

  }, false);
}


let field1 = $("#clmn1_amount"), field2 = $("#clmn2_amount"), field3 = $("#clmn3_amount"), field4 = $("#clmn4_amount");


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
}

function $(sel) {
  return document.querySelector(sel);
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop=false;
}

function play_sound2() {
  $("#sound2").play();
  $("#sound2").loop=false;
}

function counterBttnPlus(a, f) {
  f.innerHTML = a;
  if(ballots_amount == 0) {
    $("#enter_ballots").classList.remove("inactive");
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