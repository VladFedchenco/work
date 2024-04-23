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
      play_sound();
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('touchmove', moveCursorMobile);
      custom_cursor.classList.add("invis");
      $("body").classList.remove("hide_cursor");

      ticket.setAttribute("style", "display: none");
      $('#prize_head').classList.remove("invis");
      $('#note').classList.remove("invis");
      setTimeout(function(){
        if(game_type == 1) {
          $('#info_block').classList.remove("invis");
        }
        if(game_type == 2) {
          $('#redeem_block').classList.add("invis");
          $('#info_block').classList.remove("invis");
        }
        if(game_type == 3) {
          $('#more_block').classList.remove("invis");
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

function play_sound() {
  $("#sound").play();
}

function ticket_reveal(e) {
  const mouseY = e.clientY;
  const mouseX = e.clientX;
  custom_cursor.style.left = `${mouseX}px`;
  custom_cursor.style.top = `${mouseY}px`;
  window.addEventListener('mousemove', moveCursor);
  reveal_prize();
}

function ticket_reveal_mobile(e) {
  const mouseY = e.touches[0].clientY;
  const mouseX = e.touches[0].clientX;
  custom_cursor.style.left = `${mouseX}px`;
  custom_cursor.style.top = `${mouseY}px`;
  window.addEventListener('touchmove', moveCursorMobile);
  reveal_prize();
}

function reveal_prize() {
  $("body").classList.add("hide_cursor");
  custom_cursor.setAttribute("src", "imgs/hand.svg");

  $('#tickt2x').setAttribute("class", "invis");
  $('#prize').setAttribute("style", "opacity: 1");
}

function $(sel) {
  return document.querySelector(sel);
}