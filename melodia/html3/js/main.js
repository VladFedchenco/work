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

let section_num = 1;
let section_lock = false;
let section_lock2 = false;

function fsection_num(num) {
  if(num == 1) {
    set_slide1();
  }
  if(num == 2) {
    set_slide2();
  }
  if(num == 3) {
    set_slide3();
  }
}

window.addEventListener('wheel', function(event) {
 if (event.deltaY < 0) {
  if (section_num > 1) {
    if(!section_lock && event.deltaY < -40) {
      section_num--;
      section_lock = true;
      fsection_num(section_num);
      setTimeout(function(){
        section_lock = false;
      }, 700);
    }
  }
 }
 else if (event.deltaY > 0) {
  if (section_num < 3) {
    if(!section_lock && event.deltaY > 40) {
      section_num++;
      section_lock = true;
      fsection_num(section_num);
      setTimeout(function(){
        section_lock = false;
      }, 700);
    }
  }
 }
});

window.addEventListener('keyup' /* or keyup, see what feels better when you test it */, e => {
  switch (e.code) {
    case "ArrowUp":
      if (section_num > 1) {
        section_num--;
        fsection_num(section_num);
      }
      break;
    case "ArrowDown":
      if (section_num < 3) {
        section_num++;
        fsection_num(section_num);
      }
      break;
    default:
      /* don't do anything */
  }
});

$(".dot1").onclick = function() {
  set_slide1();
}
$(".dot2").onclick = function() {
  set_slide2();
}
$(".dot3").onclick = function() {
  set_slide3();
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
    $("#slide_right").setAttribute("style", "");
    $("#phones_animation").setAttribute("class", "slide_position_" + slide_position);
  }
  if(slide_position == 1) {
    $("#slide_left").setAttribute("style", "opacity: .2");
  }
}

$("#slide_right").onclick = function() {
  if(slide_position < 3) {
    slide_position++;
    $("#slide_left").setAttribute("style", "");
    $("#phones_animation").setAttribute("class", "slide_position_" + slide_position);
  }
  if(slide_position == 3) {
    $("#slide_right").setAttribute("style", "opacity: .2");
  }
}
