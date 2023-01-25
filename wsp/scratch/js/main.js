window.addEventListener('load', function () {

  let scContainer = document.getElementById('scratch_container');
  let sc = new ScratchCard('#scratch_container', {
    enabledPercentUpdate: true,
    scratchType: SCRATCH_TYPE.LINE,
    containerWidth: 302,
    containerHeight: 326,
    imageForwardSrc: 'imgs/ticket.png',
    imageBackgroundSrc: 'imgs/empty.png',
    clearZoneRadius: 10,
    percentToFinish: 30,
    nPoints: 200,
    pointSize: 3,
    callback: function () {
      reveal();
    }
  })

  sc.init();

  let ticket = document.querySelector(".sc__canvas");
  let clientX;
  let clientY;

  function reveal() {
    ticket.setAttribute("style", "display: none");
    document.getElementById('trouble').style.display = "none";
    cursorPointed.style.display = 'none';
    document.querySelector("body").setAttribute("style", "");
    document.getElementById("content").style.minHeight = "740px";
    document.getElementById("valid").setAttribute("style", "");
    setTimeout(function(){
      document.getElementById("valid").setAttribute("class", "");
      document.getElementById("leprechaum").setAttribute("style", "");
    }, 50);
  }
  
  ticket.onmousedown = function() {
    document.getElementById("click_anim").setAttribute("class", "invis");
    document.getElementById("click_text").setAttribute("class", "invis");
    document.getElementById("prize").setAttribute("style", "opacity: 1");
    document.querySelector("body").style.cursor = "none";
    cursorPointed.style.display = "block";
    setTimeout(function(){
      document.getElementById("click_anim").style.display = "none";
      document.getElementById("click_text").style.display = "none";
    }, 400);
  };

  document.getElementById("reveal_link").onclick = function() {
    document.getElementById("click_anim").setAttribute("class", "invis");
    document.getElementById("click_text").setAttribute("class", "invis");
    document.getElementById("prize").setAttribute("style", "opacity: 1");
    document.getElementById("click_anim").style.display = "none";
    document.getElementById("click_text").style.display = "none";
    reveal();
  }

  ticket.ontouchstart = function(e) {
    document.getElementById("click_anim").setAttribute("class", "invis");
    document.getElementById("click_text").setAttribute("class", "invis");
    document.getElementById("prize").setAttribute("style", "opacity: 1");
    cursorPointed.style.display = "block";
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
    cursorPointed.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
    setTimeout(function(){
      document.getElementById("click_anim").style.display = "none";
      document.getElementById("click_text").style.display = "none";
    }, 400);
  }

  ticket.ontouchmove = function(e) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
    cursorPointed.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
  }

  const cursorPointed = document.querySelector("#cursor");

  const moveCursor = (e)=> {
    const mouseY = e.pageY;
    const mouseX = e.pageX;
    
    cursorPointed.style.top = `${mouseY}px`;
    cursorPointed.style.left = `${mouseX}px`;
   
  }

  window.addEventListener('mousemove', moveCursor);

});

let requestURL = 'js/data.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  $("#prize_head").innerText = prizeData.head;
  $("#prize_id").setAttribute("src", prizeData.prize_id);
  $("#prize_name").innerText = prizeData.prize_name;
  $("#prize_underline").innerText = prizeData.prize_underline;
}

function $(sel) {
  return document.querySelector(sel);
}