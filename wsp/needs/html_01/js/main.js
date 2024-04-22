let game_type;
let prize_img = ["imgs/ticket_a.png", "imgs/ticket_b.png", "imgs/ticket_c.png"];
let randomNumber = Math.floor(Math.random()*2.9);
$('#tickt2x').setAttribute("src", prize_img[randomNumber]);

window.addEventListener('load', function () {

  let scContainer = $('#main_container');
  let sc = new ScratchCard('#main_container', {
    enabledPercentUpdate: true,
    scratchType: SCRATCH_TYPE.LINE,
    containerWidth: 302,
    containerHeight: 326,
    imageForwardSrc: prize_img[randomNumber],
    imageBackgroundSrc: 'imgs/empty.png',
    clearZoneRadius: 20,
    percentToFinish: 40,
    nPoints: 200,
    pointSize: 3,
    callback: function () {
      stop_sound();
      $("#sound").setAttribute('src', 'audio/magic.mp3');
      $("#sound").loop = false;
      $("#sound").play();
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', play_scratch);
      window.removeEventListener('mouseup', stop_scratch);
      window.removeEventListener('touchmove', moveCursorMobile);
      window.removeEventListener('touchstart', play_scratch_mobile);
      window.removeEventListener('touchend', stop_scratch);
      custom_cursor.classList.add("invis");
      $("body").classList.remove("hide_cursor");

      ticket.setAttribute("style", "display: none");
      $('#prize_head').setAttribute("class", "");
      $('#note').setAttribute("class", "");
      setTimeout(function(){
        if(game_type == 1) {
          $('#info_block').setAttribute("class", "");
        }
        if(game_type == 2) {
          $('#redeem_block').classList.add("invis");
          $('#info_block').setAttribute("class", "");
        }
        if(game_type == 3) {
          $('#more_block').setAttribute("class", "");
        }
      }, 500);
    }
  })
  sc.init().then(() => {
    sc.canvas.addEventListener('scratch.move', (e) => {
      // let percent = sc.getPercent().toFixed(2)
      // console.log(percent)
    })
  }).catch((error) => {
    console.log(error.message);
  });

  let ticket = $(".sc__canvas");
  ticket.addEventListener("mousedown", ticket_reveal);
  ticket.addEventListener("touchstart", ticket_reveal_mobile);

});

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  game_type = prizeData.game_type;
  $("#prize_head").innerText = prizeData.head;
  $("#prize_head").style.backgroundImage = `url(${prizeData.head_img})`;
  $("#prize_id").setAttribute("src", prizeData.prize_id);
  $("#prize_name").innerText = prizeData.prize_name;
  $("#prize_underline").innerText = prizeData.prize_underline;
  $("#note").innerHTML = prizeData.note;
}

let android_os = false;

const getMobileOS = () => {
  const ua = navigator.userAgent
  if (/android/i.test(ua)) {
    android_os = true;
    return "Android"
  }
  else if ((/iPad|iPhone|iPod/.test(ua)) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
    return "iOS"
  }
  return "Other"
}

const custom_cursor = $('#custom_cursor');

const moveCursor = (e)=> {
  const mouseY = e.clientY;
  const mouseX = e.clientX;
  custom_cursor.style.left = `${mouseX}px`;
  custom_cursor.style.top = `${mouseY}px`;
}

const moveCursorMobile = (e)=> {
  const mouseY = e.touches[0].clientY;
  const mouseX = e.touches[0].clientX;
  custom_cursor.style.left = `${mouseX}px`;
  custom_cursor.style.top = `${mouseY}px`;
}

function play_scratch() {
  play_sound();
}

function stop_scratch() {
  stop_sound();
}

function play_scratch_mobile() {
  if(!android_os) {
    play_sound();
  }
}

function stop_scratch_mobile() {
  if(!android_os) {
    stop_sound();
  }
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop = true;
}

function stop_sound() {
  $("#sound").pause();
  $("#sound").currentTime = 0;
}

function ticket_reveal(e) {

  const mouseY = e.clientY;
  const mouseX = e.clientX;
  custom_cursor.style.left = `${mouseX}px`;
  custom_cursor.style.top = `${mouseY}px`;

  window.addEventListener('mousemove', moveCursor);
  window.addEventListener('mousedown', play_scratch);
  window.addEventListener('mouseup', stop_scratch);

  custom_cursor.classList.remove("initial");
  custom_cursor.classList.add("active");
  $("body").classList.add("hide_cursor");
  custom_cursor.setAttribute("src", "imgs/hand.svg");


  $('#tickt2x').setAttribute("class", "invis");
  $('#prize').setAttribute("style", "opacity: 1");
}

function ticket_reveal_mobile(e) {

  const mouseY = e.touches[0].clientY;
  const mouseX = e.touches[0].clientX;
  custom_cursor.style.left = `${mouseX}px`;
  custom_cursor.style.top = `${mouseY}px`;

  window.addEventListener('touchmove', moveCursorMobile);
  window.addEventListener('mousedown', play_scratch_mobile);
  window.addEventListener('mouseup', stop_scratch_mobile);

  custom_cursor.classList.remove("initial");
  custom_cursor.classList.add("active");
  $("body").classList.add("hide_cursor");
  custom_cursor.setAttribute("src", "imgs/hand.svg");

  $('#tickt2x').setAttribute("class", "invis");
  $('#prize').setAttribute("style", "opacity: 1");
}

function $(sel) {
  return document.querySelector(sel);
}