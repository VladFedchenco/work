let game_type, total_amount, entries_amount;
let fields = [$("#field_groceries"), $("#field_gas"), $("#field_gift")];
let entries = [$("#clmn1_entries"), $("#clmn2_entries"), $("#clmn3_entries")];
let pbttns = [$("#c1_plus"), $("#c2_plus"), $("#c3_plus")];
let mbttns = [$("#c1_minus"), $("#c2_minus"), $("#c3_minus")];

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
    game_type = prizeData.game_type;
    $("#gift_text").textContent = prizeData.box_message;
    $("#giftcard_text").innerHTML = prizeData.prize;
    entries_amount = prizeData.entries_amount;
    total_amount = entries_amount;
    if (game_type == 3) {
      $("#content").classList.add("bonus");
    }
    if (game_type != 4) {
      $("#team_sweepstakes").classList.add("invis");
    } else {
      $("#prize").setAttribute("xlink:href", "#coop");
      $("#team_ttl").classList.remove("invis");
    }
    $("#username").innerHTML = prizeData.username;
    $("#coop_entries").innerHTML = prizeData.team_entries;

    gstart();
}

function $(sel) {
  return document.querySelector(sel);
}

function gstart() {
  $("#content").classList.add("play");
  setTimeout(function(){
    if(game_type == 2) {
      $("#info_giftcard").classList.remove("invis");
      $("#redeem_prizes").classList.remove("invis");
    } else {
      $("#assign").classList.remove("invis");
      $("#info_entries").classList.remove("invis");
    }
  }, 3500);
}

for (i=0; i<=2; i++) {
  fields[i].addEventListener('change', validateMax);
  fields[i].addEventListener('input', validateMax);
  fields[i].addEventListener('keyup', validateMax);
  fields[i].addEventListener('paste', validateMax);
  fields[i].addEventListener('focus', setZero);
  fields[i].addEventListener('blur', updateEntries);
  pbttns[i].addEventListener("click", pbttnClick);
  mbttns[i].addEventListener("click", mbttnClick);
}

function validateMax() {
  this.value = Math.min(entries_amount, parseInt(this.value) || 0);
  updateResults();
}

function setZero() {
  this.value = 0;
  updateEntries();
  updateResults();
}

function updateEntries() {
  let entered_amount = parseInt(fields[0].value) + parseInt(fields[1].value) + parseInt(fields[2].value);
  entries_amount = total_amount - entered_amount;
}

$("#submit_entries").addEventListener('click', function(){
  window.scrollTo({top: 0, behavior: 'smooth'});
  $("#main_animation").classList.add("fadeout");
  $("#assign").classList.add("invis");
  setTimeout(function(){
    $("#main_animation").classList.add("invis");
    $("#congrats").classList.remove("invis");
  }, 400);
  setTimeout(function(){
    $("#red_area").classList.remove("invis");
  }, 1200);
});

$("#clear_entries").addEventListener('click', function(){
  for (i=0; i<=2; i++) {
    fields[i].value = fields[i].defaultValue;
    entries[i].innerHTML = 0;
    entries_amount = total_amount;
  }
});

function updateFields(a, f, b) {
  f.value = a;
  b.innerHTML = a;
}

function updateResults() {
  for (i=0; i<=2; i++) {
    entries[i].innerHTML = parseInt(fields[i].value);
  }
}

function pbttnClick() {
  let i = parseInt(this.dataset.i);
  updateFields(amount_plus(parseInt(fields[i].value)), fields[i], entries[i]);
}

function mbttnClick() {
  let i = parseInt(this.dataset.i);
  updateFields(amount_minus(parseInt(fields[i].value)), fields[i], entries[i]);
}

function amount_plus(num) {
  if(num < 100) {
    if(entries_amount > 0) {
      num++;
      entries_amount--;
    }
  }
  return num;
}

function amount_minus(num) {
  if(num > 0) {
    if(entries_amount < total_amount) {
      num--;
      entries_amount++;
    }
  }
  return num;
}
