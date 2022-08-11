let shoot = true;

function $(sel) {
  return document.querySelector(sel);
}

function play_sound(sound) {
  $("#sound").setAttribute("src", sound);
  $("#sound").play();
  $("#sound").loop=false;
}

function gstart() {
  $("#game").classList.add(cl);
  $("#hand").classList.add("invis");
  $("#hand_ttl").classList.add("invis");
  if(shoot) {
    shoot = false;
    setTimeout(function(){
      play_sound(sound);
    }, 700);
    setTimeout(function(){
      $("#win_content").classList.remove("invis");
      $("#block_after").classList.remove("invis");
    }, 1700);
  }
}

$("#game").addEventListener("click", function(){
  gstart();
}, false);

$("#hand").addEventListener("click", function(){
  gstart();
}, false);