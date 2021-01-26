function $(sel) {
  return document.querySelector(sel);
}

$("#start").onclick = function() {
  $("#main_star").setAttribute("class", "rotation");
  $("#click_circles").setAttribute("class", "hidden");
  $("#hand_pointer").setAttribute("class", "hidden");
  $("#pointer_text").setAttribute("class", "hidden");

  setTimeout(function(){
    $("#corner_animation").setAttribute("class", "active");
    setTimeout(function(){
      $("#scene_01").setAttribute("class", "inactive");
      $("#scene_02").setAttribute("class", "paused");
      setTimeout(function(){
        $("#scene_02").setAttribute("class", "");
      }, 50);
    }, 1000);
  }, 1500);
}

// let css_values = setInterval(get_css, 50);

// function get_css() {
//   console.log(getComputedStyle($("#hand_pointer")).getPropertyValue('transform'));
// }

// function stop_int() {
//   clearInterval(css_values);
// }