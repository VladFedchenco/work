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
    case 9010:
      game_version = "v1"
      break;
    case 9012:
      game_version = "v1"
      break;
    case 9014:
      game_version = "v1"
      break;
    case 9016:
      game_version = "v1"
      break;
    case 9011:
      game_version = "v2"
      break;
    case 9013:
      game_version = "v2"
      break;
    case 9015:
      game_version = "v2"
      break;
    case 9017:
      game_version = "v2"
      break;
    case 9020:
      game_version = "v3"
      break;
    case 9021:
      game_version = "v4"
      break;
    default:
      game_version = ""
  }
    if(game_version == "v1" || game_version == "v3") {
      $("#after_01").classList.remove("invis");
    } else if(game_version == "v2" || game_version == "v4") {
      $("#after_02").classList.remove("invis");
      $("#block_after").classList.add("alt");
    }
    if(game_version == "v1" || game_version == "v2") {
      sound = "mp3/sound_goal.mp3";
    } else if(game_version == "v3" || game_version == "v4") {
      sound = "mp3/sound_save.mp3";
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
    setTimeout(function(){
      play_sound();
    }, 700);
    setTimeout(function(){
      $("#win_content").classList.remove("invis");
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