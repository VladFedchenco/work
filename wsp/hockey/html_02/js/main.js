let shoot = true;

function $(sel) {
  return document.querySelector(sel);
}

function gstart() {
  $("#game").classList.add(cl);
  $("#hand").classList.add("invis");
  if(shoot) {
    setTimeout(function(){
      play_sound("mp4/shot.mp3");
      shoot = false;
    }, 700);
  }
}

function play_sound(sound) {
  $('audio').setAttribute("src", sound);
  $('audio').play();
  $('audio').loop=false;
}

$("#game").addEventListener("click", function(){
  gstart();
}, false);

$("#hand").addEventListener("click", function(){
  gstart();
}, false);