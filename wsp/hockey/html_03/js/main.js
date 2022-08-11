let shoot = true;

function $(sel) {
  return document.querySelector(sel);
}

function play_sound(item, sound) {
  $(item).setAttribute("src", sound);
  $(item).play();
  $(item).loop=false;
}

function gstart() {
  $("#game").classList.add(cl);
  $("#hand").classList.add("invis");
  $("#hand_ttl").classList.add("invis");
  if(shoot) {
    shoot = false;
    setTimeout(function(){
      play_sound("#sound_shot", "mp4/shot.mp3");
    }, 700);
    setTimeout(function(){
      if(cl == "v1" || cl == "v2") {
        play_sound("#sound_goal", "mp4/goal.mp3");
      } else {
        play_sound("#sound_save", "mp4/save.mp3");
      }
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