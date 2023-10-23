// let request = new XMLHttpRequest();
// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();

// request.onload = function() {
//   const prizeData = request.response;
//     $("#prize_h1").innerHTML = prizeData.h1;
//     $("#prize_img").setAttribute("href", prizeData.prize_id);
//     $("#prize_name").innerHTML = prizeData.prize_name;
//     $("#size").innerHTML = prizeData.size;
//     $("#parize_h3").innerHTML = prizeData.h3;
//     $("#chance").innerHTML = prizeData.chance;
//     if(prizeData.game_type == 1) {
//       $("#more_chances").classList.add("invis");
//     }
//     if(prizeData.game_type == 2) {
//       $("#again_bttn").classList.add("invis");
//     }
// }

function $(sel) {
  return document.querySelector(sel);
}

// function play_sound() {
//   $("#sound").play();
//   $("#sound").loop=false;
// }

// function gstart() {
//   play_sound();
//   $("#main").classList.remove("static");
//   $("#main").classList.add("play");
//   $("#start_bttn").classList.add("invis");
//   setTimeout(function(){
//     $("#prize").classList.remove("invis");
//     $("#prize_h1").classList.add("vis");
//   }, 5000);
//   setTimeout(function(){
//     $("#snowflakes").classList.add("invis");
//     $("#shake_flakes").classList.add("invis");
//     $("#hidden_content").classList.add("vis");
//   }, 6000);
//   setTimeout(function(){
//     $("#main").classList.remove("play");
//     $("#hidden_content").classList.add("open");
//   }, 7000);
// }

function gstart() {
  $("#intro").classList.add("invis");
  $("#content").classList.add("play");
  $("#main_animation").classList.remove("invis");
}

$("#bttn_submit").addEventListener("click", function(){
  gstart();
}, false);