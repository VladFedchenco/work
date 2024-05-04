let fire_visible = true;
let body_event = true;

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  //$("#info").innerHTML =  prizeData.info;
}

function $(sel) {
  return document.querySelector(sel);
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop = true;
}

const sc = new ScratchCard('#card', {
  scratchType: SCRATCH_TYPE.BRUSH,
  containerWidth: 302,
  containerHeight: 326,
  brushSrc: 'imgs/brush.png',
  imageForwardSrc: 'imgs/campfire.png',
  imageBackgroundSrc: 'imgs/empty.png',
  enabledPercentUpdate: true,
  percentToFinish: 70,
  callback: function () {
    $("#sound").pause();
    $("#sound").currentTime = 0;
    $("#sound").setAttribute('src', 'mp3/win.mp3');
    $("#sound").loop = false;
    $("#sound").play();
    $("#marshmallow").classList.add("hidden");
  }
})

sc.init().then(() => {
  sc.canvas.addEventListener('scratch.move', () => {
    if(fire_visible) {
      fire_visible = false;
      $("#bonfire").style.display = "none";
      $("#card").classList.add("no_pointer");
      $("#marshmallow").setAttribute("src", "imgs/flames.svg");
      $("#pointer").classList.add("invis");
      start_scratching();
    }
  })
}).catch((error) => {
  console.log("error");
});

const custom_cursor = $('#marshmallow');

const moveCursor = (e)=> {
  const mouseY = e.clientY;
  const mouseX = e.clientX;
  custom_cursor.style.left = `${mouseX}px`;
  custom_cursor.style.top = `${mouseY - 100}px`;
}

const moveCursorMobile = (e)=> {
  const mouseY = e.touches[0].clientY;
  const mouseX = e.touches[0].clientX;
  custom_cursor.style.left = `${mouseX}px`;
  custom_cursor.style.top = `${mouseY - 100}px`;
}

document.body.addEventListener("mousedown", function () {
    play_sound();
})

document.body.addEventListener("touchstart", function () {
    play_sound();
})

document.body.addEventListener("touchend", function () {
    play_sound();
})

function start_scratching() {
  let ticket = $(".sc__canvas");
  ticket.addEventListener("mousemove", moveCursor);
  ticket.addEventListener("touchmove", moveCursorMobile);
}
