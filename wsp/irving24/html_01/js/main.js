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
    $("#game_circle").classList.remove("invis");
  }, 300);
  setTimeout(function(){
    play_sound();
  }, 800);
  setTimeout(function(){
    $("#prize_wrapper").classList.remove("invis");
  }, 3300);
}

$("#start_bttn").addEventListener("click", start_game, false);