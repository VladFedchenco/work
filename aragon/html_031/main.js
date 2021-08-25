let svg_el =  document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg_el.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
svg_el.setAttribute("viewBox", "0 0 1200 1200");


let css = document.createElementNS("http://www.w3.org/2000/svg", "style");
css.textContent = svg_css;
svg_el.appendChild(css);

let img_file = new Image();

let p = [
  [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ],
  [
    [0, 125, 225, 325, 425, 525],
    [0, 125, 225, 325, 425, 525]
  ],
  [
    [0, 675, 775, 875, 975, 1075],
    [0, 125, 225, 325, 425, 525]
  ],
  [
    [0, 125, 225, 325, 425, 525],
    [0, 675, 775, 875, 975, 1075]
  ],
  [
    [0, 675, 775, 875, 975, 1075],
    [0, 675, 775, 875, 975, 1075]
  ]
];

let nodes = [];
let lines = [];
let nodes_amount = randomNum(4, 8);
let lines_amount;
let part = [];
let counter = 0;

function lines_order(n) {
  for(let i = 0; i < lines_amount; i++) {
      part[i] = [];
      if(i < (lines_amount - 1)) {
        part[i].push(i+1+counter);
        part[i].push(i+2+counter);
      } else {
        part[i].push(i+n+counter);
        part[i].push(randomNum(1, (nodes_amount-1)));
      }
      counter++;
    }
}

switch (nodes_amount) {
  case 4:
    lines_amount = 3;
    lines_order(0);
  break;
  case 5:
    lines_amount = 3;
    lines_order(1);
  break;
  case 6:
    lines_amount = 4;
    lines_order(0);
  break;
  case 7:
    lines_amount = 4;
    lines_order(1);
  break;
  case 8:
    lines_amount = 5;
    lines_order(0);
  break;
  default:
}

for(let i = 0; i < 4; i++) {
  nodes[i] = shuffle([[1,1], [1,2], [1,3], [1,4], [1,5], [2,1], [2,2], [2,3], [2,4], [2,5], [3,1], [3,2], [3,3], [3,4], [3,5], [4,1], [4,2], [4,3], [4,4], [4,5], [5,1], [5,2], [5,3], [5,4], [5,5]]);
  for(let j = 0; j < nodes_amount; j++) {
    all_data.nodes['nodes_0' + (i + 1)][j].cx = nodes[i][j][0];
    all_data.nodes['nodes_0' + (i + 1)][j].cy = nodes[i][j][1];
  }
  for(let j = 0; j < lines_amount; j++) {
    all_data.lines['lines_0' + (i + 1)][j].x1 = nodes[i][(part[j][0] - 1)][0];
    all_data.lines['lines_0' + (i + 1)][j].y1 = nodes[i][(part[j][0] - 1)][1];
    all_data.lines['lines_0' + (i + 1)][j].x2 = nodes[i][(part[j][1] - 1)][0];
    all_data.lines['lines_0' + (i + 1)][j].y2 = nodes[i][(part[j][1] - 1)][1];
  }
}

all_data.lines.type = randomNum(0, 4);
all_data.lines.double_line = randomNum(0, 1);

draw_rectangle(all_data.big_rect.x, all_data.big_rect.y, all_data.big_rect.width, all_data.big_rect.height, all_data.big_rect.class);

for(let i = 1; i < 5; i++) {
  draw_rectangle(all_data["rect_0" + i].x, all_data["rect_0" + i].y, all_data["rect_0" + i].width, all_data["rect_0" + i].height, all_data["rect_0" + i].class);
  for(let j = 0; j < lines_amount; j++) {
    draw_line(p[i][0][all_data.lines['lines_0' + i][j].x1], p[i][1][all_data.lines['lines_0' + i][j].y1], p[i][0][all_data.lines['lines_0' + i][j].x2], p[i][1][all_data.lines['lines_0' + i][j].y2], all_data.lines.type, all_data.nodes.radius, all_data.lines['lines_0' + i][j].class);
    if(all_data.lines.type > 0 && all_data.lines.double_line) {
      let ctype;
      if(all_data.lines.type == 1 || all_data.lines.type == 3) {
        ctype = all_data.lines.type + 1;
      } else if(all_data.lines.type == 2 || all_data.lines.type == 4) {
        ctype = all_data.lines.type - 1;
      }
      draw_line(p[i][0][all_data.lines['lines_0' + i][j].x1], p[i][1][all_data.lines['lines_0' + i][j].y1], p[i][0][all_data.lines['lines_0' + i][j].x2], p[i][1][all_data.lines['lines_0' + i][j].y2], ctype, all_data.nodes.radius, all_data.lines['lines_0' + i][j].class);
    }
  }
}

for(let i = 1; i < 5; i++) {
  for(let j = 0; j < nodes_amount; j++) {
    draw_circle(p[i][0][all_data.nodes['nodes_0' + i][j].cx], p[i][1][all_data.nodes['nodes_0' + i][j].cy], all_data.nodes.radius, all_data.nodes['nodes_0' + i][j].class);
  }
}

function draw_rectangle(x, y, width, height, class_name) {
  let rect = document.createElementNS( "http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", x);
  rect.setAttribute("y", y);
  rect.setAttribute("width", width);
  rect.setAttribute("height", height);
  rect.setAttribute("class", class_name);
  svg_el.appendChild(rect);
}

function draw_circle(cx, cy, radius, class_name) {
  let circle = document.createElementNS( "http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("r", radius);
  circle.setAttribute("class", class_name);
  svg_el.appendChild(circle);
}

function draw_line(x1, y1, x2, y2, type, radius, class_name) {
  let line = document.createElementNS( "http://www.w3.org/2000/svg", "line");
  let x1_upd, y1_upd, x2_upd, y2_upd, angle1, angle2;
  switch (type) {
    case 1:
    angle1 = angle2 = angleRadians(x1, y1, x2, y2) - 1.5708;
    break;
    case 2:
    angle1 = angle2 = angleRadians(x1, y1, x2, y2) + 1.5708;
    break;
    case 3:
    angle1 = angleRadians(x1, y1, x2, y2) - 1.5708;
    angle2 = angleRadians(x1, y1, x2, y2) + 1.5708;
    break;
    case 4:
    angle1 = angleRadians(x1, y1, x2, y2) + 1.5708;
    angle2 = angleRadians(x1, y1, x2, y2) - 1.5708;
    break;
    default:
  }
  if(type == 0) {
    x1_upd = x1;
    y1_upd = y1;
    x2_upd = x2;
    y2_upd = y2;
  } else {
    x1_upd = roundNum(getX(angle1, radius) + x1);
    y1_upd = roundNum(getY(angle1, radius) + y1);
    x2_upd = roundNum(getX(angle2, radius) + x2);
    y2_upd = roundNum(getY(angle2, radius) + y2);
  }

  line.setAttribute("x1", x1_upd);
  line.setAttribute("y1", y1_upd);
  line.setAttribute("x2", x2_upd);
  line.setAttribute("y2", y2_upd);
  line.setAttribute("class", class_name);
  svg_el.appendChild(line);
}

function angleRadians(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1);
}

function getX(angle, radius) {
  return Math.cos(angle) * radius;
}

function getY(angle, radius) {
  return Math.sin(angle) * radius;
}

function roundNum(number) {
  return Math.round(number * 10) / 10;
}

function shuffle(array) {
    let i = array.length,
        j = 0,
        temp;

    while (i--) {

        j = Math.floor(Math.random() * (i+1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;

    }

    return array;
}
function generateColor(hue,sat) {
  return "hsl(" + randomNum(0, 359) + ","+hue+"%,"+sat+"%)";
}
function randomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}