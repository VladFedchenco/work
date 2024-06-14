let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  $("#prize_top").innerHTML = prizeData.top_headline;
  $("#prize").innerHTML = prizeData.amount;
  $("#prize_bottom").innerHTML = prizeData.botton_headline;
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop=false;
}

function $(sel) {
  return document.querySelector(sel);
}

function start_game() {
  $("#start_bttn").classList.add("invis");
  $("#hand").classList.add("invis");
  setTimeout(function(){
    play_sound();
    $("#game_circle").classList.remove("invis");
  }, 300);
  setTimeout(function(){
    $("#prize_wrapper").classList.remove("invis");
    $("#content").classList.remove("invis");
  }, 3000);
  setTimeout(function(){
    $("#bonus").classList.remove("invis");
  }, 3400);
  setTimeout(function(){
    $("#more_info").classList.remove("invis");
  }, 3600);
}

$("#start_bttn").addEventListener("click", start_game, false);