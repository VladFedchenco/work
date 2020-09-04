var start;
var total_time;
var interval = 0;
var interval_offset = 3000;
var line_number = 1;
var line = [];
var dot = [];
var dx = [];
var dy = [];
var angle_y = [];
var angle_x = [];
var popup = [];
var popup_bg = [];
var popup_amnt = [];
var popup_lbl = [];
var popup_prcnt_bg = [];
var popup_prcnt = [];
var popup_prgs = [];
var popup_pnt = [];
var popup_line = [];
var popup_crcl = [];

function $(sel) {
  return document.querySelector(sel);
}

total_time = Object.keys(nn_data).length * interval_offset;
console.log(total_time);

function set_line(id, d) {
  $("#line"+id).setAttribute("d", "M" + d[0] + " " + d[1] + "h" + d[2] + "c" + d[3] * dx[id-1][0] + " " + d[4] * dy[id-1][0] + " " + d[5] * dx[id-1][1] + " " + d[6] * dy[id-1][1] + " " + d[7] * dx[id-1][2] + " " + d[8] * dy[id-1][2] + "s" + " " + d[9] * dx[id-1][3] + " " + d[10] * dy[id-1][3] + " " + d[11] * dx[id-1][4] + " " + d[12] * dy[id-1][4] + " " + d[13] * dx[id-1][5] + " " + d[14] * dy[id-1][5] + " " + d[15] * dx[id-1][6] + " " + d[16] * dy[id-1][6] + " " + d[17] * dx[id-1][7] + " " + d[18] * dy[id-1][7] + " " + d[19] * dx[id-1][8] + " " + d[20] * dy[id-1][8] + " " + d[21] * dx[id-1][9] + " " + d[22] * dy[id-1][9] + " " + d[23] * dx[id-1][10] + " " + d[24] * dy[id-1][10]);
  $("#dot"+id).setAttribute("cx", d[0] + d[2] + d[7] * dx[id-1][2] + d[11] * dx[id-1][4] + d[15] * dx[id-1][6] + d[19] * dx[id-1][8] + d[23] * dx[id-1][10]);
  $("#dot"+id).setAttribute("cy", d[1] + d[8] * dy[id-1][2] + d[12] * dy[id-1][4] + d[16] * dy[id-1][6] + d[20] * dy[id-1][8] + d[24] * dy[id-1][10]);
  $("#popup_line_"+id).setAttribute('x2', d[0] + d[2] + d[7] * dx[id-1][2] + d[11] * dx[id-1][4] + d[15] * dx[id-1][6] + d[19] * dx[id-1][8] + d[23] * dx[id-1][10]);
  $("#popup_line_"+id).setAttribute('y2', d[1] + d[8] * dy[id-1][2] + d[12] * dy[id-1][4] + d[16] * dy[id-1][6] + d[20] * dy[id-1][8] + d[24] * dy[id-1][10]);
  $("#popup_dot_"+id).setAttribute('cx', d[0] + d[2] + d[7] * dx[id-1][2] + d[11] * dx[id-1][4] + d[15] * dx[id-1][6] + d[19] * dx[id-1][8] + d[23] * dx[id-1][10]);
  $("#popup_dot_"+id).setAttribute('cy', d[1] + d[8] * dy[id-1][2] + d[12] * dy[id-1][4] + d[16] * dy[id-1][6] + d[20] * dy[id-1][8] + d[24] * dy[id-1][10]);
}

for (i = 1; i <= Object.keys(nn_data).length; i++ ) {
  line[i - 1] = document.createElementNS("http://www.w3.org/2000/svg", "path");
  line[i - 1].setAttribute('id', 'line' + i);
  line[i - 1].setAttribute("d", "M" + nn_data['itm_' + i].d[0] + " " + nn_data['itm_' + i].d[1] + "h" + nn_data['itm_' + i].d[2] + "c" + nn_data['itm_' + i].d[3] + " " + nn_data['itm_' + i].d[4] + " " + nn_data['itm_' + i].d[5] + " " + nn_data['itm_' + i].d[6] + " " + nn_data['itm_' + i].d[7] + " " + nn_data['itm_' + i].d[8] + "s" + " " + nn_data['itm_' + i].d[9] + " " + nn_data['itm_' + i].d[10] + " " + nn_data['itm_' + i].d[11] + " " + nn_data['itm_' + i].d[12] + " " + nn_data['itm_' + i].d[13] + " " + nn_data['itm_' + i].d[14] + " " + nn_data['itm_' + i].d[15] + " " + nn_data['itm_' + i].d[16] + " " + nn_data['itm_' + i].d[17] + " " + nn_data['itm_' + i].d[18] + " " + nn_data['itm_' + i].d[19] + " " + nn_data['itm_' + i].d[20] + " " + nn_data['itm_' + i].d[21] + " " + nn_data['itm_' + i].d[22] + " " + nn_data['itm_' + i].d[23] + " " + nn_data['itm_' + i].d[24]);
  dot[i - 1] = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  dot[i - 1].setAttribute('id', 'dot' + i);
  dot[i - 1].setAttribute('r', 9);
  dot[i - 1].setAttribute("cx", nn_data['itm_' + i].d[0] + nn_data['itm_' + i].d[2] + nn_data['itm_' + i].d[7] + nn_data['itm_' + i].d[11] + nn_data['itm_' + i].d[15] + nn_data['itm_' + i].d[19] + nn_data['itm_' + i].d[23]);
  dot[i - 1].setAttribute("cy", nn_data['itm_' + i].d[1] + nn_data['itm_' + i].d[8] + nn_data['itm_' + i].d[12] + nn_data['itm_' + i].d[16] + nn_data['itm_' + i].d[20] + nn_data['itm_' + i].d[24]);
  if(nn_data['itm_' + i].color == 'dark') {
    $("#dark").appendChild(line[i - 1]);
    $("#dark").appendChild(dot[i - 1]);
  } else if(nn_data['itm_' + i].color == 'gray') {
    $("#gray").appendChild(line[i - 1]);
    $("#gray").appendChild(dot[i - 1]);
  } else if(nn_data['itm_' + i].color == 'white') {
    $("#white").appendChild(line[i - 1]);
    $("#white").appendChild(dot[i - 1]);
  }

  popup[i - 1] = document.createElementNS("http://www.w3.org/2000/svg", "g");
  popup[i - 1].setAttribute('id', 'popup_' + i);
  popup_bg[i - 1] = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  popup_bg[i - 1].setAttribute('x', 1160);
  popup_bg[i - 1].setAttribute('y', 240);
  popup_bg[i - 1].setAttribute('width', 400);
  popup_bg[i - 1].setAttribute('height', 170);
  popup_bg[i - 1].setAttribute('rx', 12);
  popup_bg[i - 1].setAttribute('fill', '#fff');
  popup[i - 1].appendChild(popup_bg[i - 1]);
  popup_amnt[i - 1] = document.createElementNS("http://www.w3.org/2000/svg", "text");
  popup_amnt[i - 1].setAttribute('x', 1186);
  popup_amnt[i - 1].setAttribute('y', 302);
  popup_amnt[i - 1].setAttribute('class', 'amnt');
  popup_amnt[i - 1].textContent = nn_data['itm_' + i].popup.amount;
  popup[i - 1].appendChild(popup_amnt[i - 1]);
  popup_lbl[i - 1] = document.createElementNS("http://www.w3.org/2000/svg", "text");
  popup_lbl[i - 1].setAttribute('x', 1186);
  popup_lbl[i - 1].setAttribute('y', 331);
  popup_lbl[i - 1].setAttribute('class', 'lbl');
  popup_lbl[i - 1].textContent = nn_data['itm_' + i].popup.label;
  popup[i - 1].appendChild(popup_lbl[i - 1]);
  popup_prcnt_bg[i - 1] = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  popup_prcnt_bg[i - 1].setAttribute('x', 1180);
  popup_prcnt_bg[i - 1].setAttribute('y', 350);
  popup_prcnt_bg[i - 1].setAttribute('width', 360);
  popup_prcnt_bg[i - 1].setAttribute('height', 8);
  popup_prcnt_bg[i - 1].setAttribute('rx', 4);
  popup_prcnt_bg[i - 1].setAttribute('fill', '#f2f2f2');
  popup[i - 1].appendChild(popup_prcnt_bg[i - 1]);
  popup_prcnt[i - 1] = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  popup_prcnt[i - 1].setAttribute('x', 1180);
  popup_prcnt[i - 1].setAttribute('y', 350);
  popup_prcnt[i - 1].setAttribute('width', 3.6 * nn_data['itm_' + i].popup.progress);
  popup_prcnt[i - 1].setAttribute('height', 8);
  popup_prcnt[i - 1].setAttribute('rx', 4);
  popup_prcnt[i - 1].setAttribute('fill', '#ff4c4c');
  popup[i - 1].appendChild(popup_prcnt[i - 1]);
  popup_prgs[i - 1] = document.createElementNS("http://www.w3.org/2000/svg", "text");
  popup_prgs[i - 1].setAttribute('x', 1186);
  popup_prgs[i - 1].setAttribute('y', 385);
  popup_prgs[i - 1].setAttribute('class', 'prgs');
  popup_prgs[i - 1].textContent = 'Progress';
  popup[i - 1].appendChild(popup_prgs[i - 1]);
  popup_pnt[i - 1] = document.createElementNS("http://www.w3.org/2000/svg", "text");
  popup_pnt[i - 1].setAttribute('x', 1480);
  popup_pnt[i - 1].setAttribute('y', 385);
  popup_pnt[i - 1].setAttribute('class', 'prsnt');
  popup_pnt[i - 1].textContent = nn_data['itm_' + i].popup.progress + '%';
  popup[i - 1].appendChild(popup_pnt[i - 1]);
  popup_line[i - 1] = document.createElementNS("http://www.w3.org/2000/svg", "line");
  popup_line[i - 1].setAttribute('id', 'popup_line_' + i);
  popup_line[i - 1].setAttribute('stroke', '#fff');
  popup_line[i - 1].setAttribute('x1', 1490);
  popup_line[i - 1].setAttribute('y1', 410);
  popup_line[i - 1].setAttribute('x2', nn_data['itm_' + i].d[0] + nn_data['itm_' + i].d[2] + nn_data['itm_' + i].d[7] + nn_data['itm_' + i].d[11] + nn_data['itm_' + i].d[15] + nn_data['itm_' + i].d[19] + nn_data['itm_' + i].d[23]);
  popup_line[i - 1].setAttribute('y2', nn_data['itm_' + i].d[1] + nn_data['itm_' + i].d[8] + nn_data['itm_' + i].d[12] + nn_data['itm_' + i].d[16] + nn_data['itm_' + i].d[20] + nn_data['itm_' + i].d[24]);
  popup[i - 1].appendChild(popup_line[i - 1]);
  popup_crcl[i - 1] = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  popup_crcl[i - 1].setAttribute('id', 'popup_dot_' + i);
  popup_crcl[i - 1].setAttribute('r', 16);
  popup_crcl[i - 1].setAttribute('fill', '#fff');
  popup_crcl[i - 1].setAttribute('cx', nn_data['itm_' + i].d[0] + nn_data['itm_' + i].d[2] + nn_data['itm_' + i].d[7] + nn_data['itm_' + i].d[11] + nn_data['itm_' + i].d[15] + nn_data['itm_' + i].d[19] + nn_data['itm_' + i].d[23]);
  popup_crcl[i - 1].setAttribute('cy', nn_data['itm_' + i].d[1] + nn_data['itm_' + i].d[8] + nn_data['itm_' + i].d[12] + nn_data['itm_' + i].d[16] + nn_data['itm_' + i].d[20] + nn_data['itm_' + i].d[24]);
  popup[i - 1].appendChild(popup_crcl[i - 1]);
  $("#nn_animation").appendChild(popup[i - 1]);

  dx[i - 1] = [];
  dy[i - 1] = [];
  angle_y[i - 1] = [];
  angle_x[i - 1] = [];

  for(z = 0; z < 11; z++) {
    dx[i - 1][z] = nn_data['itm_' + i].dx;
    dy[i - 1][z] = nn_data['itm_' + i].dy;
    angle_y[i - 1][z] = nn_data['itm_' + i].angle_y + .01 + Math.random() * .01;
    angle_x[i - 1][z] = nn_data['itm_' + i].angle_x + .01 + Math.random() * .01;
  }

  dot[i - 1].setAttribute('class', 'op');
  line[i - 1].setAttribute('class', 'op');
  popup[i - 1].setAttribute('class', 'op');
}

function animate(timestamp) {
  if (!start) {
    start = timestamp;
  }
  const progress = timestamp - start;
  if (progress < total_time) {
    requestAnimationFrame(animate);
  } else {
    start = timestamp;
    for (i = 1; i <= Object.keys(nn_data).length; i++ ) {
      $("#line" + i).setAttribute('class', 'op');
      $("#dot" + i).setAttribute('class', 'op');
    }
    interval = 0;
    line_number = 1;
    requestAnimationFrame(animate);
  }

  if (progress > interval) {
    interval += interval_offset;
    if(line_number < Object.keys(nn_data).length) {
      $("#line" + line_number).setAttribute('class', 'op vis');
      $("#dot" + line_number).setAttribute('class', 'op vis');
      $("#popup_" + line_number).setAttribute('class', 'op vis');
      line_number++;
    }
  }

  if (progress > (interval - interval_offset / 2)) {
    if(line_number > 1) {
      $("#popup_" + eval(line_number - 1)).setAttribute('class', 'op');
    }
  } else {
    $("#popup_" + eval(line_number - 1)).setAttribute('class', 'op vis');
  }

  for(j = 0; j < Object.keys(nn_data).length; j++) {
    for(l = 0; l < 11; l++) {
      angle_y[j][l] += .01 + Math.random() * .01;
      if (angle_y[j][l] >= (Math.PI * 2)) {
        angle_y[j][l] = 0;
      }
      dy[j][l] = Math.sin(angle_y[j][l]);

      angle_x[j][l] += .01 + Math.random() * .01;
      if (angle_x[j][l] >= (Math.PI * 2)) {
        angle_x[j][l] = 0;
      }
      dx[j][l] = 1 - Math.abs(Math.sin(angle_x[j][l]) / 30);
    }
  }

  for(i = 1; i <= Object.keys(nn_data).length; i++) {
    set_line(i, nn_data['itm_' + i].d);
  }
}

for(j = 0; j < Object.keys(nn_data).length; j++) {
    for(l = 0; l < 11; l++) {
      angle_y[j][l] += .01 + Math.random() * .01;
      if (angle_y[j][l] >= (Math.PI * 2)) {
        angle_y[j][l] = 0;
      }
      dy[j][l] = Math.sin(angle_y[j][l]);

      angle_x[j][l] += .01 + Math.random() * .01;
      if (angle_x[j][l] >= (Math.PI * 2)) {
        angle_x[j][l] = 0;
      }
      dx[j][l] = 1 - Math.abs(Math.sin(angle_x[j][l]) / 30);
    }
  }

  for(i = 1; i <= Object.keys(nn_data).length; i++) {
    set_line(i, nn_data['itm_' + i].d);
  }

requestAnimationFrame(animate);

