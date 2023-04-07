let play_game = true;
let prize_ID;
let requestURL;

let url_string = window.location.href; 
let url = new URL(url_string);
let v = url.searchParams.get("v");

if(v >= 3010 && v<= 3034) {
  requestURL = 'js/data_' + v + '.json';
} else {
  requestURL = 'js/data.json';
}

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  prize_ID = prizeData.prize_ID;
  $("#select_prize1").setAttribute("src", prizeData.img1);
  $("#prize_ttl1").innerHTML =  prizeData.title1;
  $("#prize_sub1").innerHTML =  prizeData.subtitle1;
  $("#select_prize2").setAttribute("src", prizeData.img2);
  $("#prize_ttl2").innerHTML =  prizeData.title2;
  $("#prize_sub2").innerHTML =  prizeData.subtitle2;
}

$("#bttn_prize1").addEventListener("click", function(){
  prize_selection(1);
}, false);

$("#bttn_prize2").addEventListener("click", function(){
  prize_selection(2);
}, false);

$("#game").addEventListener("click", function(){
  if(play_game && prize_ID >= 3010 && prize_ID <= 3034) {
    gstart();
    $("#game").classList.add("played");
    play_game = false;
  }
}, false);

function $(sel) {
  return document.querySelector(sel);
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop = false;
}

function gstart() {
  play_sound();
  $("#handle1").classList.add("invis");
  $("#handle2").classList.remove("invis");
  $("#initial").classList.add("initial");
  $("#prize1").classList.add("a" + prize_ID + "_1");
  $("#prize2").classList.add("a" + prize_ID + "_2");
  $("#info_before").classList.add("transp");
  setTimeout(function(){
    $("#handle1").classList.remove("invis");
    $("#handle2").classList.add("invis");
    $("#info_before").classList.add("invis");
    $("#info_after").classList.remove("invis");
  }, 400);
  setTimeout(function(){
    $("#game").classList.add("transparent");
    $("#info").classList.remove("transp");
    $("#info_after").classList.remove("transp");
    $("#prizes").classList.add("ready");
  }, 8000);
}

function prize_selection(id) {
  $("#bttn_prize1").classList.add("inactive")
  $("#bttn_prize2").classList.add("inactive")
  $("#loader").classList.remove("invis");
  $("body").style.position = "fixed";
  setTimeout(function(){
    $("#loader").classList.add("invis");
    $("body").removeAttribute("style");
    $("#info h2").innerHTML =  "CONGRATULATIONS!";
    $("#info h3").innerHTML =  "Your prize:";
    $("#prizes").classList.add("invis");
    $("#prizes").classList.remove("ready");
    $("#prizes").classList.add("splash");
    id == 1 ? $("#bttn_prize2").classList.add("invis") : $("#bttn_prize1").classList.add("invis");
    $("#info_after").classList.add("invis");
    setTimeout(function(){
      $("#prizes").classList.remove("invis");
      setTimeout(function(){
        $("#prizes").classList.add("ready");
        $("#vendors").classList.add("visible");
      }, 50);
    }, 50);
  }, 2000);
}