let total_scroll, current_pos, progress;

function $(sel) {
  return document.querySelector(sel);
}

function update_all() {
  total_scroll = window.innerHeight * 2;
  current_pos = window.pageYOffset * 2;
  progress = current_pos / total_scroll;

  $('.cloud1').setAttribute("transform", "translate(0 " + (100 - 900 * progress) + ")");
  $('.sky').setAttribute("y", (-200 * progress));
  $('.cloud2').setAttribute("y", (-150 - 350 * progress));
  $('.cloud3').setAttribute("y", (-50 - 600 * progress));
  $('.mountBg').setAttribute("y", (-10 - 90 * progress));
  $('.mountMg').setAttribute("y", (-30 - 40 * progress));
  $('.mountFg').setAttribute("y", (-50 - 550 * progress));
  $('.birdy').setAttribute("x", (-90 + 490 * progress));
  $('.birdy').setAttribute("y", (270 - 270 * progress));

  if (progress > 1) {
    $('.main').classList.add("move");
    $('.main').setAttribute("style", "top:" + window.innerHeight + "px");
  } else {
    $('.main').classList.remove("move");
    $('.main').setAttribute("style", "");
  }
}

document.addEventListener("DOMContentLoaded", function(event) {

    window.addEventListener('resize', function(event) {
      update_all();
    }, true);

    window.onscroll = function() {
      update_all();
    }

    window.onbeforeunload = function() {
        window.scrollTo(0, 0);
    };
});