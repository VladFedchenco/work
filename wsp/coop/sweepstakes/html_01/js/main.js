let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
    // game_type = prizeData.game_type;
    // $("#gift_text").textContent = prizeData.box_message;
    // $("#giftcard_text").innerHTML = prizeData.prize;
    // $("#team_congrats_entries").innerHTML = prizeData.team_entries;
    // entries_amount = prizeData.entries_amount;
    // total_amount = entries_amount;
    // if (game_type == 3) {
    //   $("#main_animation").classList.add("bonus");
    // }
    // if (game_type != 4) {
    //   $("#team_sweepstakes").classList.add("invis");
    // } else {
    //   $("#prize").setAttribute("xlink:href", "#coop");
    //   $("#team_ttl").classList.remove("invis");
    // }
    // $("#coop_entries").innerHTML = prizeData.team_entries;

    setTimeout(function() {
      gstart();
    }, 1000);
}

/*

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
}, 6315);

setTimeout(function() {
  $("#pin7").classList.replace("inactive", "active");
}, 7326);

setTimeout(function() {
  $("#beaver").classList.add("animated");
}, 7601);

setTimeout(function() {
  $("#pin8").classList.replace("inactive", "active");
}, 8389);

setTimeout(function() {
  $("#ballot_pool2").classList.replace("inactive", "active");
}, 10000);

setTimeout(function() {
  $("#ballot_pool3").classList.replace("inactive", "active");
}, 10000);

*/

function randomNumber() {
  return Math.floor(Math.random() * 10000) + 1;
}

const items = document.querySelectorAll('.items');
const close_bttns = document.querySelectorAll('.close_bttn');

for (let i = 0; i < items.length; i++) {
  (function(index) {
    items[index].addEventListener("click", () => {
      close_popups();
      $("#popup_" + (index+1)).classList.remove("hidden");
    }, false);

    close_bttns[index].addEventListener("click", () => {
      $("#popup_" + (index+1)).classList.add("hidden");
    }, false);
  })(i);
}

function close_popups() {
  for (i=1; i<=10; i++) {
    $("#popup_" + i).classList.add("hidden");
  }
}

function $(sel) {
  return document.querySelector(sel);
}

function gstart() {
  $("#main_logo").classList.add("hidden");
  setTimeout(function() {
      $("#confetti").setAttribute("href", "imgs/confetti.svg?v=" + randomNumber());
      $("#popup_bg").classList.add("animated");
      $("#red_label").classList.add("animated");
      $("#icon_label").classList.add("animated");
      $("#text_label").classList.add("animated");
      $("#popup_message").classList.remove("hidden");
      $("#ballot_pool2").classList.replace("inactive", "active");
      $("#ballot_pool3").classList.replace("inactive", "active");
  }, 300);

  setTimeout(function() {
      $("#popup_bg").classList.replace("animated", "animated2");
      $("#popup_message").classList.add("hidden");
      $("#confetti").setAttribute("href", "imgs/empty.svg");
      $("#mask_path").classList.add("stop1");
  }, 3000);
  setTimeout(function() {
      $("#pin1").classList.replace("inactive", "active");
      $("#confetti").setAttribute("href", "imgs/confetti.svg?v=" + randomNumber());
      $("#popup_bg").classList.replace("animated2", "animated");
      $("#popup_message1").classList.remove("hidden");
  }, 4000);

  setTimeout(function() {
      $("#popup_bg").classList.replace("animated", "animated2");
      $("#popup_message1").classList.add("hidden");
      $("#confetti").setAttribute("href", "imgs/empty.svg");
      $("#mask_path").classList.add("stop2");
  }, 7000);
  setTimeout(function() {
      $("#moose").classList.add("animated");
  }, 7300);
  setTimeout(function() {
      $("#pin2").classList.replace("inactive", "active");
      $("#confetti").setAttribute("href", "imgs/confetti.svg?v=" + randomNumber());
      $("#popup_bg").classList.replace("animated2", "animated");
      $("#popup_message2").classList.remove("hidden");
  }, 8000);

  setTimeout(function() {
      $("#popup_bg").classList.replace("animated", "animated2");
      $("#popup_message2").classList.add("hidden");
      $("#confetti").setAttribute("href", "imgs/empty.svg");
      $("#mask_path").classList.add("stop3");
  }, 11000);
  setTimeout(function() {
      $("#flag").classList.add("animated");
  }, 11500);
  setTimeout(function() {
      $("#pin3").classList.replace("inactive", "active");
      $("#confetti").setAttribute("href", "imgs/confetti.svg?v=" + randomNumber());
      $("#popup_bg").classList.replace("animated2", "animated");
      $("#popup_message3").classList.remove("hidden");
  }, 12000);

  setTimeout(function() {
      $("#popup_bg").classList.replace("animated", "animated2");
      $("#popup_message3").classList.add("hidden");
      $("#confetti").setAttribute("href", "imgs/empty.svg");
      $("#mask_path").classList.add("stop4");
  }, 15000);
  setTimeout(function() {
      $("#pin4").classList.replace("inactive", "active");
      $("#confetti").setAttribute("href", "imgs/confetti.svg?v=" + randomNumber());
      $("#popup_bg").classList.replace("animated2", "animated");
      $("#popup_message4").classList.remove("hidden");
  }, 16000);

  setTimeout(function() {
      $("#popup_bg").classList.replace("animated", "animated2");
      $("#popup_message4").classList.add("hidden");
      $("#confetti").setAttribute("href", "imgs/empty.svg");
      $("#mask_path").classList.add("stop5");
  }, 19000);
  setTimeout(function() {
      $("#bear").classList.add("animated");
  }, 19500);
  setTimeout(function() {
      $("#pin5").classList.replace("inactive", "active");
      $("#confetti").setAttribute("href", "imgs/confetti.svg?v=" + randomNumber());
      $("#popup_bg").classList.replace("animated2", "animated");
      $("#popup_message5").classList.remove("hidden");
  }, 20000);

  setTimeout(function() {
      $("#popup_bg").classList.replace("animated", "animated2");
      $("#popup_message5").classList.add("hidden");
      $("#confetti").setAttribute("href", "imgs/empty.svg");
      $("#mask_path").classList.add("stop6");
  }, 23000);
  setTimeout(function() {
      $("#pin6").classList.replace("inactive", "active");
      $("#confetti").setAttribute("href", "imgs/confetti.svg?v=" + randomNumber());
      $("#popup_bg").classList.replace("animated2", "animated");
      $("#popup_message6").classList.remove("hidden");
  }, 24000);

  setTimeout(function() {
      $("#popup_bg").classList.replace("animated", "animated2");
      $("#popup_message6").classList.add("hidden");
      $("#confetti").setAttribute("href", "imgs/empty.svg");
      $("#mask_path").classList.add("stop7");
  }, 27000);
  setTimeout(function() {
      $("#pin7").classList.replace("inactive", "active");
      $("#confetti").setAttribute("href", "imgs/confetti.svg?v=" + randomNumber());
      $("#popup_bg").classList.replace("animated2", "animated");
      $("#popup_message7").classList.remove("hidden");
  }, 28000);

  setTimeout(function() {
      $("#popup_bg").classList.replace("animated", "animated2");
      $("#popup_message7").classList.add("hidden");
      $("#confetti").setAttribute("href", "imgs/empty.svg");
      $("#mask_path").classList.add("stop8");
  }, 31000);
  setTimeout(function() {
      $("#beaver").classList.add("animated");
  }, 31200);
  setTimeout(function() {
      $("#pin8").classList.replace("inactive", "active");
      $("#confetti").setAttribute("href", "imgs/confetti.svg?v=" + randomNumber);
      $("#popup_bg").classList.replace("animated2", "animated");
      $("#popup_message8").classList.remove("hidden");
  }, 32000);

  setTimeout(function() {
      $("#popup_bg").classList.replace("animated", "animated2");
      $("#popup_message8").classList.add("hidden");
      $("#confetti").setAttribute("href", "imgs/empty.svg");
      $("#mask_path").classList.add("stop9");
  }, 35000);
  setTimeout(function() {
      $("#popup_bg").classList.replace("animated2", "animated");
      $("#popup_message_bonus").classList.remove("hidden");
      $("#extra").classList.remove("hidden");
      for (i=1; i<=8; i++) {
        $("#pin" + i).classList.add("smaller");
      }
  }, 36000);
}
