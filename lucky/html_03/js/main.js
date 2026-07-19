/* document.addEventListener("DOMContentLoaded", () => {
    set_play([$("#d1"), $("#t1"), $("#n1")]);
    setTimeout(function(){
      set_play([$("#d2"), $("#t2"), $("#n2"), $("#block_01")]);
    }, 2000);
    setTimeout(function(){
      set_play([$("#d3"), $("#t3"), $("#n3"), $("#block_02")]);
    }, 4000);
    setTimeout(function(){
      set_play([$("#d4"), $("#t4"), $("#n4"), $("#block_03")]);
    }, 6000);
    setTimeout(function(){
      set_play([$("#d5"), $("#t5"), $("#n5"), $("#block_04")]);
    }, 8000);
    setTimeout(function(){
      set_play([$("#d6"), $("#t6"), $("#n6"), $("#block_05")]);
    }, 10000);
    setTimeout(function(){
      set_play([$("#d7"), $("#small_box"), $("#block_06")]);
    }, 12000);
}); */

$("#nav_updates").addEventListener("click", function(){
  clear_nav();
  $("#wrapper_updates").classList.add("active");
  $("#blocks").classList.remove("invis");
});

$("#nav_prizes").addEventListener("click", function(){
  clear_nav();
  $("#wrapper_prizes").classList.add("active");
  $("#prizes_blocks").classList.remove("invis");
});

$("#nav_team").addEventListener("click", function(){
  clear_nav();
  $("#wrapper_team").classList.add("active");
  $("#team_blocks").classList.remove("invis");
});

function randomNumber() {
  return Math.floor(Math.random() * 10000) + 1;
}

function $(sel) {
  return document.querySelector(sel);
}

function set_play(el) {
  for (let i = 0; i < el.length; i++) {
    el[i].classList.add("play");
  }
}

function clear_nav() {
  $("#wrapper_updates").classList.remove("active");
  $("#wrapper_prizes").classList.remove("active");
  $("#wrapper_team").classList.remove("active");
  $("#blocks").classList.add("invis");
  $("#prizes_blocks").classList.add("invis");
  $("#team_blocks").classList.add("invis");
}