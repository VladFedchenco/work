/* const randomNumber = Math.floor(Math.random() * 1000) + 1;

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  let ballots_img = prizeData.ballots_img;
  $("#ballots").setAttribute("src", ballots_img);
  if($("#ballot_text")) {
    $("#ballot_text").innerHTML = prizeData.ballots_amount;
  }
}

$("#start_bttn").addEventListener("click", function(){
  reveal();
});

$("#animation").addEventListener("click", function(){
  reveal();
});

function reveal() {
  $("#main").classList.add("play");
  setTimeout(function(){
    $("#confetti").setAttribute("href", "imgs/confetti.svg?v=" + randomNumber);
    $("#click_hand").classList.add("invis");
  }, 100);
  setTimeout(function(){
    $("#cap").classList.add("open");
  }, 300);
  setTimeout(function(){
    play_sound();
  }, 600);
  setTimeout(function(){
    $("#wrapper").classList.add("invis");
    $("#prize").classList.remove("hidden");
  }, 2500);
  setTimeout(function(){
    $("#ballots").classList.add("reveal");
  }, 3400);
  setTimeout(function(){
    $("#prize").classList.add("full");
  }, 3800);
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop=false;
} */

function $(sel) {
  return document.querySelector(sel);
}

let ballots = 1;

function pathName(peg) {
  let sector = 0;
  if (peg >= 1 && peg <= 4) {
    switch (ballots) {
      case 2:
      sector = 1;
      break;
      case 5:
      sector = 2;
      break;
      case 10:
      sector = 3;
      break;
      case 1:
      sector = 4;
      break;
    }
  }
  if (peg >= 5 && peg <= 7) {
    switch (ballots) {
      case 2:
      sector = 7;
      break;
      case 5:
      sector = 6;
      break;
      case 10:
      sector = 5;
      break;
      case 1:
      sector = 4;
      break;
    }
  }
  return "p" + peg + "_" + sector;
}

const ball = $('#ball');
const svg = ball.ownerSVGElement;

const SNAP_POSITIONS = [76, 113, 152, 188, 229, 264, 300];

const MIN_X = SNAP_POSITIONS[0];
const MAX_X = SNAP_POSITIONS[SNAP_POSITIONS.length - 1];

const FIXED_Y = 124;

function setupDrag(startEvent) {
  startEvent.preventDefault();
  ball.style.cursor = 'grabbing';
  $("#main").classList.add("play");

  const isTouch = startEvent.type === 'touchstart';
  const clientX = isTouch ? startEvent.targetTouches[0].clientX : startEvent.clientX;

  const rect = svg.getBoundingClientRect();
  const initialInputX = clientX - rect.left;

  let initialX = 188;
  const currentTransform = ball.style.transform;
  const match = currentTransform.match(/translate\(([-\d.]+)px/);
  if (match) {
    initialX = parseFloat(match[1]);
  }

  const offsetX = initialInputX - initialX;
  let currentX = initialX;

  function onMove(moveEvent) {
    const currentClientX = isTouch ? moveEvent.targetTouches[0].clientX : moveEvent.clientX;
    let newX = (currentClientX - rect.left) - offsetX;

    if (newX < MIN_X) newX = MIN_X;
    if (newX > MAX_X) newX = MAX_X;

    currentX = newX;
    
    ball.style.transform = `translate(${newX}px, ${FIXED_Y}px)`;
  }

  function onEnd() {
    ball.style.cursor = 'grab';
    
    const closestX = SNAP_POSITIONS.reduce((prev, curr) => {
      return Math.abs(curr - currentX) < Math.abs(prev - currentX) ? curr : prev;
    });

    ball.style.transform = `translate(${closestX}px, ${FIXED_Y}px)`;

    switch (closestX) {
      case 76:
      $("#ball").classList.add(pathName(1));
      break;
      case 113:
      $("#ball").classList.add(pathName(2));
      break;
      case 152:
      $("#ball").classList.add(pathName(3));
      break;
      case 188:
      $("#ball").classList.add(pathName(4));
      break;
      case 229:
      $("#ball").classList.add(pathName(5));
      break;
      case 264:
      $("#ball").classList.add(pathName(6));
      break;
      case 300:
      $("#ball").classList.add(pathName(7));
      break;
      default:
        console.log("wrong value");
    }

    setTimeout(function(){
      $("#wrapper").classList.add("invis");
      $("#prize").classList.remove("hidden");
    }, 4200);

    setTimeout(function(){
      $("#prize").classList.add("full");
    }, 5000);
    
    if (isTouch) {
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    } else {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
    }
  }

  if (isTouch) {
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
  } else {
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);
  }
}

ball.addEventListener('mousedown', setupDrag);
ball.addEventListener('touchstart', setupDrag, { passive: false });
