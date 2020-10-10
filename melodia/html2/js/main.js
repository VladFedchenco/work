const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["smart", "personalized", "simple", "awesome"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
  	setTimeout(erase, newTextDelay);
  }
}

function erase() {
	if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

function $(sel) {
  return document.querySelector(sel);
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});

let body, html, height, win_height;

function set_heights() {
  body = document.body;
  html = document.documentElement;
  win_height = window.innerHeight;
  height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
}

window.addEventListener('resize', function(event){
  set_heights();
});

function set_slide1() {
  //$("#transition_overlay").classList.remove("animated");
  $("#nav_slide").setAttribute("class", "slide1")
  $("#top_section").classList.add("topped");
  $("#middle_section").classList.remove("topped");
  $("#bottom_section").classList.remove("topped");
}

function set_slide2() {
  //$("#transition_overlay").classList.add("animated");
  $("#nav_slide").setAttribute("class", "slide2")
  $("#top_section").classList.remove("topped");
  $("#middle_section").classList.add("topped");
  $("#bottom_section").classList.remove("topped");
}

function set_slide3() {
  //$("#transition_overlay").classList.remove("animated");
  $("#nav_slide").setAttribute("class", "slide3");
  $("#top_section").classList.remove("topped");
  $("#middle_section").classList.remove("topped");
  $("#bottom_section").classList.add("topped");
}

window.addEventListener('scroll', function(e) {
  set_heights();
  let scroll_pos = window.pageYOffset;
  if(scroll_pos < height/4) {
    set_slide1();
  }
  if(scroll_pos > height/4 && scroll_pos < height/2) {
    set_slide2();
  }
  if(scroll_pos > height/2) {
    set_slide3();
  }
});

$(".dot1").onclick = function() {
  window.scrollTo(0, 0);
}
$(".dot2").onclick = function() {
  window.scrollTo(0, height/3);
}
$(".dot3").onclick = function() {
  window.scrollTo(0, height/1.5);
}

$("#mob_nav").onclick = function() {
  nav_toggle();
}

function nav_toggle() {
  $("#mob_nav").classList.toggle("active");
  document.getElementById("nav").classList.toggle("move");
}


let slide_position = 1;

$("#slide_left").onclick = function() {
  if(slide_position > 1) {
    slide_position--;
    $("#phones_animation").setAttribute("class", "slide_position_" + slide_position);
  }
}

$("#slide_right").onclick = function() {
  if(slide_position < 3) {
    slide_position++;
    $("#phones_animation").setAttribute("class", "slide_position_" + slide_position);
  }
}

set_heights();
