let game_type;
let main_title;
const custom_cursor = $('#custom_cursor');

window.addEventListener('load', function () {
  let sc = new ScratchCard('#main_container', {
    enabledPercentUpdate: true,
    scratchType: SCRATCH_TYPE.LINE,
    containerWidth: 302,
    containerHeight: 302,
    imageForwardSrc: 'imgs/ticket.png',
    imageBackgroundSrc: 'imgs/empty.png',
    clearZoneRadius: 36,
    percentToFinish: 40,
    nPoints: 200,
    pointSize: 3,
    callback: function () {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('touchmove', moveCursorMobile);
      custom_cursor.classList.add("invis");
      $("body").classList.remove("hide_cursor");

      ticket.setAttribute("style", "display: none");
      $("#rewards_ttl_wrapper").classList.add("hidden");
      setTimeout(function(){
        play_sound();
        custom_cursor.classList.add("none");
        if (game_type == 1) {
          $('#info_block').classList.remove("invis");
        }
        if (game_type == 2) {
          $('#more_block').classList.remove("invis");
        }
        $("#top_ttl").innerHTML = main_title;
        $("#rewards_ttl").classList.add("reveal");
        $("#rewards_ttl_wrapper").classList.remove("hidden");
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
  $("#prize_num").innerHTML = prizeData.num;
  $("#prize_name").innerHTML = prizeData.prize_name;
  $("#prize_underline").innerHTML = prizeData.prize_underline;
  main_title = prizeData.head;
  if(game_type == 2) {
    $('#units').classList.add("invis");
  }
  setTimeout(function(){
    $("#rewards_ttl img").classList.remove("vis");
    $("#top_ttl").classList.add("vis");
  }, 2000);
}

const moveCursor = (e)=> {
  const mouseY = e.clientY;
  const mouseX = e.clientX;
  cursor_events(mouseX, mouseY);
}

const moveCursorMobile = (e)=> {
  const mouseY = e.touches[0].clientY;
  const mouseX = e.touches[0].clientX;
  cursor_events(mouseX, mouseY);
}

function play_sound() {
  $("#sound").play();
  $("#sound").loop = false;;
}

function ticket_reveal(e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  cursor_events(mouseX, mouseY);
  reveal_events();
  window.addEventListener('mousemove', moveCursor);
}

function ticket_reveal_mobile(e) {
  const mouseX = e.touches[0].clientX;
  const mouseY = e.touches[0].clientY;
  cursor_events(mouseX, mouseY);
  reveal_events();
  window.addEventListener('touchmove', moveCursorMobile);
}

function cursor_events(mouseX, mouseY) {
  custom_cursor.style.left = `${mouseX}px`;
  custom_cursor.style.top = `${mouseY}px`;
}

function reveal_events() {
  $("#prize_container").classList.remove("invis");
  custom_cursor.classList.remove("initial");
  custom_cursor.classList.add("active");
  $("body").classList.add("hide_cursor");
  $('#tickt2x').setAttribute("class", "invis");
}

function $(sel) {
  return document.querySelector(sel);
}