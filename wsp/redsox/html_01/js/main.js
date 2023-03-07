let shoot = true;
let game_version = "";
let sound = "";

// let requestURL = 'js/data.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  switch (prizeData.prize_ID) {
    case 14000:
      game_version = "v0"
      break;
    case 14001:
      game_version = "v1"
      break;
    case 14002:
      game_version = "v2"
      break;
    case 14003:
      game_version = "v3"
      break;
    case 14004:
      game_version = "v4"
      break;
    default:
      game_version = ""
  }
    if(game_version != "v4" && game_version != "v3") {
      $("#after_01").classList.remove("invis");
      $("#available_plays").classList.remove("invis");
      sound = "mp3/cheer.mp3";
    }
    if(game_version == "v3") {
      $("#after_01").classList.remove("invis");
      $("#claim_prize").classList.remove("invis");
      sound = "mp3/cheer.mp3";
    }
    if(game_version == "v4") {
      $("#block_after").classList.add("alt");
      $("#after_02").classList.remove("invis");
      sound = "mp3/sad.mp3";
    }
    $("#sound").setAttribute("src", sound);
    $("#prize_h1").innerHTML = prizeData.h1;
    $("#prize_h2").innerHTML = prizeData.h2;
    $("#prize_h3").innerHTML = prizeData.h3;
}

function $(sel) {
  return document.querySelector(sel);
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop=false;
}

function gstart() {
  $("#game").classList.add(game_version);
  $("#hand").classList.add("invis");
  $("#hand_ttl").classList.add("invis");
  if(shoot) {
    shoot = false;
    $("#ready_to_play").classList.add("invis");
    $("#here_comes_the_ball").classList.remove("invis");
    setTimeout(function(){
      $("#pose1").classList.add("invis");
      $("#pose2").classList.remove("invis");
    }, 650);
    setTimeout(function(){
      play_sound();
      if(game_version != "v4") {
        $("#win_content").classList.remove("none");
      }
    }, 700);
    setTimeout(function(){
      $("#pose2").classList.add("invis");
      $("#pose3").classList.remove("invis");
    }, 720);
    setTimeout(function(){
      $("#here_comes_the_ball").classList.add("invis");
      if(game_version == "v0") {
        $("#you_hit_a_single").classList.remove("invis");
      }
      if(game_version == "v1") {
        $("#you_hit_a_double").classList.remove("invis");
      }
      if(game_version == "v2") {
        $("#you_hit_a_triple").classList.remove("invis");
      }
      if(game_version == "v3") {
        $("#home_run").classList.remove("invis");
      }
      if(game_version == "v4") {
        $("#you_grounded_out").classList.remove("invis");
      }
      if(game_version != "v4") {
        $("#win_content").classList.remove("invis");
      }
      $("#block_after").classList.remove("invis");
    }, 1700);
  }
}

$("#game").addEventListener("click", function(){
  gstart();
}, false);

$("#hand").addEventListener("click", function(){
  gstart();
}, false);