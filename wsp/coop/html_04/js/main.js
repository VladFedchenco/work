let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
    $("#gift_text").textContent = prizeData.ballot;
    switch (prizeData.prize_id) {
      case 1:
        $("#prize").setAttribute("xlink:href", "#grocery");
        $("#team_sweepstakes").classList.add("invis");
        $("#ttl2").classList.add("invis");
        break;
      case 2:
        $("#prize").setAttribute("xlink:href", "#fuel");
        $("#team_sweepstakes").classList.add("invis");
        $("#ttl2").classList.add("invis");
        break;
      case 3:
        $("#prize").setAttribute("xlink:href", "#card");
        $("#team_sweepstakes").classList.add("invis");
        $("#ttl2").classList.add("invis");
        break;
      case 4:
        $("#prize").setAttribute("xlink:href", "#habs");
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
  setTimeout(function(){
    $("#result").classList.remove("invis");
  }, 3500);
  setTimeout(function(){
    $("#red_area").classList.remove("invis");
  }, 3900);
}