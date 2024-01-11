let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
    $("#entries").innerHTML = prizeData.entries;
    $("#prize").setAttribute("href", prizeData.prize_id);
}

function $(sel) {
  return document.querySelector(sel);
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop=false;
}

function gstart() {
  play_sound();
  $("#animated_parts").classList.add("animated");
  $("#start").classList.add("invis");
  $("#animation").style.cursor = "default";
  setTimeout(function(){
    $("#content").classList.remove("invis");
  }, 7000);
}

$("#start").addEventListener("click", function(){
  gstart();
}, false);

$("#animation").addEventListener("click", function(){
  gstart();
}, false);