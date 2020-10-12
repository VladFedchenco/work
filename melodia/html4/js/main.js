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
