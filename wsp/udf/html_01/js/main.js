let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  $("#ttl1").innerHTML = prizeData.description;
  $("#badge").setAttribute("src", prizeData.badge);
  $("#prize_block h2").innerHTML = prizeData.title;
  $("#prize").setAttribute("src", prizeData.prize);
  $("#prize_block h3").innerHTML = prizeData.subtitle;
  $("#note").innerHTML = prizeData.note;
  $("#prize_block h4").innerHTML = prizeData.more_info;
  $("#prize_bttn").innerHTML = prizeData.button;
}

function $(sel) {
  return document.querySelector(sel);
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop=false;
}

$("#start_bttn").addEventListener("click", function(){
  $("#initial_screen").classList.add("invis");
  setTimeout(function(){
    $("#initial_screen").classList.add("hidden");
    $("#animation").classList.remove("hidden");
  }, 300);
  setTimeout(function(){
    $("#animation").classList.remove("invis");
  }, 320);
  setTimeout(function(){
    $("#main").classList.add("play");
    $("#prize_block").classList.remove("hidden");
  }, 1000);
  setTimeout(function(){
    play_sound();
  }, 1800);
});