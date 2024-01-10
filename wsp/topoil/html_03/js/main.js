function $(sel) {
  return document.querySelector(sel);
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop=false;
}

function gstart() {
  play_sound();
  $("#animated_parts").classList.add("animated");
  $("#start").classList.add("invis");
  setTimeout(function(){
    $("#content").classList.remove("invis");
  }, 7000);
}

$("#start").addEventListener("click", function(){
  gstart();
}, false);