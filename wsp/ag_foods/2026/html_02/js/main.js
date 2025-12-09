let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
    numbers(prizeData.sweepstakes);
    setTimeout(function(){ $("#f21").classList.add("vis"); }, 1500);
    setTimeout(function(){ $("#f20").classList.add("vis"); }, 1550);
    setTimeout(function(){ $("#f19").classList.add("vis"); }, 1600);
    setTimeout(function(){ $("#f18").classList.add("vis"); }, 1650);
    setTimeout(function(){ $("#f17").classList.add("vis"); }, 1700);
    setTimeout(function(){ $("#f16").classList.add("vis"); }, 1750);
    setTimeout(function(){ $("#f15").classList.add("vis"); }, 1800);
    setTimeout(function(){ $("#f14").classList.add("vis"); }, 1850);
    setTimeout(function(){ $("#f13").classList.add("vis"); }, 1900);
    setTimeout(function(){ $("#f12").classList.add("vis"); }, 1950);
    setTimeout(function(){ $("#f11").classList.add("vis"); }, 2000);
    setTimeout(function(){ $("#f10").classList.add("vis"); }, 2050);
    setTimeout(function(){ $("#f9").classList.add("vis"); }, 2100);
    setTimeout(function(){ $("#f8").classList.add("vis"); }, 2150);
    setTimeout(function(){ $("#f7").classList.add("vis"); }, 2200);
    setTimeout(function(){ $("#f6").classList.add("vis"); }, 2250);
    setTimeout(function(){ $("#f5").classList.add("vis"); }, 2300);
    setTimeout(function(){ $("#f4").classList.add("vis"); }, 2350);
    setTimeout(function(){ $("#f3").classList.add("vis"); }, 2400);
    setTimeout(function(){ $("#f2").classList.add("vis"); }, 2450);
    setTimeout(function(){ $("#f1").classList.add("vis"); }, 2500);
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