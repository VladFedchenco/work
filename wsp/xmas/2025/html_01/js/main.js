let game_type, entries;

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  game_type = prizeData.game_type;
  $("#prize_h1").innerHTML = prizeData.h1;
  $("#prize_img").setAttribute("href", prizeData.prize_id);
  $("#prize_name").innerHTML = prizeData.prize_name;
  $("#size").innerHTML = prizeData.size;
  $("#prize_h3").innerHTML = prizeData.h3;
  $("#chance").innerHTML = prizeData.chance;
  if(game_type == 2) {
    $("#again_bttn").classList.add("invis");
  } else {
    $("#more_chances").classList.add("invis");
  }
  switch(prizeData.entries) {
    case 10:
      entries = "num10";
      break;
    case 20:
      entries = "num20";
      break;
    case 30:
      entries = "num30";
      break;
    case 40:
      entries = "num40";
      break;
    case 50:
      entries = "num50";
      break;
    default:
      entries = "";
      break;
  }
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

function gstart() {
  if(game_type == 1 || game_type == 2) {
    play_sound();
    $("#ticket").classList.add("invis");
  } else {
    play_sound2();
    $("#size").classList.add("invis");
    $("#prize_h3").classList.add("invis");
  }
  $("#main").classList.remove("static");
  $("#main").classList.add("play");
  $("#start_bttn").classList.add("invis");
  setTimeout(function(){
    $("#glass_shadow").classList.add("invis");
    $("#prize").classList.remove("invis");
    if(game_type == 3 || game_type == 4 ) {
      $("#prize").classList.add("num");
    }
    $("#prize_h1").classList.add("vis");
  }, 5000);
  setTimeout(function(){
    $("#snowflakes").classList.add("invis");
    $("#shake_flakes").classList.add("invis");
    $("#hidden_content").classList.add("vis");
  }, 6000);
  if(game_type == 3 || game_type == 4 ) {
    setTimeout(function(){
      $("#prize_h1").classList.remove("vis");
      $("#prize").classList.add(entries);
      $("#num_animation").classList.remove("invis");
      $("#gift_box").classList.add("invis");
      game_type == 3 ? $("#prize_money").classList.remove("invis") : $("#prize_car").classList.remove("invis");
    }, 6800);
  }
  if(game_type == 1 || game_type == 2 ) {
    setTimeout(function(){
      $("#main").classList.remove("play");
      $("#hidden_content").classList.add("open");
    }, 7000);
  } else {
    setTimeout(function(){
      $("#prize_h1").innerHTML = "You’ve Earned:";
      $("#prize_h1").classList.add("vis");
      $("#main").classList.remove("play");
      $("#hidden_content").classList.add("open");
    }, 8400);
  }
}

$("#start_bttn").addEventListener("click", function(){
  gstart();
}, false);

$("#animation").addEventListener("click", function(){
  gstart();
}, false);