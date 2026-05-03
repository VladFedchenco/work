let game_type;
let trigger = true;
let t1_state = true;
let t2_state = true;
let t3_state = true;
let randomNumber = Math.floor(Math.random()*2.9);

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
}

$("#tab1").addEventListener("click", function(){
  t1_state = false;
  $("#prize_section").classList.add("invis");
  $("#tab1_prizes").classList.remove("invis");
  setTimeout(function(){
    $("#ttl").innerHTML = "YOU’VE WON!";
    $("#prize_img").setAttribute("src", "imgs/slush.png");
    $("#prize_ttl").innerHTML = "Xtra Slush";
    $("#prize_subttl").innerHTML = "16 oz";
    $("#prize_note").innerHTML = "See <a href='#!''>MY PRIZES</a> to redeem.<br> Redeem by July 15, 2026.";
  }, 400);
  reveal_tab("#tab1_animation", "#tab1_cta", "#tab1", true);
});

$("#tab2").addEventListener("click", function(){
  t2_state = false;
  $("#prize_section").classList.add("invis");
  $("#tab2_prizes").classList.remove("invis");
  setTimeout(function(){
    $("#ttl").innerHTML = "TRY AGAIN";
    $("#prize_img").setAttribute("src", "imgs/speech.png");
    $("#prize_ttl").innerHTML = "Not a winning tab this time.";
    $("#prize_subttl").innerHTML = "Click to break open your next tab!";
    $("#prize_note").innerHTML = "";
  }, 400);
  reveal_tab("#tab2_animation", "#tab2_cta", "#tab2", false);
});

$("#tab3").addEventListener("click", function(){
  t3_state = false;
  $("#prize_section").classList.add("invis");
  $("#tab3_prizes").classList.remove("invis");
  setTimeout(function(){
    $("#ttl").innerHTML = "YOU’VE EARNED!";
    $("#prize_img").setAttribute("src", "imgs/cash.png");
    $("#prize_ttl").innerHTML = "2 Entries";
    $("#prize_subttl").innerHTML = "into the WEEKLY and GRAND PRIZE Cash Sweepstakes!";
    $("#prize_note").innerHTML = "";
  }, 400);
  reveal_tab("#tab3_animation", "#tab3_cta", "#tab3", true);
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
      play_sound();
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
  }
}

function $(sel) {
  return document.querySelector(sel);
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop = false;
}