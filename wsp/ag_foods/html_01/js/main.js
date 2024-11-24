let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
    $(".font1").textContent = prizeData.sweepstakes;
    $(".font2").textContent = prizeData.sweepstakes;
    $(".font3").textContent = prizeData.sweepstakes;
    $("#text_num").innerHTML = prizeData.sweepstakes;

    gstart();
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