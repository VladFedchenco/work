let prizeData;
let trigger = true;
let t1_state = true;
let t2_state = true;
let t3_state = true;
let tabs_opened = 0;
let randomNumber = Math.floor(Math.random()*2.9);

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  prizeData = request.response;
  if(prizeData.game_type == 1) {
    $("#next_ticket").classList.remove("display_none");
  }
  if(prizeData.game_type == 2) {
    $("#upload_ticket").classList.remove("display_none");
  }
}

$("#tab1").addEventListener("click", function(){
  if(t1_state) {
    t1_state = false;
    $("#prize_section").classList.add("invis");
    $("#tab1_prizes").classList.remove("invis");
    setTimeout(function(){
      $("#ttl").innerHTML = prizeData.ttl1;
      $("#prize_img").setAttribute("src", prizeData.prize_img1);
      $("#prize_ttl").innerHTML = prizeData.prize_ttl1;
      $("#prize_subttl").innerHTML = prizeData.prize_subttl1;
      $("#prize_note").innerHTML = prizeData.prize_note1;
    }, 400);
    tabs_opened++;
    reveal_tab("#tab1_animation", "#tab1_cta", "#tab1", prizeData.winning_tab1);
  }
});

$("#tab2").addEventListener("click", function(){
  if(t2_state) {
    t2_state = false;
    $("#prize_section").classList.add("invis");
    $("#tab2_prizes").classList.remove("invis");
    setTimeout(function(){
      $("#ttl").innerHTML = prizeData.ttl2;
      $("#prize_img").setAttribute("src", prizeData.prize_img2);
      $("#prize_ttl").innerHTML = prizeData.prize_ttl2;
      $("#prize_subttl").innerHTML = prizeData.prize_subttl2;
      $("#prize_note").innerHTML = prizeData.prize_note2;
    }, 400);
    tabs_opened++;
    reveal_tab("#tab2_animation", "#tab2_cta", "#tab2", prizeData.winning_tab2);
  }
});

$("#tab3").addEventListener("click", function(){
  if(t3_state) {
    t3_state = false;
    $("#prize_section").classList.add("invis");
    $("#tab3_prizes").classList.remove("invis");
    setTimeout(function(){
      $("#ttl").innerHTML = prizeData.ttl3;
      $("#prize_img").setAttribute("src", prizeData.prize_img3);
      $("#prize_ttl").innerHTML = prizeData.prize_ttl3;
      $("#prize_subttl").innerHTML = prizeData.prize_subttl3;
      $("#prize_note").innerHTML = prizeData.prize_note3;
    }, 400);
    tabs_opened++;
    reveal_tab("#tab3_animation", "#tab3_cta", "#tab3", prizeData.winning_tab3);
  }
});

function reveal_tab(tab, cta, bttn, stars) {
  if(trigger) {
    trigger = false;
    $("#cursor").classList.add("invis");
    $("#cta_logo").classList.add("invis");
    $("#stars").classList.remove("play");
    $(bttn).classList.add("invis");
    $(cta).classList.add("invis");
    if(t1_state) {
      $("#tab1_animation").classList.add("inactive");
      $("#tab1").classList.add("disable");
    }
    if(t2_state) {
      $("#tab2_animation").classList.add("inactive");
      $("#tab2").classList.add("disable");
    }
    if(t3_state) {
      $("#tab3_animation").classList.add("inactive");
      $("#tab3").classList.add("disable");
    }
    setTimeout(function(){
      $(tab).classList.add("play");
      if(stars) {
        play_sound("#sound");
      } else {
        play_sound("#sound2");
      }
    }, 200);
    setTimeout(function(){
      $("#prize_section").classList.remove("invis");
      if(stars) {
        $("#stars").classList.add("play");
      }
    }, 600);
    setTimeout(function(){
      trigger = true;
      $("#tab1_animation").classList.remove("inactive");
      $("#tab2_animation").classList.remove("inactive");
      $("#tab3_animation").classList.remove("inactive");
      $("#tab1").classList.remove("disable");
      $("#tab2").classList.remove("disable");
      $("#tab3").classList.remove("disable");
    }, 1000);
    if(tabs_opened == 3) {
      setTimeout(function(){
        $("#play_again").classList.remove("none");
      }, 2500);
    }
  }
}

function $(sel) {
  return document.querySelector(sel);
}

function play_sound(s) {
  $(s).pause();
  $(s).currentTime = 0;
  $(s).play();
  $(s).loop = false;
}
