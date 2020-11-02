function $(sel) {
  return document.querySelector(sel);
}
let tmt;
$("#click_left").onclick = function() {
  clearTimeout(tmt);
  $("#smoke").setAttribute("class", "click_point_01");
  $("#section_circles").setAttribute("class", "invis");
  tmt = setTimeout(function(){
    $("#smoke").setAttribute("class", "");
    $("#rate_sb").classList.add("active");
  }, 2000);
}
$("#click_middle").onclick = function() {
  $("#drop_down").classList.add("active");
}
$("#click_right").onclick = function() {
  clearTimeout(tmt);
  $("#smoke").setAttribute("class", "click_point_03");
  $("#section_circles").setAttribute("class", "invis");
  tmt = setTimeout(function(){
    $("#smoke").setAttribute("class", "");
    $("#rate_th").classList.add("active");
  }, 2000);
}

$("#bttn_info").onclick = function() {
  $("#helper").classList.add("active");
}
$("#helper_close").onclick = function() {
  $("#helper").classList.remove("active");
}
$("#drop_down_close").onclick = function() {
  $("#drop_down").classList.remove("active");
}

$("#bttn_more").onclick = function() {
  $("#more_details").classList.add("active");
}
$("#more_details_close").onclick = function() {
  $("#more_details").classList.remove("active");
}

function sb_thanks() {
  $("#rate_sb .thanks").classList.add("active");
}

$("#sb_star1").onclick = function() {sb_thanks()};
$("#sb_star2").onclick = function() {sb_thanks()};
$("#sb_star3").onclick = function() {sb_thanks()};
$("#sb_star4").onclick = function() {sb_thanks()};
$("#sb_star5").onclick = function() {sb_thanks()};

function th_thanks() {
  $("#rate_th .thanks").classList.add("active");
}

$("#th_star1").onclick = function() {th_thanks()};
$("#th_star2").onclick = function() {th_thanks()};
$("#th_star3").onclick = function() {th_thanks()};
$("#th_star4").onclick = function() {th_thanks()};
$("#th_star5").onclick = function() {th_thanks()};

function show_result() {
  $("#result").classList.add("active");
}

$("#bttn_sb_ok").onclick = function() {
  $("#rate_sb").classList.remove("active");
  $("#rate_sb .thanks").classList.remove("active");
  show_result()
};
$("#bttn_th_ok").onclick = function() {
  $("#rate_th").classList.remove("active");
  $("#rate_th .thanks").classList.remove("active");
  show_result()
  $("#result_percent").setAttribute("style", "background: linear-gradient(90deg, #fff 0%, #fff 60%, #00a8ff 60%, #00a8ff 100%);");
  $("#result_tell").innerHTML = "Tell us why you love Tim Hortons!";
  $("#result_tell").setAttribute("style", "background-color: #dd0f2d");
  $("#why_form h3").innerHTML = "Why do you like Tim Hortons?"
  $("#why_form img").setAttribute("src", "imgs/th.svg");
  $("#sign_up h2").innerHTML = "SIGN UP FOR DISCOUNTS AT TIM HORTONS";
};

$("#result_tell").onclick = function() {
  $("#why").classList.add("active");
};
$("#why_close").onclick = function() {
  $("#why").classList.remove("active");
}
$("#bttn_cancel").onclick = function() {
  $("#why").classList.remove("active");
}

$("#form_skip").onclick = function() {
  window.location.reload(false); 
}

$("#result_skip").onclick = function() {
  $("#result").classList.remove("active");
  $("#sign_up").classList.add("active");
}

let form_block = $("#tell_why");
form_block.addEventListener("submit", function(event) {
  event.preventDefault();
  $("#result").classList.remove("active");
  $("#why").classList.remove("active");
  $("#sign_up").classList.add("active");
});

$("#form_submit").onclick = function() {
  $("#sign_up").classList.remove("active");
  $("#sign_up_thanks").classList.add("active");
}

$("#final_thanks").onclick = function() {
  window.location.reload(false); 
}

window.addEventListener('load', (event) => {
  $("#initial_screen").classList.add("active");
  setTimeout(function(){ $("#initial_screen").classList.remove("active"); }, 8000);
});