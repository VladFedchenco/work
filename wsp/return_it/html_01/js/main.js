let game_type;

const randomNumber = Math.floor(Math.random() * 1000) + 1;

window.addEventListener('load', function () {

  let scContainer = $('#main_container');
  let sc = new ScratchCard('#main_container', {
    enabledPercentUpdate: true,
    scratchType: SCRATCH_TYPE.LINE,
    containerWidth: 302,
    containerHeight: 326,
    imageForwardSrc: "imgs/ticket.png",
    imageBackgroundSrc: 'imgs/empty.png',
    clearZoneRadius: 20,
    percentToFinish: 40,
    nPoints: 200,
    pointSize: 3,
    callback: function () {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('touchmove', moveCursorMobile);
      custom_cursor.classList.add("invis");
      $("body").classList.remove("hide_cursor");
      $("#head_title").classList.remove("invis");

      $("#sound").play();
      $("#sound").loop = false;

      ticket.setAttribute("style", "display: none");
      setTimeout(function(){
        custom_cursor.classList.add("hidden");
        $("#confetti").setAttribute("src", "imgs/confetti.svg?r=" + randomNumber);
      }, 300);
      setTimeout(function(){
        if(game_type == 1) {
          $('#info_block').classList.remove("invis");
        }
        if(game_type == 2) {
          $('#more_block').classList.remove("invis");
        }
      }, 3000);
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
  $("#head_title").innerText = prizeData.head;
  $("#prize_name").innerText = prizeData.prize_name;
  $("#prize_img").setAttribute("src", prizeData.prize_img);
  $("#next_ticket h2").innerHTML = prizeData.entries;
  $("#next_ticket h3").innerHTML = prizeData.entries_headline;
  $("#more_block h2").innerHTML = prizeData.entries;
  $("#more_block h3").innerHTML = prizeData.entries_headline;
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
  $("#ticket_note").classList.add("invis");
  custom_cursor.classList.add("no_animation");
  custom_cursor.setAttribute("src", "imgs/hand.svg");

  $('#tickt2x').setAttribute("class", "invis");
  $('#prize').setAttribute("style", "opacity: 1");
}

function $(sel) {
  return document.querySelector(sel);
}