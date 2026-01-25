let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  $("#reveal_block h2").innerHTML = prizeData.title;
  $("#box img").setAttribute("src", prizeData.image);
  $("#reveal_block h4").innerHTML = prizeData.game_plays;
  if(!prizeData.sweepstakes) {    
    $("#reveal_block h3").innerHTML = prizeData.prize;
    $("#detail").innerHTML = prizeData.detail;
    $("#note").innerHTML = prizeData.note;
    if(!prizeData.more_plays) {
      $("#line2").classList.remove("invis");
    }
  } else {
    $("#prize_box").classList.add("active");
    $("#sweepstakes").innerHTML = prizeData.prize;
    $("#entries").innerHTML = prizeData.detail;
    $("#redeem").classList.add("invis");
  }
  if(!prizeData.more_plays) {
    $("#more_plays").classList.add("invis");
    $("#more_chances").classList.remove("invis");
  }
}

function $(sel) {
  return document.querySelector(sel);
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop=false;
}

$("#animation").addEventListener("click", function(){
  $("#content").classList.add("play");
  $("#click").classList.add("invis");
  $("#animation_block h1").classList.add("invis");
  $("#animation_block h3").classList.add("invis");
  setTimeout(function(){
    $("#animation_block").classList.add("hidden");
    $("#reveal_block").classList.add("visible");
    play_sound();
  }, 3000);
});