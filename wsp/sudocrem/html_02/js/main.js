const randomNumber = Math.floor(Math.random() * 1000) + 1;

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  let ballots_img = prizeData.ballots_img;
  $("#ballots").setAttribute("src", ballots_img);
  if($("#ballot_text")) {
    $("#ballot_text").innerHTML = prizeData.ballots_amount;
  }
}

$("#start_bttn").addEventListener("click", function(){
  reveal();
});

$("#animation").addEventListener("click", function(){
  reveal();
});

function reveal() {
  $("#main").classList.add("play");
  setTimeout(function(){
    $("#confetti").setAttribute("href", "imgs/confetti.svg?v=" + randomNumber);
    $("#click_hand").classList.add("invis");
  }, 100);
  setTimeout(function(){
    $("#cap").classList.add("open");
  }, 300);
  setTimeout(function(){
    play_sound();
  }, 600);
  setTimeout(function(){
    $("#wrapper").classList.add("invis");
    $("#prize").classList.remove("hidden");
  }, 2500);
  setTimeout(function(){
    $("#ballots").classList.add("reveal");
  }, 3400);
  setTimeout(function(){
    $("#prize").classList.add("full");
  }, 3800);
}

function $(sel) {
  return document.querySelector(sel);
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop=false;
}