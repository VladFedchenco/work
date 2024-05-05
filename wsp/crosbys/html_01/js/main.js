let fire_visible = true;
let body_event = true;
let prize_headline;

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  prize_headline = prizeData.headline;
  $("#prize_img").setAttribute("src", prizeData.img);
  $("#prize_ttl").innerHTML = prizeData.title;
  $("#subtitle").innerHTML = prizeData.subtitle;
  $("#prize_info").innerHTML = prizeData.note;
  $("#chances").innerHTML = prizeData.sweepstakes;
  $("#banner_item").innerHTML = prizeData.banner_item;
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
    document.body.removeEventListener("mousedown", play_sound);
    document.body.removeEventListener("touchstart", play_sound);
    document.body.removeEventListener("touchend", play_sound);
    $("#sound").pause();
    $("#sound").currentTime = 0;
    $("#sound").setAttribute('src', 'mp3/win.mp3');
    $("#sound").loop = false;
    $("#sound").play();
    $("#card").classList.add("inactive");
    $("#marshmallow").classList.add("hidden");
    $('#main_title').classList.remove("semitransparent");
    $("#main_title").classList.add("invis");
    setTimeout(function(){
      $("#main_title").innerHTML = prize_headline;
      $("#main_title").classList.remove("invis");
      $("#main_title").classList.add("ttl1");
      $("#more_info").classList.remove("hidden");
    }, 400);
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
      $('#main_title').classList.add("semitransparent");
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

document.body.addEventListener("mousedown", play_sound);
document.body.addEventListener("touchstart", play_sound);
document.body.addEventListener("touchend", play_sound);

function start_scratching() {
  let ticket = $(".sc__canvas");
  ticket.addEventListener("mousemove", moveCursor);
  ticket.addEventListener("touchmove", moveCursorMobile);
}

function $(sel) {
  return document.querySelector(sel);
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop = true;
}
