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
    percentToFinish: 40,
    nPoints: 200,
    pointSize: 3,
    callback: function () {
      stop_sound();
      if(game_type == 1) {
        $("#sound").setAttribute('src', 'audio/magic.mp3');
        $("#sound").loop = false;
        $("#sound").play();
      }
      if(game_type == 2) {
        setTimeout(function(){
          $("#sound").setAttribute('src', 'audio/magic.mp3');
          $("#sound").loop = false;
          $("#sound").play();
        }, 500);
      }
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', show_ice);
      window.removeEventListener('mouseup', remove_ice);
      window.removeEventListener('touchmove', moveCursorMobile);
      window.removeEventListener('touchstart', show_ice_mobile);
      window.removeEventListener('touchend', remove_ice);
      custom_cursor.classList.add("invis");
      $('#ice').classList.remove("active");
      $("body").classList.remove("hide_cursor");

      ticket.setAttribute("style", "display: none");
      $('#prize_head').setAttribute("class", "");
      $('#prize_name').setAttribute("class", "");
      $('#prize_underline').classList.remove("invis");
      $('#note').setAttribute("class", "");
      if(game_type == 2) {
        $('#prize').classList.add("play");
        $('#prize_underline').classList.add("icn");
      }
      setTimeout(function(){
        if(game_type == 1) {
          $('#info_block').setAttribute("class", "");
        }
        if(game_type == 2) {
          $('#more_block').setAttribute("class", "");
          $('#wide_content').setAttribute("class", "");
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

let game_type;

request.onload = function() {
  const prizeData = request.response;
  $("#prize_head").innerText = prizeData.head;
  $("#prize_head").style.backgroundImage = `url(${prizeData.head_img})`;
  $("#prize_id").setAttribute("src", prizeData.prize_id);
  $("#prize_name").innerHTML = prizeData.prize_name;
  $("#prize_underline").innerHTML = prizeData.prize_underline;
  $("#note").innerHTML = prizeData.note;
  $("#ballot1").textContent = prizeData.ballots;
  $("#ballot2").textContent = prizeData.ballots;
  prizeData.head == "YOU’VE WON!" ? game_type = 1 : game_type = 2;
  if(game_type == 2) {
    $('#ballot').classList.add("vis");
  }
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
  $('#ice').style.left = `${mouseX}px`;
  $('#ice').style.top = `${mouseY}px`;
}

const moveCursorMobile = (e)=> {
  const mouseY = e.touches[0].clientY;
  const mouseX = e.touches[0].clientX;
  custom_cursor.style.left = `${mouseX}px`;
  custom_cursor.style.top = `${mouseY}px`;
  $('#ice').style.left = `${mouseX}px`;
  $('#ice').style.top = `${mouseY}px`;
}

$("#close_bttn").addEventListener("click", function(){
  $("#popup").classList.add("invis");
});

function show_ice() {
  $('#ice').classList.add("active");
  play_sound();
}

function show_ice_mobile() {
  $('#ice').classList.add("active");
  if(!android_os) {
    play_sound();
  }
}

function remove_ice() {
  $('#ice').classList.remove("active");
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

function ticket_reveal_mobile(e) {

  const mouseY = e.touches[0].clientY;
  const mouseX = e.touches[0].clientX;
  custom_cursor.style.left = `${mouseX}px`;
  custom_cursor.style.top = `${mouseY}px`;
  $('#ice').style.left = `${mouseX}px`;
  $('#ice').style.top = `${mouseY}px`;

  window.addEventListener('touchmove', moveCursorMobile);
  window.addEventListener('touchstart', show_ice_mobile);
  window.addEventListener('touchend', remove_ice);

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