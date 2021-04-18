let requestURL = 'js/data.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  $("#main_banner img").setAttribute("src", prizeData.main_banner);
  $("#win_h3").innerText = prizeData.h1;
  $("#win_h2").innerText = prizeData.prize_name;
  $("#win_subttl").innerText = prizeData.h2;
  $("#win_img").setAttribute("src", prizeData.prize_id + ".png");
  $("#win_note span").innerText = prizeData.h3;
  $("#win_plus_img1").setAttribute("src", prizeData.sticker_1);
  $("#win_plus_img2").setAttribute("src", prizeData.sticker_2);
}

function $(sel) {
  return document.querySelector(sel);
}

$("#main_banner").onclick = function() {
  $("#curl_animation").setAttribute("class", "c_play");
  $("#pointer-block").setAttribute("class", "hidden");
  $("#click_to_open").setAttribute("class", "hidden");

  setTimeout(function(){
    $("#main").setAttribute("class", "hide");
    $("#winning").setAttribute("class", "disp");
    setTimeout(function(){
      $("#main").setAttribute("class", "hide invis");
      $("#winning").setAttribute("class", "disp visible");
    }, 50);
  }, 700);
}

$("#full_details").onclick = function() {
  $("#popup").setAttribute("class", "disp");
  setTimeout(function(){
    $("#popup").setAttribute("class", "disp visible");
  }, 50);
}

$("#popup_close").onclick = function() {
  $("#popup").setAttribute("class", "disp");
  setTimeout(function(){
    $("#popup").setAttribute("class", "");
  }, 50);
}