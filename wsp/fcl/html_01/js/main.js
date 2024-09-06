let num;

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
    num = prizeData.entries;
    $("#total").innerHTML = num;
    num == 1 ? $("#ent").innerHTML = "entry" : $("#ent").innerHTML = "entries";
    gstart("num" + num, 100 + num*100, num == 1 ? "#entry" : "#entries");
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop=false;
}


function $(sel) {
  return document.querySelector(sel);
}

function gstart(num, time, entry) {
  $("#title").classList.add("move");
  setTimeout(function(){
    $("#stars").classList.add("star_go");
  }, 100);
  setTimeout(function(){
    $("#big_plate").classList.add("vis");
  }, 300);
  setTimeout(function(){
    $("#counter").classList.add(num);
  }, 700);
  setTimeout(function(){
    $("#entry_plate").classList.add("move");
  }, time + 500);
  setTimeout(function(){
    $(entry).classList.add("vis");
    $("#content").classList.add("vis");
  }, time + 900);
}