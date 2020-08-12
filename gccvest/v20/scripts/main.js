function isMobile() {
  return (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}
function loadScript(url) {
  var head = document.getElementsByTagName("head")[0];
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  head.appendChild(script);
}

if (isMobile()) {
  loadScript("scripts/main_mobile.js");
} else {
  loadScript("scripts/main_desktop.js");
}

var counter = 1;
var slides = 3;
var clickable = true;
var slider = document.getElementById('hp_text_slider');
function slide_rotate_fw() {
  clickable = false;
  if(counter < slides) {
    counter++;
    slider.setAttribute("class", "slide" + counter);
  }
  setTimeout(function(){
    clickable = true;
  }, 10000);
}
function slide_rotate_bw() {
  clickable = false;
  if(counter > 1) {
    counter--;
    slider.setAttribute("class", "slide" + counter);
  }
  setTimeout(function(){
    clickable = true;
  }, 10000);
}
function slide_auto() {
  if (clickable) {
    if(counter < slides) {
      counter++;
      slider.setAttribute("class", "slide" + counter);
    } else {
      counter = 1;
      slider.setAttribute("class", "slide" + counter);
    }
  }
}
var autoslide = setInterval(function(){
  slide_auto();
}, 10000);

window.onorientationchange = function() { 
    var orientation = window.orientation; 
        switch(orientation) { 
            case 0:
            case 90:
            case -90: window.location.reload(); 
            break; } 
};
function pos_elements() {
  if (isMobile()) {
    if (window.innerWidth > 500 && window.innerWidth < 990) {
      document.getElementById('lsoon').setAttribute("style", "top:" + (window.innerHeight * .5 + 10) + "px");
      document.getElementById('title').setAttribute("style", "top:" + window.innerHeight * .21 + "px");
      document.getElementById('hp_text').setAttribute("style", "top:" + (window.innerHeight + 32) + "px");
      document.getElementById('nav_left').setAttribute("style", "top:" + (window.innerHeight + 120) + "px");
      document.getElementById('nav_right').setAttribute("style", "top:" + (window.innerHeight + 120) + "px");
    } else if (window.innerWidth < 500) {
      document.getElementById('lsoon').setAttribute("style", "top:" + (window.innerHeight * .5 + 10) + "px");
      document.getElementById('title').setAttribute("style", "top:" + (window.innerHeight - 130) + "px");
      document.getElementById('hp_text').setAttribute("style", "top:" + (window.innerHeight + 32) + "px");
      document.getElementById('nav_left').setAttribute("style", "top:" + (window.innerHeight + 190) + "px");
      document.getElementById('nav_right').setAttribute("style", "top:" + (window.innerHeight + 190) + "px");
    }
    document.getElementById('inv_areas').setAttribute("style", "top:" + (window.innerHeight - 50) + "px");
  } else {
    document.getElementById('lsoon').setAttribute("style", "top:" + window.innerHeight * .32 + "px");
    document.getElementById('title').setAttribute("style", "top:" + window.innerHeight * .56 + "px");
  }

  if ((window.innerHeight / window.innerWidth) > 0.64 ) {
      for(i=1; i<=6; i++) {
        document.getElementById('bttn_0' + i).setAttribute("style", "display: none");
      }
    } else {
      for(i=1; i<=6; i++) {
        document.getElementById('bttn_0' + i).setAttribute("style", "");
      }
    }
  }
window.addEventListener('resize', function(event){
  pos_elements();
});
pos_elements();