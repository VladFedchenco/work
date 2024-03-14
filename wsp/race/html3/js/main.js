let allow_selection = true;
let car_selected = 0;
let place;
let members2x;
let random_boolean = Math.random() < 0.5;
let more_pin;

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
    place = prizeData.place;
    members2x = prizeData.members2x;
    $("#prize_h1").innerHTML = prizeData.prize_h1;
    $("#prize_h2").innerHTML = prizeData.prize_h2;
    more_pin = prizeData.more_pin;
}

function play_sound_select() {
  $("#sound_select").pause();
  $("#sound_select").currentTime = 0;
  $("#sound_select").play();
  $("#sound_select").loop=false;
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop=false;
}

function play_skip_sound() {
  $("#sound_skip").play();
  $("#sound_skip").loop=false;
}

function gstart() {
  clearSelection();
  $("#start_race").classList.remove("semitransparent");
  $("#skip").classList.remove("semitransparent");
}

function $(sel) {
  return document.querySelector(sel);
}

function clearSelection() {
  $("#car_orange").classList.remove("car_selected");
  $("#car_red").classList.remove("car_selected");
  $("#car_blue").classList.remove("car_selected");
  $("#smoke1").classList.remove("opaque");
  $("#smoke2").classList.remove("opaque");
  $("#smoke3").classList.remove("opaque");
}

$("#bttn_car_orange").addEventListener("click", function(){
  if(allow_selection) {
    play_sound_select();
    car_selected = 1;

    if(place == 1) {
      random_boolean ? $("#game").classList.add("orb") : $("#game").classList.add("obr");
    }
    if(place == 2) {
      random_boolean ? $("#game").classList.add("rob") : $("#game").classList.add("bor");
    }
    if(place == 3) {
      random_boolean ? $("#game").classList.add("rbo") : $("#game").classList.add("bro");
    }

    gstart();
    $("#car_orange").classList.add("car_selected");
    $("#smoke1").classList.add("visible");
    setTimeout(function(){
      $("#smoke1").classList.add("opaque");
    }, 50);
  }
}, false);

$("#bttn_car_red").addEventListener("click", function(){
  if(allow_selection) {
    play_sound_select();
    car_selected = 2;
    
    if(place == 1) {
      random_boolean ? $("#game").classList.add("rbo") : $("#game").classList.add("rob");
    }

    if(place == 2) {
      random_boolean ? $("#game").classList.add("bro") : $("#game").classList.add("orb");
    }

    if(place == 3) {
      random_boolean ? $("#game").classList.add("bor") : $("#game").classList.add("obr");
    }

    gstart();
    $("#car_red").classList.add("car_selected");
    $("#smoke2").classList.add("visible");
    setTimeout(function(){
      $("#smoke2").classList.add("opaque");
    }, 50);
  }
}, false);

$("#bttn_car_blue").addEventListener("click", function(){
  if(allow_selection) {
    play_sound_select();
    car_selected = 3;
    
    if(place == 1) {
      random_boolean ? $("#game").classList.add("bro") : $("#game").classList.add("bor");
    }

    if(place == 2) {
      random_boolean ? $("#game").classList.add("obr") : $("#game").classList.add("rbo");
    }

    if(place == 3) {
      random_boolean ? $("#game").classList.add("rob") : $("#game").classList.add("orb");
    }

    gstart();
    $("#car_blue").classList.add("car_selected");
    $("#smoke3").classList.add("visible");
    setTimeout(function(){
      $("#smoke3").classList.add("opaque");
    }, 50);
  }
}, false);

function prize_reveal() {
  $("#confetti").classList.add("visible");
  $("#prize_cup").classList.add("visible");
  $("#prize_flags").classList.add("visible");
  if(place == 1) {
   $("#prize_place1").classList.add("visible");
  }
  if(place == 2) {
   $("#prize_place2").classList.add("visible");
  }
  if(place == 3) {
   $("#prize_place3").classList.add("visible");
  }
  $("#prize_screen").classList.add("visible");
  if(members2x) {
   $("#prize_members").classList.add("visible");
  }
  $("#prize_text").classList.add("visible");
  if(more_pin) {
   $("#enter_pin").classList.add("visible");
   $("#info").classList.add("visible");
  } else {
   $("#claim_prize").classList.add("visible");
  }
}

$("#start_race").addEventListener("click", function(){
  if(car_selected) {
    play_sound();
    $("#top_logo").classList.add("invisible");
    $("#countdown").classList.remove("invisible");
    $("#countdown").classList.add("play");
    $("#start_race").classList.add("invisible");
    $("#skip").classList.add("invisible");
    $("#bttn_car_orange").classList.add("disabled");
    $("#bttn_car_red").classList.add("disabled");
    $("#bttn_car_blue").classList.add("disabled");
    $("#car_orange").classList.add("car_selected");
    $("#car_red").classList.add("car_selected");
    $("#car_blue").classList.add("car_selected");
    $("#smoke1").classList.add("visible");
    $("#smoke2").classList.add("visible");
    $("#smoke3").classList.add("visible");
    setTimeout(function(){
      $("#smoke1").classList.add("opaque");
      $("#smoke2").classList.add("opaque");
      $("#smoke3").classList.add("opaque");
    }, 50);
    setTimeout(function(){
      $("#car_orange").classList.add("go");
      $("#car_red").classList.add("go");
      $("#car_blue").classList.add("go");
      $("#track").classList.remove("invisible");
    }, 3000);
    setTimeout(function(){
      $("#track_cars").classList.add("play");
    }, 3300);
    setTimeout(function(){
      $("#smoke1").classList.remove("visible", "opaque");
      $("#smoke2").classList.remove("visible", "opaque");
      $("#smoke3").classList.remove("visible", "opaque");
    }, 4000);
    setTimeout(prize_reveal, 8300);
  }
}, false);

$("#skip").addEventListener("click", function(){
  if(car_selected) {
    play_skip_sound();
    $("#start_race").classList.add("invisible");
    $("#skip").classList.add("invisible");
    $("#track").classList.remove("invisible");
    $("#smoke1").classList.remove("visible", "opaque");
    $("#smoke2").classList.remove("visible", "opaque");
    $("#smoke3").classList.remove("visible", "opaque");
    prize_reveal();
  }
}, false);
