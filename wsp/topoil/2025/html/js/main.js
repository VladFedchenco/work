let win = "win0";
let game_type = 1;

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
    $("#bllt").innerHTML = prizeData.ballots;
    game_type = prizeData.game_type;
    win = "win" + prizeData.ballots;
    if(game_type == 2) {
      $("#bllt_x10").innerHTML = prizeData.ballots * 10;
      $("#sound source").setAttribute("src", "audio/sound_10x.mp3");
    }
}

const randomNumber = Math.floor(Math.random() * 1000) + 1;

function $(sel) {
  return document.querySelector(sel);
}

function play_sound() {
  $("#sound").load();
  $("#sound").play();
  $("#sound").loop = false;
}

function gstart() {
  play_sound();
  $("#animation").classList.add("inactive");
  $("#hand").classList.add("invis");
  $("#tap").classList.add("invis");
  $("#fuel").classList.add("invis");
  $("#win").classList.add("invis");
  $("#sun").classList.add("set");
  $("#digits").classList.add("move");
  $("#winner").classList.add(win);
  setTimeout(function(){
    $("#confetti").setAttribute("href", "imgs/confetti.svg?r=" + randomNumber);
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
  if(game_type == 2) {
    setTimeout(function(){
      $("#x10").classList.add("active");
    }, 7000);
    setTimeout(function(){
      $("#bllt").classList.add("invis");
      $("#bllt_x10").classList.remove("invis");
    }, 7800);
  }
}

$("#animation").addEventListener("click", function(){
  gstart();
}, false);