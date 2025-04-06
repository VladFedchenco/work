let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
    $("#ballots h2").innerHTML = prizeData.ballots;
}

function $(sel) {
  return document.querySelector(sel);
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop = false;
}

function gstart() {
  // play_sound();
  $("#animation").classList.add("inactive");
  $("#hand").classList.add("invis");
  $("#tap").classList.add("invis");
  $("#fuel").classList.add("invis");
  $("#win").classList.add("invis");
  $("#sun").classList.add("set");
  $("#digits").classList.add("move");
  $("#winner").classList.add("win9");
  setTimeout(function(){
    $("#confetti").setAttribute("href", "imgs/confetti.svg");
  }, 3800);
  setTimeout(function(){
    $("#station").classList.add("invis");
  }, 4800);
  setTimeout(function(){
    $("#receipt").classList.add("active");
  }, 5100);
  setTimeout(function(){
    $("#win_circle").classList.add("active");
    $("#ballots").classList.add("active");
  }, 5600);
  setTimeout(function(){
    $("#info").classList.add("active");
    $("#code").classList.add("active");
  }, 6100);
}

$("#animation").addEventListener("click", function(){
  gstart();
}, false);