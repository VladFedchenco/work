let total_amount, ballots_amount;
let clmn_amount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let fields = [$("#c1"), $("#c2"), $("#c3"), $("#c4"), $("#c5"), $("#c6"), $("#c7"), $("#c8"), $("#c9"), $("#c10"), $("#c11"), $("#c12")];
let labels = [$("#l1"), $("#l2"), $("#l3"), $("#l4"), $("#l5"), $("#l6"), $("#l7"), $("#l8"), $("#l9"), $("#l10"), $("#l11"), $("#l12")];
const p = document.querySelectorAll('.bttn_plus');
const m = document.querySelectorAll('.bttn_minus');

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  ballots_amount = prizeData.ballots_amount;
  total_amount = ballots_amount;
  $("#entries_left").innerHTML = ballots_amount;
  switch (ballots_amount) {
    case 2:
      $("#ballot_amount").setAttribute("src", "imgs/ballot_2.png");
    break;
    case 5:
      $("#ballot_amount").setAttribute("src", "imgs/ballot_5.png");
    break;
    case 10:
      $("#ballot_amount").setAttribute("src", "imgs/ballot_10.png");
    break;
  }
}

function onCompleteHandler() {
  anim.playSegments([0, 99], true);
}

anim.addEventListener('DOMLoaded', function() {
  anim.playSegments([0, 99], true);
  anim.addEventListener('complete', onCompleteHandler);
  $("#lottie").addEventListener("click", () => {

    $("#lottie").classList.add("clicked");
    $("#aleva_logo").classList.add("clicked");

    anim.removeEventListener('complete', onCompleteHandler);
    anim.playSegments([100, 238], true);

    setTimeout(function(){
      play_sound("#sound");
    }, 100);

    setTimeout(function(){
      play_sound("#sound2");
      if(ballots_amount == 1) {
        $("#prize").classList.remove("hidden");
      } else {
        $("#ballot_init").classList.remove("hidden");
      }
    }, 4000);

    setTimeout(function(){
      if(ballots_amount == 1) {
        $("#prize").classList.add("full");
      } else {
        $("#ballot_items").classList.remove("hidden");
      }
    }, 5000);

  }, false);
});

for (let i = 0; i < 12; i++) {
  (function(index) {
    let amount = clmn_amount[index];
    let field = fields[index];
    let label = labels[index];

    p[index].addEventListener("click", () => {
      amount = amount_plus(amount);
      counterBttnPlus(amount, field, label);
    }, false);

    m[index].addEventListener("click", () => {
      amount = amount_minus(amount);
      counterBttnMinus(amount, field, label);
    }, false);
  })(i);
}

$("#enter_ballots").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
  play_sound("#sound2");
  for (let i = 0; i < 12; i++) {
    p[i].classList.add("invis");
    m[i].classList.add("invis");
  }
  $("#ballots_bottom").classList.add("hidden");
  $("#ballots_available").classList.remove("hidden");
  $("#ballot_init").classList.add("hidden");
  setTimeout(function(){
    $("#ballots_available").classList.remove("invis");
    $("#ballots_bottom").classList.add("invis");
    $("#congrats").classList.remove("hidden");
  }, 100);
}, false);

function play_sound(s) {
  $(s).play();
  $(s).loop=false;
}

function $(sel) {
  return document.querySelector(sel);
}

function counterBttnPlus(a, f, l) {
  f.innerHTML = a;
  if(a == 1) {
    l.innerHTML = "BALLOT"
  } else {
    l.innerHTML = "BALLOTS"
  }
  $("#entries_left").innerHTML = ballots_amount;
  if(ballots_amount == 0) {
    $("#enter_ballots").classList.remove("disable");
  }
}

function counterBttnMinus(a, f, l) {
  f.innerHTML = a;
  if(a == 1) {
    l.innerHTML = "BALLOT"
  } else {
    l.innerHTML = "BALLOTS"
  }
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
