function $(sel) {
  return document.querySelector(sel);
}
let tmt;
$("#click_left").onclick = function() {
  clearTimeout(tmt);
  $("#smoke").setAttribute("class", "click_point_01");
  $("#section_circles").setAttribute("class", "invis");
  $("header").setAttribute("class", "invis");
  $("#rating_text").innerHTML = "I'm on Team Starbucks!";
  $("#rating_logo").setAttribute("src", "imgs/sb.svg");
  tmt = setTimeout(function(){
    $("#smoke").setAttribute("class", "");
    $("#rating").setAttribute("class", "active");
  }, 2000);
}
$("#click_right").onclick = function() {
  clearTimeout(tmt);
  $("#smoke").setAttribute("class", "click_point_03");
  $("#section_circles").setAttribute("class", "invis");
  $("header").setAttribute("class", "invis");
  $("#rating_text").innerHTML = "I'm on Team Tim Hortons!";
  $("#rating_logo").setAttribute("src", "imgs/th.svg");
  tmt = setTimeout(function(){
    $("#smoke").setAttribute("class", "")
    $("#rating").setAttribute("class", "active");
  }, 2000);
}

$("#bttn_info").onclick = function() {
  $("#helper").classList.add("active");
}
$("#helper_close").onclick = function() {
  $("#helper").classList.remove("active");
}

$("#bttn_more").onclick = function() {
  $("#more_details").classList.add("active");
}
$("#more_details_close").onclick = function() {
  $("#more_details").classList.remove("active");
}

window.addEventListener('load', (event) => {
  $("#initial_screen").classList.add("active");
  setTimeout(function(){ $("#initial_screen").classList.remove("active"); }, 7800);
});

$("#sb_rate1").addEventListener("mouseover", function(){
  $("#sb_rate1 svg polygon").setAttribute("fill", "#ffb400");
});
$("#sb_rate1").addEventListener("mouseout", function(){
  $("#sb_rate1 svg polygon").setAttribute("fill", "#ccc");
});

$("#sb_rate2").addEventListener("mouseover", function(){
  $("#sb_rate1 svg polygon").setAttribute("fill", "#ffb400");
  $("#sb_rate2 svg polygon").setAttribute("fill", "#ffb400");
});
$("#sb_rate2").addEventListener("mouseout", function(){
  $("#sb_rate1 svg polygon").setAttribute("fill", "#ccc");
  $("#sb_rate2 svg polygon").setAttribute("fill", "#ccc");
});

$("#sb_rate3").addEventListener("mouseover", function(){
  $("#sb_rate1 svg polygon").setAttribute("fill", "#ffb400");
  $("#sb_rate2 svg polygon").setAttribute("fill", "#ffb400");
  $("#sb_rate3 svg polygon").setAttribute("fill", "#ffb400");
});
$("#sb_rate3").addEventListener("mouseout", function(){
  $("#sb_rate1 svg polygon").setAttribute("fill", "#ccc");
  $("#sb_rate2 svg polygon").setAttribute("fill", "#ccc");
  $("#sb_rate3 svg polygon").setAttribute("fill", "#ccc");
});

$("#sb_rate4").addEventListener("mouseover", function(){
  $("#sb_rate1 svg polygon").setAttribute("fill", "#ffb400");
  $("#sb_rate2 svg polygon").setAttribute("fill", "#ffb400");
  $("#sb_rate3 svg polygon").setAttribute("fill", "#ffb400");
  $("#sb_rate4 svg polygon").setAttribute("fill", "#ffb400");
});
$("#sb_rate4").addEventListener("mouseout", function(){
  $("#sb_rate1 svg polygon").setAttribute("fill", "#ccc");
  $("#sb_rate2 svg polygon").setAttribute("fill", "#ccc");
  $("#sb_rate3 svg polygon").setAttribute("fill", "#ccc");
  $("#sb_rate4 svg polygon").setAttribute("fill", "#ccc");
});

$("#sb_rate5").addEventListener("mouseover", function(){
  $("#sb_rate1 svg polygon").setAttribute("fill", "#ffb400");
  $("#sb_rate2 svg polygon").setAttribute("fill", "#ffb400");
  $("#sb_rate3 svg polygon").setAttribute("fill", "#ffb400");
  $("#sb_rate4 svg polygon").setAttribute("fill", "#ffb400");
  $("#sb_rate5 svg polygon").setAttribute("fill", "#ffb400");
});
$("#sb_rate5").addEventListener("mouseout", function(){
  $("#sb_rate1 svg polygon").setAttribute("fill", "#ccc");
  $("#sb_rate2 svg polygon").setAttribute("fill", "#ccc");
  $("#sb_rate3 svg polygon").setAttribute("fill", "#ccc");
  $("#sb_rate4 svg polygon").setAttribute("fill", "#ccc");
  $("#sb_rate5 svg polygon").setAttribute("fill", "#ccc");
});