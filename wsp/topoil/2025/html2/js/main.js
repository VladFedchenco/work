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
    gstart();
}

const randomNumber = Math.floor(Math.random() * 1000) + 1;

function $(sel) {
  return document.querySelector(sel);
}

function gstart() {
  $("#animation").classList.add("inactive");
  $("#sun").classList.add("set");
  $("#confetti").setAttribute("href", "imgs/confetti.svg?r=" + randomNumber);
  setTimeout(function(){
    $("#receipt").classList.add("active");
  }, 500);
  setTimeout(function(){
    $("#win_circle").classList.add("active");
    $("#ballots").classList.add("active");
  }, 1000);
  setTimeout(function(){
    $("#info").classList.add("active");
    if( $("#code") ) {
      $("#code").classList.add("active");
    }
  }, 1400);
}