let el = document.getElementById("nav");

function nav_toggle() {
  el.classList.toggle("active");
  document.getElementById("top_nav").classList.toggle("hidden");
}

el.onclick = function() {
  nav_toggle();
}

function attachClickEvent() {
  var faq_all = document.querySelectorAll(".faq h4");
  for(i=0; i<faq_all.length; i++) {
    faq_all[i].addEventListener("click", toggle_faq);
  }
}

function toggle_faq(el) {
  let cur_el = el.target.nextElementSibling;
  cur_el.classList.toggle("hidden");
}

let didScroll;
let lastScrollTop = 0;
let delta = 5;
let navbar = document.querySelector('header');
let navbarHeight = navbar.offsetHeight;

window.addEventListener('scroll', function(e) {
    didScroll = true;
    if(window.scrollY < 50) {
      navbar.setAttribute("class", "");
    }
});

setInterval(function() {
    if (didScroll && window.scrollY > 50) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    let st = window.scrollY;

    if (Math.abs(lastScrollTop - st) <= delta)
        return;

    if (st > lastScrollTop && st > navbarHeight) {
        navbar.setAttribute("class", "nav-up");
    } else {
        navbar.setAttribute("class", "nav-down");
    }

    lastScrollTop = st;
}

window.onload = attachClickEvent;