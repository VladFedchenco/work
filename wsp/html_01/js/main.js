function $(sel) {
  return document.querySelector(sel);
}

$("#start").onclick = function() {
  $("#main_star").classList.add("rotation");
  setTimeout(function(){
    $("#corner").classList.add("active");
    setTimeout(function(){
      $("#scene_01").classList.add("inactive");
      $("#scene_02").classList.remove("inactive");
    }, 1000);
  }, 3000);
}