let anim;
let params = {
    container: document.getElementById('lottie'),
    path: 'js/data.json',
    renderer: 'svg',
    loop: false,
    autoplay: true
};

function init() {
    anim = lottie.loadAnimation(params);
    anim.onComplete = function(e) {
    document.getElementById('main').classList.remove("invis");
    setTimeout(function(){
      document.getElementById('main').classList.remove("transp");
    }, 50);
    setTimeout(function(){
      document.getElementById('bottom_section').classList.remove("invis");
      setTimeout(function(){
        document.getElementById('bottom_section').classList.remove("transp");
      }, 50);
    }, 350);
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  init();
})