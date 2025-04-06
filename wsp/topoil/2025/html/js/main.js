// let request = new XMLHttpRequest();
// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();

// request.onload = function() {
//   const prizeData = request.response;
//     $("#entries").innerHTML = prizeData.entries;
//     $("#prize").setAttribute("href", prizeData.prize_id);
// }

function $(sel) {
  return document.querySelector(sel);
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop=false;
}

function gstart() {
  // play_sound();
  $("#animation").style.cursor = "default";
  $("#animation").style.pointerEvents = "none";
  $("#hand").classList.add("invis");
  $("#tap").classList.add("invis");
  $("#fuel").classList.add("invis");
  $("#win").classList.add("invis");
  $("#sun").classList.add("set");
  $("#digits").classList.add("move");
  $("#winner").classList.add("win9");
  setTimeout(function(){
    $("#station").classList.add("invis");
  }, 5000);
  setTimeout(function(){
    $("#receipt").classList.add("active");
  }, 5300);
  setTimeout(function(){
    $("#win_circle").classList.add("active");
    $("#ballots").classList.add("active");
  }, 5800);
  setTimeout(function(){
    $("#info").classList.add("active");
    $("#code").classList.add("active");
  }, 6300);
  setTimeout(function(){
    $("#confetti").setAttribute("href", "imgs/confetti.svg");
  }, 7000);
}

$("#animation").addEventListener("click", function(){
  gstart();
}, false);