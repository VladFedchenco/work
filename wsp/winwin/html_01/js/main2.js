let ctx, initial_img, star, star_counter, bttn_01, bttn_02, curl_counter, curl_delay, imgs_loaded, hover_state, reveal_next;

let cnvs = $('#main_canvas');
let anim_play = true;
let game_start = false;
let curl = [];
let img_preload = [];

let requestURL = 'js/data_v2.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;

  $("#prize_img").setAttribute("src", prizeData.prize_id);
  $("#prize_txt1").innerHTML = prizeData.headline1;
  $("#prize_txt2").innerHTML = prizeData.headline2;

  if (prizeData.headline3 != "") {
    $("#prize_txt3").innerHTML = prizeData.headline3;
  } else {
    $("#prize_txt3").style.display = "none";
  }

  prizeData.reveal_next ? reveal_next = true : reveal_next = false;

  init();

}

function init() {

  ctx = cnvs.getContext('2d');

  initial_img = new Image();
  initial_img.src = 'imgs/winwin_initial.png';
  img_preload[0] = false;
  initial_img.onload = function() {
    img_preload[0] = true;
  }

  bttn_01 = new Image();
  bttn_01.src = 'imgs/click_btn_01.png';
  img_preload[1] = false;
  bttn_01.onload = function() {
    img_preload[1] = true;
  }

  bttn_02 = new Image();
  bttn_02.src = 'imgs/click_btn_02.png';
  img_preload[2] = false;
  bttn_02.onload = function() {
    img_preload[2] = true;
  }

  star = new Image();
  star.src = 'imgs/star.png';
  img_preload[3] = false;
  star.onload = function() {
    img_preload[3] = true;
  }
  star_counter = 0;


  for( let i = 0; i < 16; i++ ) {
    curl[i] = new Image();
    curl[i].src = 'imgs/curl_' + i + '.png';
    img_preload[i+4] = false;
    curl[i].onload = function() {
      img_preload[i+4] = true;
    }
  }
  curl_counter = 0;
  curl_delay = 0;

  draw();
}

function draw() {

  for( let i = 0; i<img_preload.length; i++) {
    if (!img_preload[i]) {
      imgs_loaded = false;
      break;
    } else {
      imgs_loaded = true;
    }
  }

  if(imgs_loaded) {

    ctx.clearRect(0, 0, 602, 754);

    if(!game_start) {
      ctx.drawImage(initial_img, 0, 0, 602, 754);
      ctx.drawImage(bttn_01, 55, 594, 493, 65);
      if (hover_state) {
        ctx.drawImage(bttn_02, 55, 594, 493, 65);
      }
      ctx.drawImage(star, 273, 329, 69, 65);
    } else {
      if(star_counter < 100) {
        ctx.drawImage(initial_img, 0, 0, 602, 754);
        ctx.drawImage(bttn_01, 55, 594, 493, 65);
        star_counter < 100 ? star_counter++ : star_counter = 100;
        ctx.translate(308, 365);
        ctx.rotate(10 * star_counter * easing(star_counter/100) * Math.PI / 180);
        ctx.drawImage(star, -35, -36, 69, 65);
        ctx.rotate(-10 * star_counter * easing(star_counter/100) * Math.PI / 180);
        ctx.translate(-308, -365);
      } else {
        if (curl_delay < 2) {
          curl_delay++;
        } else {
          curl_counter < 15 ? curl_counter++ : curl_counter = 16;
          curl_delay = 0;
        }
        if( curl_counter <= 15 ) {
          ctx.drawImage(curl[curl_counter], 0, 0, 602, 754);
        } else {
          anim_play = false;
          $('#prize_area').style.display = "none";
        }
      }
    }

  }

  if(anim_play) {
    window.requestAnimationFrame(draw);
  }

}

function $(sel) {
  return document.querySelector(sel);
}

function easing(t) { return t<.5 ? 2*t*t : -1+2*(2-t)*t };

function point_over() {
  hover_state = true;
  cnvs.style.cursor = "pointer";
}

function point_out() {
  hover_state = false;
  cnvs.style.cursor = "default";
}

function start_game() {
  if(imgs_loaded) {
    game_start = true;
    $('#prize_detail_block').setAttribute('class', '');
    setTimeout( function() {
      $('#lprcn_01').setAttribute('class', 'invis')
    }, 1600 );
    setTimeout( function() {
      if (reveal_next) {
        $('#lprcn_02').setAttribute('class', '');
        $('#reveal_next').setAttribute('class', '');
      } else {
        $('#lprcn_03').setAttribute('class', '');
        $('#spin_chance').setAttribute('class', '');
      }
      
      $('#valid_info').setAttribute('class', '');
    }, 2200 );
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  cnvs.addEventListener('pointerover', point_over, false);
  cnvs.addEventListener('pointerout', point_out, false);
  cnvs.addEventListener('pointerup', start_game, false);
})