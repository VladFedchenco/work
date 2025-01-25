let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
    $("#town").setAttribute("src", prizeData.town);
    $("#prize_headline").innerHTML = prizeData.title;
    $("#prize_headline_small").innerHTML = prizeData.title;
    $("#prize_title").innerHTML = prizeData.prize;
    $("#prize_detail").innerHTML = prizeData.detail;
    $("#prize_img").setAttribute("src", prizeData.image);
    $("#prize_note").innerHTML = prizeData.note;
    
    let games = prizeData.game_plays;
    if (games > 0) {
      games == 1 ?  $("#game_plays").innerHTML = prizeData.game_plays + " game play" : $("#game_plays").innerHTML = prizeData.game_plays + " game plays";
    } else {
      $("#available_games").classList.add("hidden");
      $("#more_receipts").classList.remove("hidden");
    }

    if(prizeData.sweepstakes) {
      $("#prize_img").classList.add("sweepstake");
      $("#redeem").classList.add("hidden");
    }
}

function $(sel) {
  return document.querySelector(sel);
}

document.addEventListener("DOMContentLoaded", function(event) {
  setTimeout(function(){
    $("#hometown_logo").classList.remove("hidden");
  }, 50);
  setTimeout(function(){
    $("#town").classList.remove("hidden");
  }, 500);
  setTimeout(function(){
    $("#prize").classList.remove("hidden");
  }, 800);
  setTimeout(function(){
    $("#prize").classList.add("play");
  }, 1200);
  setTimeout(function(){
    $("#prize_content").classList.remove("hidden");
  }, 3600);
});