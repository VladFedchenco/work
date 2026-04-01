const randomNumber = Math.floor(Math.random() * 1000) + 1;

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  let ballots_img = prizeData.ballots_img;
  $("#ballots").setAttribute("src", ballots_img);
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
  }, 100);
  setTimeout(function(){
    $("#cap").classList.add("open");
  }, 300);
  setTimeout(function(){
    $("#wrapper").classList.add("invis");
    $("#prize").classList.remove("hidden");
  }, 2500);
  setTimeout(function(){
    $("#ballots").classList.add("reveal");
  }, 3400);
  setTimeout(function(){
    $("#prize").classList.add("full");
  }, 5000);
}

function $(sel) {
  return document.querySelector(sel);
}
