function $(sel) {
  return document.querySelector(sel);
}
let tmt;
$("#click_left").onclick = function() {
  clearTimeout(tmt);
  $("#smoke").setAttribute("class", "click_point_01");
  tmt = setTimeout(function(){ $("#smoke").setAttribute("class", "") }, 2000);
}
$("#click_middle").onclick = function() {
  clearTimeout(tmt);
  $("#smoke").setAttribute("class", "click_point_02");
  tmt = setTimeout(function(){ $("#smoke").setAttribute("class", "") }, 2000);
}
$("#click_right").onclick = function() {
  clearTimeout(tmt);
  $("#smoke").setAttribute("class", "click_point_03");
  tmt = setTimeout(function(){ $("#smoke").setAttribute("class", "") }, 2000);
}