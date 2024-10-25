function $(sel) {
  return document.querySelector(sel);
}

$("#start").onclick = function() {
  $("#main_star").classList.add("rotation");
  $("#click_circles").classList.add("hidden");
  $("#hand_pointer").classList.add("hidden");
  $("#pointer_text").classList.add("hidden");
  setTimeout(function(){
    $("#corner").classList.add("active");
    setTimeout(function(){
      $("#scene_01").classList.add("inactive");
      $("#scene_02").classList.remove("inactive");
      setTimeout(function(){
        $("#scene_02").classList.remove("paused");
      }, 50);
    }, 1000);
  }, 1500);
}