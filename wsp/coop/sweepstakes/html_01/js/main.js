let game_type;

// let request = new XMLHttpRequest();
// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();

// request.onload = function() {
//   const prizeData = request.response;
//     game_type = prizeData.game_type;
//     $("#gift_text").textContent = prizeData.box_message;
//     $("#giftcard_text").innerHTML = prizeData.prize;
//     $("#team_congrats_entries").innerHTML = prizeData.team_entries;
//     entries_amount = prizeData.entries_amount;
//     total_amount = entries_amount;
//     if (game_type == 3) {
//       $("#main_animation").classList.add("bonus");
//     }
//     if (game_type != 4) {
//       $("#team_sweepstakes").classList.add("invis");
//     } else {
//       $("#prize").setAttribute("xlink:href", "#coop");
//       $("#team_ttl").classList.remove("invis");
//     }
//     $("#coop_entries").innerHTML = prizeData.team_entries;

//     gstart();
// }

// setTimeout(function(){
//   for (i=1; i<=10; i++) {
//     $("#pin" + i).classList.replace("inactive", "active");
//   }
// }, 500);

setTimeout(function() {
  $("#pin1").classList.replace("inactive", "active");
}, 951);

setTimeout(function() {
  $("#moose").classList.add("animated");
}, 1602);

setTimeout(function() {
  $("#pin2").classList.replace("inactive", "active");
}, 1997);

setTimeout(function() {
  $("#flag").classList.add("animated");
}, 2511);

setTimeout(function() {
  $("#pin3").classList.replace("inactive", "active");
}, 3076);

setTimeout(function() {
  $("#pin4").classList.replace("inactive", "active");
}, 4156);

setTimeout(function() {
  $("#bear").classList.add("animated");
}, 4687);

setTimeout(function() {
  $("#pin5").classList.replace("inactive", "active");
}, 5227);

setTimeout(function() {
  $("#pin6").classList.replace("inactive", "active");
}, 5887);

setTimeout(function() {
  $("#pin7").classList.replace("inactive", "active");
}, 6315);

setTimeout(function() {
  $("#pin8").classList.replace("inactive", "active");
}, 7326);

setTimeout(function() {
  $("#beaver").classList.add("animated");
}, 7601);

setTimeout(function() {
  $("#pin9").classList.replace("inactive", "active");
}, 8389);

setTimeout(function() {
  $("#pin10").classList.replace("inactive", "active");
}, 9212);

function $(sel) {
  return document.querySelector(sel);
}

function gstart() {
  $("#content").classList.add("play");
  setTimeout(function(){
      $("#superbonus").classList.add("invis");
  }, 2730);
  setTimeout(function(){
    if(game_type == 2) {
      $("#info_giftcard").classList.remove("invis");
      $("#redeem_prizes").classList.remove("invis");
    } else if (game_type == 4) {
      $("#team_congrats").classList.remove("invis");
      $("#red_area").classList.remove("invis");
    } else {
      $("#assign").classList.remove("invis");
      $("#info_entries").classList.remove("invis");
    }
  }, 3500);
}
