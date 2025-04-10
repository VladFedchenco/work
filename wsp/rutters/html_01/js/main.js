let start = true;
let prize_ID;
let game_type;

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  prize_ID = prizeData.prize_ID;
  game_type = prizeData.game_type;
  $("#headline").innerHTML =  prizeData.headline;
  $("#prize").setAttribute("src", prizeData.img);
  $("#title").innerHTML =  prizeData.title;
  $("#subtitle").innerHTML =  prizeData.subtitle;
  $("#note").innerHTML =  prizeData.note;
  $("#info").innerHTML =  prizeData.info;
}

function $(sel) {
  return document.querySelector(sel);
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop = false;
}

$("#pump").addEventListener("click", function(){
  $("#hand").classList.add("invis");
  $("#spin_bttn").classList.add("invis");
  $("#coins").classList.add("invis");
  $("#prize_01").classList.add("a" + prize_ID + "_1");
  $("#prize_02").classList.add("a" + prize_ID + "_2");
  $("#prize_03").classList.add("a" + prize_ID + "_3");
  if(start) {
    start = false;
    play_sound();
    $("#handle_01").classList.add("invis");
    $("#handle_02").classList.remove("invis");
    $("#pump").classList.add("clicked");
    setTimeout(function(){
      $("#handle_01").classList.remove("invis");
      $("#handle_02").classList.add("invis");
    }, 400);
    setTimeout(function(){
      $("#main_popup").classList.remove("invis");
      $("#message_frame").classList.add("anim");
      if(game_type == 1) {
        $("#message_options").classList.add("anim");
      }
      if(game_type == 2) {
        $("#participating_product").classList.remove("invis");
        $("#more_chances").classList.add("anim");
      }
      if(game_type == 3) {
        $("#redeem_bttn").classList.remove("invis");
      }
    }, 6500);
  }
}, false);

