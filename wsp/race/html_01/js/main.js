/*

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
    $("#entries").innerHTML = prizeData.entries;
    $("#prize").setAttribute("href", prizeData.prize_id);
}

function $(sel) {
  return document.querySelector(sel);
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop=false;
}

function gstart() {
  play_sound();
  $("#animated_parts").classList.add("animated");
  $("#start").classList.add("invis");
  $("#animation").style.cursor = "default";
  $("#animation").style.pointerEvents = "none";
  setTimeout(function(){
    $("#content").classList.remove("invis");
  }, 3500);
}

$("#start").addEventListener("click", function(){
  gstart();
}, false);

$("#animation").addEventListener("click", function(){
  gstart();
}, false);

*/

let allow_selection = true;
let car_selected = 0;

function $(sel) {
  return document.querySelector(sel);
}

function clearSelection() {
  $("#car_orange").classList.remove("car_selected");
  $("#car_red").classList.remove("car_selected");
  $("#car_blue").classList.remove("car_selected");
  $("#smoke1").classList.remove("opaque");
  $("#smoke2").classList.remove("opaque");
  $("#smoke3").classList.remove("opaque");
}

$("#bttn_car_orange").addEventListener("click", function(){
  if(allow_selection) {
    car_selected = 1;
    clearSelection();
    $("#start_race").classList.remove("semitransparent");
    $("#skip").classList.remove("semitransparent");
    $("#car_orange").classList.add("car_selected");
    $("#smoke1").classList.add("visible");
    setTimeout(function(){
      $("#smoke1").classList.add("opaque");
    }, 50);
  }
}, false);

$("#bttn_car_red").addEventListener("click", function(){
  if(allow_selection) {
    car_selected = 2;
    clearSelection();
    $("#start_race").classList.remove("semitransparent");
    $("#skip").classList.remove("semitransparent");
    $("#car_red").classList.add("car_selected");
    $("#smoke2").classList.add("visible");
    setTimeout(function(){
      $("#smoke2").classList.add("opaque");
    }, 50);
  }
}, false);

$("#bttn_car_blue").addEventListener("click", function(){
  if(allow_selection) {
    car_selected = 3;
    clearSelection();
    $("#start_race").classList.remove("semitransparent");
    $("#skip").classList.remove("semitransparent");
    $("#car_blue").classList.add("car_selected");
    $("#smoke3").classList.add("visible");
    setTimeout(function(){
      $("#smoke3").classList.add("opaque");
    }, 50);
  }
}, false);

$("#start_race").addEventListener("click", function(){
  if(car_selected) {
    $("#top_logo").classList.add("invisible");
    $("#countdown").classList.remove("invisible");
    $("#countdown").classList.add("play");
    $("#start_race").classList.add("invisible");
    $("#skip").classList.add("invisible");
    $("#bttn_car_orange").classList.add("disabled");
    $("#bttn_car_red").classList.add("disabled");
    $("#bttn_car_blue").classList.add("disabled");
    $("#car_orange").classList.add("car_selected");
    $("#car_red").classList.add("car_selected");
    $("#car_blue").classList.add("car_selected");
    $("#smoke1").classList.add("visible");
    $("#smoke2").classList.add("visible");
    $("#smoke3").classList.add("visible");
    setTimeout(function(){
      $("#smoke1").classList.add("opaque");
      $("#smoke2").classList.add("opaque");
      $("#smoke3").classList.add("opaque");
    }, 50);
    setTimeout(function(){
      $("#track").classList.remove("invisible");
    }, 3000);
    setTimeout(function(){
      $("#smoke1").classList.remove("visible", "opaque");
      $("#smoke2").classList.remove("visible", "opaque");
      $("#smoke3").classList.remove("visible", "opaque");
    }, 4000);
  }
}, false);
