window.addEventListener('load', function () {

  let scContainer = $('#main_container');
  let sc = new ScratchCard('#main_container', {
    enabledPercentUpdate: true,
    scratchType: SCRATCH_TYPE.LINE,
    containerWidth: 302,
    containerHeight: 302,
    imageForwardSrc: 'imgs/ticket.png',
    imageBackgroundSrc: 'imgs/empty.png',
    clearZoneRadius: 20,
    percentToFinish: 60,
    nPoints: 200,
    pointSize: 3,
    callback: function () {
      stop_sound();
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', show_ice);
      window.removeEventListener('mouseup', remove_ice);
      custom_cursor.classList.add("invis");
      $('#ice').classList.remove("active");
      $("body").classList.remove("hide_cursor");

      ticket.setAttribute("style", "display: none");
      $('#prize_head').setAttribute("class", "");
      $('#note').setAttribute("class", "");
      setTimeout(function(){
        $('#info_block').setAttribute("class", "");
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
  ticket.addEventListener("touchstart", ticket_reveal);

});

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
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
  $('#ice').style.left = `${mouseX}px`;
  $('#ice').style.top = `${mouseY}px`;
}

function show_ice() {
  $('#ice').classList.add("active");
  play_sound();
}

function remove_ice() {
  $('#ice').classList.remove("active");
  stop_sound();
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
  $('#ice').style.left = `${mouseX}px`;
  $('#ice').style.top = `${mouseY}px`;

  window.addEventListener('mousemove', moveCursor);
  window.addEventListener('mousedown', show_ice);
  window.addEventListener('mouseup', remove_ice);

  custom_cursor.classList.remove("initial");
  custom_cursor.classList.add("active");
  $("body").classList.add("hide_cursor");

  $('#tickt2x').setAttribute("class", "invis");
  $('#click_text').setAttribute("class", "invis");
  $('#prize').setAttribute("style", "opacity: 1");
  setTimeout(function(){
    $('#click_text').style.display = "none";
  }, 400);
}

function $(sel) {
  return document.querySelector(sel);
}