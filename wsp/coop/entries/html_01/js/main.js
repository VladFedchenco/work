let total_amount, entries_amount;
let fields = [$("#field_groceries"), $("#field_gas"), $("#field_gift")];
let entries = [$("#clmn1_entries"), $("#clmn2_entries"), $("#clmn3_entries")];

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
    $("#gift_text").textContent = prizeData.ballot;
    entries_amount = prizeData.entries_amount;
    total_amount = entries_amount;
    switch (prizeData.prize_id) {
      case 1:
        $("#team_sweepstakes").classList.add("invis");
        $("#ttl2").classList.add("invis");
        break;
      case 2:
        $("#team_sweepstakes").classList.add("invis");
        $("#ttl2").classList.add("invis");
        break;
      case 3:
        $("#team_sweepstakes").classList.add("invis");
        $("#ttl2").classList.add("invis");
        break;
      case 4:
        $("#team_sweepstakes").classList.add("invis");
        $("#ttl2").classList.add("invis");
        break;
      case 5:
        $("#prize").setAttribute("xlink:href", "#coop");
        $("#sweepstakes").classList.add("invis");
        $("#ttl1").classList.add("invis");
        break;
      default:
        $("#prize").setAttribute("xlink:href", "");
    }

    $("#result_ballot").innerHTML = prizeData.ballot;
    $("#prize_name").innerHTML = prizeData.prize_name;
    $("#grocery_entries").innerHTML = prizeData.grocery_entries;
    $("#gas_entries").innerHTML = prizeData.gas_entries;
    $("#card_entries").innerHTML = prizeData.card_entries;
    $("#hab_entries").innerHTML = prizeData.hab_entries;
    $("#coop_entries").innerHTML = prizeData.team_entries;

    gstart();
}

function $(sel) {
  return document.querySelector(sel);
}

function gstart() {
  $("#content").classList.add("play");
  // setTimeout(function(){
  //   $("#result").classList.remove("invis");
  // }, 3500);
  // setTimeout(function(){
  //   $("#red_area").classList.remove("invis");
  // }, 3900);
}

for (i=0; i<=2; i++) {
  fields[i].addEventListener('change', validateMax);
  fields[i].addEventListener('input', validateMax);
  fields[i].addEventListener('keyup', validateMax);
  fields[i].addEventListener('paste', validateMax);
}

for (i=0; i<=2; i++) {
  fields[i].addEventListener('focus', setZero);
}

for (i=0; i<=2; i++) {
  fields[i].addEventListener('blur', updateEntries);
}

function validateMax() {
    this.value = Math.min(entries_amount, parseInt(this.value) || 0);
    updateResults();
}

function setZero() {
  this.value = 0;
  updateEntries();
}

function updateEntries() {
  let entered_amount = parseInt(fields[0].value) + parseInt(fields[1].value) + parseInt(fields[2].value);
  entries_amount = total_amount - entered_amount;
}

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

$("#c1_plus").addEventListener("click", () => {
  updateFields(amount_plus(parseInt(fields[0].value)), fields[0], entries[0]);
}, false);

$("#c1_minus").addEventListener("click", () => {
  updateFields(amount_minus(parseInt(fields[0].value)), fields[0], entries[0]);
}, false);

$("#c2_plus").addEventListener("click", () => {
  updateFields(amount_plus(parseInt(fields[1].value)), fields[1], entries[1]);
}, false);

$("#c2_minus").addEventListener("click", () => {
  updateFields(amount_minus(parseInt(fields[1].value)), fields[1], entries[1]);
}, false);

$("#c3_plus").addEventListener("click", () => {
  updateFields(amount_plus(parseInt(fields[2].value)), fields[2], entries[2]);
}, false);

$("#c3_minus").addEventListener("click", () => {
  updateFields(amount_minus(parseInt(fields[2].value)), fields[2], entries[2]);
}, false);

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
