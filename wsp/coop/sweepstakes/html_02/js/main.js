let total, counter = 0, pins_to_activate = [false, false, false, false, false, false, false, false];
let dashes = [1167, 1144, 1119, 1094, 1069, 1044, 1019, 994, 968, 944, 918, 893, 868, 843, 818, 794, 768, 743, 718, 694, 669, 644, 619, 594, 569, 544, 519, 493, 469, 444, 419, 394, 368, 344, 318, 294, 269, 244, 219, 193, 168, 144, 119, 94, 69, 44, 19, 0];
let path_to_initial, initial_not_played = true, path_last_stop, last_point, intervalId;
let pins_amount = 0;
let ballot_pool2, ballot_pool3;

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
    total = prizeData.entries_end - prizeData.entries_start;
    $("#text_label").textContent = prizeData.entries_end;
    $("#line2").innerHTML = total;
    dashes[prizeData.entries_end] ? last_point = dashes[prizeData.entries_end] : last_point = 0;
    ballot_pool2 = prizeData.ballot_pool2;
    ballot_pool3 = prizeData.ballot_pool3;

    for(let i=0; i<=prizeData.entries_start; i++) {
      switch (i) {
        case 5:
          $("#pin1").classList.remove("inactive");
          break;
        case 10:
          $("#pin2").classList.remove("inactive");
          break;
        case 15:
          $("#pin3").classList.remove("inactive");
          break;
        case 20:
          $("#pin4").classList.remove("inactive");
          break;
        case 25:
          $("#pin5").classList.remove("inactive");
          break;
        case 30:
          $("#pin6").classList.remove("inactive");
          break;
        case 35:
          $("#pin7").classList.remove("inactive");
          break;
        case 40:
          $("#pin8").classList.remove("inactive");
          break;
      }
    }

    for(let i=prizeData.entries_start+1; i<=prizeData.entries_end; i++) {
      switch (i) {
        case 5:
          if(counter == 0) { counter = 1; path_to_initial = dashes[5]; };
          pins_to_activate[0] = true;
          path_last_stop = dashes[5];
          pins_amount++;
          break;
        case 10:
          if(counter == 0) { counter = 2; path_to_initial = dashes[10]; };
          pins_to_activate[1] = true;
          path_last_stop = dashes[10];
          pins_amount++;
          break;
        case 15:
          if(counter == 0) { counter = 3; path_to_initial = dashes[15]; };
          pins_to_activate[2] = true;
          path_last_stop = dashes[15];
          pins_amount++;
          break;
        case 20:
          if(counter == 0) { counter = 4; path_to_initial = dashes[20]; };
          pins_to_activate[3] = true;
          path_last_stop = dashes[20];
          pins_amount++;
          break;
        case 25:
          if(counter == 0) { counter = 5; path_to_initial = dashes[25]; };
          pins_to_activate[4] = true;
          path_last_stop = dashes[25];
          pins_amount++;
          break;
        case 30:
          if(counter == 0) { counter = 6; path_to_initial = dashes[30]; };
          pins_to_activate[5] = true;
          path_last_stop = dashes[30];
          pins_amount++;
          break;
        case 35:
          if(counter == 0) { counter = 7; path_to_initial = dashes[35]; };
          pins_to_activate[6] = true;
          path_last_stop = dashes[35];
          pins_amount++;
          break;
        case 40:
          if(counter == 0) { counter = 8; path_to_initial = dashes[40]; };
          pins_to_activate[7] = true;
          path_last_stop = dashes[40];
          pins_amount++;
          break;
        default:
          if(!path_last_stop) {
            path_last_stop = dashes[prizeData.entries_start];
          }
          if (prizeData.entries_start >=40) {
            counter = 9;
          }
      }
    }

    $("#vars").innerHTML = ":root { --path_from: " + dashes[prizeData.entries_start] + "px; --path_to: " + dashes[prizeData.entries_end] + "px; --path_last_stop: " + path_last_stop + "px; --path_to_initial: " + path_to_initial + "px; }";
    
    setTimeout(function() {
      gstart();
    }, 1000);
}

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

      if(ballot_pool2) { $("#ballot_pool2").classList.replace("inactive", "active") }
      if(ballot_pool3) { $("#ballot_pool3").classList.replace("inactive", "active") }
  }, 300);

  intervalId = setInterval(step_pins, 4000);
}

function activate_pin(n) {
  hide_all();
  if (initial_not_played) {
    $("#mask_path").classList.add("initial_stop");
  } else {
    $("#mask_path").classList.remove("initial_stop");
    $("#mask_path").classList.add("stop" + n);
  }
  initial_not_played = false;
  animals(n);
  
  setTimeout(function() { show_bg(n) }, 1000);
}

function animals(n) {
  if (n == 2 && last_point < dashes[8]) {
    setTimeout(function() { $("#moose").classList.add("animated") }, 300);
  }
  if (n == 3 && last_point < dashes[12]) {
    setTimeout(function() { $("#flag").classList.add("animated") }, 500);
  }
  if (n == 5 && last_point < dashes[22]) {
    setTimeout(function() { $("#bear").classList.add("animated") }, 500);
  }
  if (n == 8 && last_point < dashes[36]) {
    setTimeout(function() { $("#beaver").classList.add("animated") }, 200);
  }
}

function last_scene() {
  hide_all()
  $("#mask_path").classList.add("last_stop");
  counter == 0 ? animals(2) : animals(counter + 1);
  setTimeout(function() {
    $("#popup_bg").classList.replace("animated2", "animated");
    $("#popup_message_bonus").classList.remove("hidden");
    $("#extra").classList.remove("hidden");
    for (i=1; i<=8; i++) {
      $("#pin" + i).classList.add("smaller");
    }
  }, 1000);
}

function hide_all() {
  $("#popup_bg").classList.replace("animated", "animated2");
  $("#popup_message").classList.add("hidden");
  for(let i = 1; i<=8; i++) {
    $("#popup_message" + i).classList.add("hidden");
  }
  $("#confetti").setAttribute("href", "imgs/empty.svg");
}

function show_bg(n) {
  $("#confetti").setAttribute("href", "imgs/confetti.svg?v=" + randomNumber());
  $("#popup_bg").classList.replace("animated2", "animated");
  $("#pin" + n).classList.replace("inactive", "active");
  $("#popup_message" + n).classList.remove("hidden");
}

function step_pins() {
  if(pins_to_activate[counter] && counter < 9 && pins_amount > 0) {
    activate_pin(counter);
    counter++;
  } else {
    clearInterval(intervalId);
    if (counter < 9 && pins_amount > 0) {
      activate_pin(counter);
      setTimeout(function() { last_scene() }, 4000);
    } else {
      last_scene();
    }
  }
}