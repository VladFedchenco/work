function nav_toggle() {
  el.classList.toggle("active");
  document.getElementById("top_nav").classList.toggle("hidden");
}

function toggle_faq(el) {
  let cur_el = el.target.nextElementSibling;
  cur_el.classList.toggle("hidden");
}

function read_more_toggle(el) {
  let text_body = el.target.previousElementSibling;
  el.target.classList.toggle("hidden");
  text_body.classList.toggle("hidden");
  text_body.previousElementSibling.classList.toggle("hidden");
}

let el = document.getElementById("nav");
el.onclick = function() {
  nav_toggle();
}

function attachClickEvent() {
  let faq_all = document.querySelectorAll(".faq h4");
  for(i=0; i<faq_all.length; i++) {
    faq_all[i].addEventListener("click", toggle_faq);
  }
  let nav_all = document.querySelectorAll("#top_nav a");
  for(i=0; i<nav_all.length; i++) {
    nav_all[i].addEventListener("click", nav_toggle);
  }
  let read_more_all = document.querySelectorAll(".read_more");
  for(i=0; i<read_more_all.length; i++) {
    read_more_all[i].addEventListener("click", read_more_toggle);
  }
  let form_block = document.querySelector("form");
  form_block.addEventListener("submit", function(event) {
    event.preventDefault();
    let contact_name = document.querySelector("#contact_name");
    let contact_email = document.querySelector("#contact_email");
    let contact_subject = document.querySelector("#contact_subject");
    let contact_message = document.querySelector("#contact_message");
    let contact_sent = document.querySelector("#sent_ok");
    contact_name.setAttribute("style", "background-color: #fff");
    contact_email.setAttribute("style", "background-color: #fff");
    contact_subject.setAttribute("style", "background-color: #fff");
    contact_message.setAttribute("style", "background-color: #fff");
    if (!contact_name.value || !contact_email.value || !contact_subject.value || !contact_message.value) {
      alert("All required fields have to be filled.");
      if(!contact_name.value) {
        contact_name.setAttribute("style", "background-color: #ffe5bf")
      };
      if(!contact_email.value) {
        contact_email.setAttribute("style", "background-color: #ffe5bf")
      };
      if(!contact_subject.value) {
        contact_subject.setAttribute("style", "background-color: #ffe5bf")
      };
      if(!contact_message.value) {
        contact_message.setAttribute("style", "background-color: #ffe5bf")
      };
    }
    setTimeout(function(){
      contact_sent.classList.add("none");
      setTimeout(function(){
        contact_sent.classList.add("vis");
        setTimeout(function(){
          contact_sent.classList.remove("vis");
          setTimeout(function(){
            contact_sent.classList.remove("none");
          }, 100);
        }, 3000);
      }, 100);
    }, 100);
  });
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