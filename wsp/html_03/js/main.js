function $(sel) {
  return document.querySelector(sel);
}

$("#start").onclick = function() {
  $("#main_star").classList.add("rotation");
  $("#click_circles").classList.add("hidden");
  $("#hand_pointer").classList.add("hidden");
  $("#pointer_text").classList.add("hidden");
  setTimeout(function(){
    $("#corner_animation").classList.add("active");
    setTimeout(function(){
      $("#scene_01").classList.add("inactive");
      $("#scene_02").classList.remove("inactive");
      setTimeout(function(){
        $("#scene_02").classList.remove("paused");
      }, 50);
    }, 1000);
  }, 1500);
}

// let css_values = setInterval(get_css, 50);

// function get_css() {
//   console.log(getComputedStyle($("#corner")).getPropertyValue('transform'));
// }

// function stop_int() {
//   clearInterval(css_values);
// }