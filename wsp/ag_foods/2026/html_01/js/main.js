let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
    numbers(0);
    setTimeout(function(){ numbers(1) }, 1500);
    setTimeout(function(){ numbers(2) }, 1600);
    setTimeout(function(){ numbers(3) }, 1700);
    setTimeout(function(){ numbers(4) }, 1800);
    setTimeout(function(){ numbers(5) }, 1900);
    setTimeout(function(){ numbers(6) }, 2000);
    setTimeout(function(){ numbers(7) }, 2100);
    setTimeout(function(){ numbers(8) }, 2200);
    setTimeout(function(){ numbers(9) }, 2300);
    setTimeout(function(){ numbers(10) }, 2400);
    setTimeout(function(){ numbers(15) }, 2500);
    setTimeout(function(){ numbers(20) }, 2600);
    setTimeout(function(){ numbers(26) }, 2700);
    setTimeout(function(){ numbers(37) }, 2800);
    setTimeout(function(){ numbers(44) }, 2900);
    setTimeout(function(){ numbers(53) }, 3000);
    setTimeout(function(){ numbers(69) }, 3100);
    setTimeout(function(){ numbers(77) }, 3200);
    setTimeout(function(){ numbers(84) }, 3300);
    setTimeout(function(){ numbers(prizeData.sweepstakes) }, 3400);
    $("#text_num").innerHTML = prizeData.sweepstakes;
    gstart();
}

function numbers(num) {
  for(let i=1; i<=21; i++) {
    let el = "#f"+i;
    $(el).textContent = num;
  }
}

function $(sel) {
  return document.querySelector(sel);
}

function gstart() {
  $("#animation").classList.add("play");
  setTimeout(function(){
      $("#sweepstakes").classList.remove("invis");
      $(".pin_button").classList.remove("invis");
  }, 3500);
  setTimeout(function(){
      $("#details").classList.remove("invis");
  }, 3800);
}