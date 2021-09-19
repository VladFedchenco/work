let prize_num, grand, ctx, angle, play, prize, prerender, wheel, confetti, confetti_scale, confetti_counter, confetti_frames, sector_counter, sector_frames, sector, main_bg, center_shadow, center_disk, center_light, lamps, lamps_frame, lamp_counter, big_shadow;

let requestURL = 'js/free_05/data.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  if(prizeData.prize_id < 4220) {
    grand = false;
    let prize_ids = ["4200","4205","4204","4202","4203","4201"];
    prize_num = prize_ids.indexOf(prizeData.prize_id);
  } else {
    grand = true;
    let prize_ids = ["4225","4220","4223","4221","4224","4222"];
    prize_num = prize_ids.indexOf(prizeData.prize_id);
  }

  $("#headline1").innerHTML = prizeData.headline1;
  $("#headline2").innerHTML = prizeData.headline2;

  if (prizeData.headline2_icon == "true") {
    $("#headline2").setAttribute("class", "icon");
  }

  $("#headline3").innerHTML = prizeData.headline3;

  if(prizeData.headline3 == "") {
    $("#headline3").style.display = "none";
  }

  if(prizeData.headline4 == "") {
    $("#headline4").style.display = "none";
  }

  if(prizeData.date == "false") {
    $("#date").style.display = "none";
  }

  $("#headline4").innerHTML = prizeData.headline4;

  if(prizeData.is_mobile == "true") {
    $("#redeem_prize").style.display = "none";
  } else {
    $("#redeem_by_phone").style.display = "none";
  }

  if(prizeData.is_bottom_block == "false") {
    $("#ready_to_play").style.display = "none";
  }

  init();
  window.requestAnimationFrame(draw);

}

function init() {

  ctx = document.getElementById('main_canvas').getContext('2d');

  angle = 0;
  play = false;
  prize = [];
  prize[0] = [0, 0.07, 0.22, 0.5, 0.94, 1.66, 2.66, 3.96, 5.62, 7.7, 10.3, 13.32, 16.92, 21.17, 26.06, 31.61, 37.94, 45, 52.9, 61.7, 71.4, 82.2, 93.9, 106.6, 121, 136, 152, 169, 188, 208, 230, 253, 277, 303, 331, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 29, 57, 83, 107, 130, 152, 172, 191, 208, 224, 239, 253.4, 266.1, 277.8, 288.6, 298.3, 307.1, 315, 322.06, 328.39, 333.94, 338.83, 343.08, 346.68, 349.7, 352.3, 354.38, 356.04, 357.34, 358.34, 359.06, 359.5, 359.78, 359.93, 0];
  prize[1] = [0, 0.07, 0.22, 0.5, 0.94, 1.66, 2.66, 3.96, 5.62, 7.7, 10.3, 13.32, 16.92, 21.17, 26.06, 31.61, 37.94, 45, 52.9, 61.7, 71.4, 82.2, 93.9, 106.6, 121, 136, 152, 169, 188, 208, 230, 253, 277, 303, 331, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 329, 357, 23, 47, 70, 92, 112, 131, 148, 164, 179, 193.4, 206.1, 217.8, 228.6, 238.3, 247.1, 255, 262.06, 268.39, 273.94, 278.83, 283.08, 286.68, 289.7, 292.3, 294.38, 296.04, 297.34, 298.34, 299.06, 299.5, 299.78, 299.93, 300, 300, 300];
  prize[2] = [0, 0.07, 0.22, 0.5, 0.94, 1.66, 2.66, 3.96, 5.62, 7.7, 10.3, 13.32, 16.92, 21.17, 26.06, 31.61, 37.94, 45, 52.9, 61.7, 71.4, 82.2, 93.9, 106.6, 121, 136, 152, 169, 188, 208, 230, 253, 277, 303, 331, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 269, 297, 323, 347, 10, 32, 52, 71, 88, 104, 119, 133.4, 146.1, 157.8, 168.6, 178.3, 187.1, 195, 202.06, 208.39, 213.94, 218.83, 223.08, 226.68, 229.7, 232.3, 234.38, 236.04, 237.34, 238.34, 239.06, 239.5, 239.78, 239.93, 240, 240, 240, 240, 240];
  prize[3] = [0, 0.07, 0.22, 0.5, 0.94, 1.66, 2.66, 3.96, 5.62, 7.7, 10.3, 13.32, 16.92, 21.17, 26.06, 31.61, 37.94, 45, 52.9, 61.7, 71.4, 82.2, 93.9, 106.6, 121, 136, 152, 169, 188, 208, 230, 253, 277, 303, 331, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 209, 237, 263, 287, 310, 332, 352, 11, 28, 44, 59, 73.4, 86.1, 97.8, 108.6, 118.3, 127.1, 135, 142.06, 148.39, 153.94, 158.83, 163.08, 166.68, 169.7, 172.3, 174.38, 176.04, 177.34, 178.34, 179.06, 179.5, 179.78, 179.93, 180, 180, 180, 180, 180, 180, 180, 180];
  prize[4] = [0, 0.07, 0.22, 0.5, 0.94, 1.66, 2.66, 3.96, 5.62, 7.7, 10.3, 13.32, 16.92, 21.17, 26.06, 31.61, 37.94, 45, 52.9, 61.7, 71.4, 82.2, 93.9, 106.6, 121, 136, 152, 169, 188, 208, 230, 253, 277, 303, 331, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 149, 177, 203, 227, 250, 272, 292, 311, 328, 344, 359, 13.4, 26.1, 37.8, 48.6, 58.3, 67.1, 75, 82.06, 88.39, 93.94, 98.83, 103.08, 106.68, 109.7, 112.3, 114.38, 116.04, 117.34, 118.34, 119.06, 119.5, 119.78, 119.93, 120, 120, 120, 120, 120, 120, 120, 120, 120];
  prize[5] = [0, 0.07, 0.22, 0.5, 0.94, 1.66, 2.66, 3.96, 5.62, 7.7, 10.3, 13.32, 16.92, 21.17, 26.06, 31.61, 37.94, 45, 52.9, 61.7, 71.4, 82.2, 93.9, 106.6, 121, 136, 152, 169, 188, 208, 230, 253, 277, 303, 331, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60, 89, 117, 143, 167, 190, 212, 232, 251, 268, 284, 299, 313.4, 326.1, 337.8, 348.6, 358.3, 7.1, 15, 22.06, 28.39, 33.94, 38.83, 43.08, 46.68, 49.7, 52.3, 54.38, 56.04, 57.34, 58.34, 59.06, 59.5, 59.78, 59.93, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60];
  prerender = [];
  for (let i = 0; i < 143; i++) {
      prerender[i] = document.createElement('canvas');
  }
  wheel = new Image();
  grand ? wheel.src = 'imgs/grand_wheel.png' : wheel.src = 'imgs/wheel.png';
  wheel.onload = function() {
    for (let i = 0; i < 143; i++) {
      let pctx = prerender[i].getContext('2d');
      prerender[i].width = 598;
      prerender[i].height = 598;
      pctx.translate(299, 299);
      pctx.rotate(prize[prize_num][i] * Math.PI / 180);
      pctx.translate(-299, -299);
      pctx.drawImage(wheel, 0, 0, 598, 598);
    }
  }

  confetti_scale = [0, 0.0001, 0.0007, 0.0023, 0.0055, 0.0107, 0.0185, 0.0294, 0.0439, 0.0625, 0.0857, 0.1141, 0.1481, 0.1884, 0.2353, 0.2894, 0.3512, 0.4212, 0.5, 0.5788, 0.6488, 0.7106, 0.7647, 0.8116, 0.8519, 0.8859, 0.9143, 0.9375, 0.9561, 0.9706, 0.9815, 0.9893, 0.9945, 0.9977, 0.9993, 1];
  confetti_counter = 0;
  confetti_frames = [];
  for (let i = 0; i < 36; i++) {
      confetti_frames[i] = document.createElement('canvas');
  }
  confetti = new Image();
  confetti.src = 'imgs/confetti.png';
  confetti.onload = function() {
    for (let i = 0; i < 36; i++) {
      let pctx = confetti_frames[i].getContext('2d');
      confetti_frames[i].width = 774;
      confetti_frames[i].height = 774;
      let scl = confetti_scale[i] * 774;
      let x = 387 - scl / 2;
      let y = 774 - scl;
      pctx.drawImage(confetti, x, y, scl, scl);
    }
  }

  sector_counter = 0;
  sector_frames = [];
  for (let i = 0; i < 36; i++) {
      sector_frames[i] = document.createElement('canvas');
  }
  sector = new Image();
  grand ? sector.src = 'imgs/grand_prize_' + prize_num + '.png' : sector.src = 'imgs/prize_' + prize_num + '.png';
  sector.onload = function() {
    for (let i = 0; i < 36; i++) {
      let pctx = sector_frames[i].getContext('2d');
      sector_frames[i].width = 518;
      sector_frames[i].height = 518;
      let scl = confetti_scale[i] * 518;
      let x = 259 - scl / 2;
      let y = 518 - scl;
      pctx.drawImage(sector, x, y, scl, scl);
    }
  }

  main_bg = new Image();
  grand ? main_bg.src = 'imgs/grand_base.png' : main_bg.src = 'imgs/base.png';

  center_shadow = new Image();
  center_shadow.src = 'imgs/center_shadow.png';

  center_disk = new Image();
  center_disk.src = 'imgs/center_disk.png';

  center_light = new Image();
  center_light.src = 'imgs/center_light.png'; 

  arrow_shadow = new Image();
  arrow_shadow.src = 'imgs/arrow_shadow.png'; 

  lamps = [];
  lamps_frame = 0;
  lamp_counter = 0;
  for(let i=0; i<3; i++) {
    lamps[i] = new Image();
    lamps[i].src = 'imgs/lamps_' + i + '.png'; 
  }

  big_shadow = new Image();
  big_shadow.src = 'imgs/big_shadow.png';

}

function $(sel) {
  return document.querySelector(sel);
}

function draw() {
  ctx.clearRect(0, 0, 774, 1004);

  ctx.globalCompositeOperation = 'source-over';
  ctx.drawImage(main_bg, 46, 158, 682, 846);

  if(!play) {
    ctx.drawImage(wheel, 88, 202, 598, 598);
  } else {
    angle < 142 ? angle++ : angle = 142;
    ctx.drawImage(prerender[angle], 88, 202);
  }

  ctx.globalCompositeOperation = 'multiply';
  ctx.drawImage(center_shadow, 46, 158, 682, 846);

  ctx.globalCompositeOperation = 'source-over';
  ctx.drawImage(center_disk, 46, 158, 682, 846);

  ctx.globalCompositeOperation = 'screen';
  ctx.drawImage(center_light, 46, 158, 682, 846);

  ctx.globalCompositeOperation = 'multiply';
  ctx.drawImage(arrow_shadow, 46, 158, 682, 846);

  ctx.globalCompositeOperation = 'source-over';
  if(lamp_counter < 10) {
    lamp_counter++;
    lamps_frame = 0;
  } else if (lamp_counter >= 10 && lamp_counter < 20) {
    lamp_counter++;
    lamps_frame = 1;
  } else if (lamp_counter >= 20 && lamp_counter < 30) {
    lamp_counter++;
    lamps_frame = 2;
  } else {
    lamp_counter = 0;
    lamps_frame = 0;
  }
  ctx.drawImage(lamps[lamps_frame], 46, 158, 682, 846);

  ctx.globalCompositeOperation = 'multiply';
  ctx.drawImage(big_shadow, 46, 158, 682, 846);

  if(angle > 110) {

    confetti_counter < 35 ? confetti_counter++ : confetti_counter = 35;

    ctx.globalAlpha = .7;
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(confetti_frames[confetti_counter], 0, 0, 774, 774);
    ctx.globalCompositeOperation = 'screen';
    ctx.drawImage(confetti_frames[confetti_counter], 0, 0, 774, 774);

    ctx.globalAlpha = 1;

    ctx.globalCompositeOperation = 'color-burn';
    ctx.drawImage(confetti_frames[confetti_counter], 0, 0, 774, 774);
    
    ctx.globalCompositeOperation = 'source-over';
    if(confetti_counter > 4) {
      sector_counter < 35 ? sector_counter++ : sector_counter = 35;
      ctx.drawImage(sector_frames[sector_counter], 128, 332, 518, 518);
    }
  }

  if(angle > 140) {
    $("#result").setAttribute("class", "visible");
  }

  window.requestAnimationFrame(draw);
}

function start_game() {
  $("#button_block").setAttribute("class", "invisible");
    play = true;
}

document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('main_canvas').addEventListener('click', start_game, false);
  document.getElementById('spin_button').addEventListener('click', start_game, false);
})