let clmn1_amount = 0, clmn2_amount = 0, clmn3_amount = 0, total_amount, entries_amount;

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

let fields = [$("#field_groceries"), $("#field_gas"), $("#field_gift")];

for (i=0; i<=2; i++) {
  fields[i].addEventListener('change', validateMax);
  fields[i].addEventListener('input', validateMax);
  fields[i].addEventListener('keyup', validateMax);
  fields[i].addEventListener('paste', validateMax);
}

function validateMax() {
 if (this.max) this.value = Math.min(parseInt(this.max), parseInt(this.value) || 0);
}

$("#clear_entries").addEventListener('click', function(){
  for (i=0; i<=2; i++) {
    fields[i].value = fields[i].defaultValue;
  }
});

let entry1 = $("#clmn1_entries"), entry2 = $("#clmn2_entries"), entry3 = $("#clmn3_entries");

function counterBttnPlus(a, f, b) {
  f.value = a;
  b.innerHTML = a;
}

function counterBttnMinus(a, f, b) {
  f.value = a;
  b.innerHTML = a;
}

$("#c1_plus").addEventListener("click", () => {
  clmn1_amount = amount_plus(clmn1_amount);
  counterBttnPlus(clmn1_amount, fields[0], entry1);
}, false);

$("#c1_minus").addEventListener("click", () => {
  clmn1_amount = amount_minus(clmn1_amount);
  counterBttnMinus(clmn1_amount, fields[0], entry1);
}, false);

$("#c2_plus").addEventListener("click", () => {
  clmn2_amount = amount_plus(clmn2_amount);
  counterBttnPlus(clmn2_amount, fields[1], entry2);
}, false);

$("#c2_minus").addEventListener("click", () => {
  clmn2_amount = amount_minus(clmn2_amount);
  counterBttnMinus(clmn2_amount, fields[1], entry2);
}, false);

$("#c3_plus").addEventListener("click", () => {
  clmn3_amount = amount_plus(clmn3_amount);
  counterBttnPlus(clmn3_amount, fields[2], entry3);
}, false);

$("#c3_minus").addEventListener("click", () => {
  clmn3_amount = amount_minus(clmn3_amount);
  counterBttnMinus(clmn3_amount, fields[2], entry3);
}, false);

function amount_plus(num) {
  if(num < 30) {
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
