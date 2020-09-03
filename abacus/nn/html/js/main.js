var start;
var total_time = 100000;
var interval = 0;
var interval_offset = 2000;
var line_number = 1;
var line = [];
var dot = [];
var dx = [];
var dy = [];
var angle_y = [];
var angle_x = [];

function $(sel) {
  return document.querySelector(sel);
}

function set_line(id, d) {
  $("#line"+id).setAttribute("d", "M" + d[0] + " " + d[1] + "h" + d[2] + "c" + d[3] * dx[id-1][0] + " " + d[4] * dy[id-1][0] + " " + d[5] * dx[id-1][1] + " " + d[6] * dy[id-1][1] + " " + d[7] * dx[id-1][2] + " " + d[8] * dy[id-1][2] + "s" + " " + d[9] * dx[id-1][3] + " " + d[10] * dy[id-1][3] + " " + d[11] * dx[id-1][4] + " " + d[12] * dy[id-1][4] + " " + d[13] * dx[id-1][5] + " " + d[14] * dy[id-1][5] + " " + d[15] * dx[id-1][6] + " " + d[16] * dy[id-1][6] + " " + d[17] * dx[id-1][7] + " " + d[18] * dy[id-1][7] + " " + d[19] * dx[id-1][8] + " " + d[20] * dy[id-1][8] + " " + d[21] * dx[id-1][9] + " " + d[22] * dy[id-1][9] + " " + d[23] * dx[id-1][10] + " " + d[24] * dy[id-1][10]);
  $("#dot"+id).setAttribute("cx", d[0] + d[2] + d[7] * dx[id-1][2] + d[11] * dx[id-1][4] + d[15] * dx[id-1][6] + d[19] * dx[id-1][8] + d[23] * dx[id-1][10]);
  $("#dot"+id).setAttribute("cy", d[1] + d[8] * dy[id-1][2] + d[12] * dy[id-1][4] + d[16] * dy[id-1][6] + d[20] * dy[id-1][8] + d[24] * dy[id-1][10]);
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
      line_number++;
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

$("#text_el").textContent = nn_data.itm_1.label;