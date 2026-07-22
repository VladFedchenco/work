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

$("#subnav_prizes").addEventListener("click", function(){
  clear_subnav();
  this.classList.add("bttn_gold", "active");
  $("#prizes_wrapper").classList.remove("invis");
});

$("#subnav_collections").addEventListener("click", function(){
  clear_subnav();
  this.classList.add("bttn_gold", "active");
  $("#collections_wrapper").classList.remove("invis");
});

$("#subnav_deliveries").addEventListener("click", function(){
  clear_subnav();
  this.classList.add("bttn_gold", "active");
  $("#deliveries_wrapper").classList.remove("invis");
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

function clear_subnav() {
  $("#subnav_prizes").classList.remove("bttn_gold", "active");
  $("#subnav_collections").classList.remove("bttn_gold", "active");
  $("#subnav_deliveries").classList.remove("bttn_gold", "active");
  $("#subnav_prizes").classList.add("golden_text");
  $("#subnav_collections").classList.add("golden_text");
  $("#subnav_deliveries").classList.add("golden_text");
  $("#prizes_wrapper").classList.add("invis");
  $("#collections_wrapper").classList.add("invis");
  $("#deliveries_wrapper").classList.add("invis");
}