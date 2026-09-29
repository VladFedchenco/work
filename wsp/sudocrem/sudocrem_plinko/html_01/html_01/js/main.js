let total_amount, ballots_amount;
let clmn_amount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let fields = [$("#c1"), $("#c2"), $("#c3"), $("#c4"), $("#c5"), $("#c6"), $("#c7"), $("#c8"), $("#c9"), $("#c10"), $("#c11"), $("#c12")];
let labels = [$("#l1"), $("#l2"), $("#l3"), $("#l4"), $("#l5"), $("#l6"), $("#l7"), $("#l8"), $("#l9"), $("#l10"), $("#l11"), $("#l12")];
const p = document.querySelectorAll('.bttn_plus');
const m = document.querySelectorAll('.bttn_minus');
const ball = $('#ball');
const svg = ball.ownerSVGElement;
const SNAP_POSITIONS = [76, 113, 152, 188, 229, 264, 300];
const MIN_X = SNAP_POSITIONS[0];
const MAX_X = SNAP_POSITIONS[SNAP_POSITIONS.length - 1];
const FIXED_Y = 124;

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  ballots_amount = prizeData.ballots_amount;
  total_amount = ballots_amount;
  $("#entries_left").innerHTML = ballots_amount;
  switch (ballots_amount) {
    case 2:
      $("#ballot_amount").setAttribute("src", "imgs/ballot_2.png");
    break;
    case 5:
      $("#ballot_amount").setAttribute("src", "imgs/ballot_5.png");
    break;
    case 10:
      $("#ballot_amount").setAttribute("src", "imgs/ballot_10.png");
    break;
  }
}

for (let i = 0; i < 12; i++) {
  (function(index) {
    let amount = clmn_amount[index];
    let field = fields[index];
    let label = labels[index];

    p[index].addEventListener("click", () => {
      amount = amount_plus(amount);
      counterBttnPlus(amount, field, label);
    }, false);

    m[index].addEventListener("click", () => {
      amount = amount_minus(amount);
      counterBttnMinus(amount, field, label);
    }, false);
  })(i);
}

$("#enter_ballots").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
  play_sound();
  for (let i = 0; i < 12; i++) {
    p[i].classList.add("invis");
    m[i].classList.add("invis");
  }
  $("#ballots_bottom").classList.add("hidden");
  $("#ballots_available").classList.remove("hidden");
  $("#ballot_init").classList.add("hidden");
  setTimeout(function(){
    $("#ballots_available").classList.remove("invis");
    $("#ballots_bottom").classList.add("invis");
    $("#congrats").classList.remove("hidden");
  }, 100);
}, false);

ball.addEventListener('mousedown', setupDrag);
ball.addEventListener('touchstart', setupDrag, { passive: false });

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
      play_sound();
      if(ballots_amount == 1) {
        $("#prize").classList.remove("hidden");
      } else {
        $("#ballot_init").classList.remove("hidden");
      }
    }, 4200);

    setTimeout(function(){
      if(ballots_amount == 1) {
        $("#prize").classList.add("full");
      } else {
        $("#ballot_items").classList.remove("hidden");
      }
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

function play_sound() {
  $("#sound").play();
  $("#sound").loop=false;
}

function $(sel) {
  return document.querySelector(sel);
}

function pathName(peg) {
  let sector = 0;
  if (peg >= 1 && peg <= 4) {
    switch (ballots_amount) {
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
    switch (ballots_amount) {
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

function counterBttnPlus(a, f, l) {
  f.innerHTML = a;
  if(a == 1) {
    l.innerHTML = "BALLOT"
  } else {
    l.innerHTML = "BALLOTS"
  }
  $("#entries_left").innerHTML = ballots_amount;
  if(ballots_amount == 0) {
    $("#enter_ballots").classList.remove("disable");
  }
}

function counterBttnMinus(a, f, l) {
  f.innerHTML = a;
  if(a == 1) {
    l.innerHTML = "BALLOT"
  } else {
    l.innerHTML = "BALLOTS"
  }
  $("#entries_left").innerHTML = ballots_amount;
  if(ballots_amount > 0) {
    $("#enter_ballots").classList.add("disable");
  }
}

function amount_plus(num) {
  if(num < 30) {
    if(ballots_amount > 0) {
      num++;
      ballots_amount--;
    }
  }
  return num;
}

function amount_minus(num) {
  if(num > 0) {
    if(ballots_amount < total_amount) {
      num--;
      ballots_amount++;
    }
  }
  return num;
}
