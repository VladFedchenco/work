let svg_el =  document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg_el.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
svg_el.setAttribute("viewBox", "0 0 1200 1200");
// svg_el.setAttribute("width", "1200");
// svg_el.setAttribute("height", "1200");

let img_file = new Image();

let dots = [];
let dots_num = 7;
let dots_radius = 15;
let lines = [];

let grid_x = [];
let grid_y = [];

for (let i=0; i<14; i++) {
  grid_x[i] = grid_y[i] = 40 + i*40;
}

let art_x = [];
let art_y = [];
let art_line_d1 = [];
let art_line_d2 = [];

let art_group = [];
let art_group_bg = [];

for (let i=0; i<4; i++) {
  art_x[i] = shuffle([1,2,3,4,5,6,7,8,9,10,11,12,13]);
  art_y[i] = shuffle([1,2,3,4,5,6,7,8,9,10,11,12,13]);
  art_line_d1[i] = shuffle([0,1,2,3,4,5,6]);
  art_line_d2[i] = shuffle([0,1,2,3,4,5,6]);
  art_group[i] = document.createElementNS( "http://www.w3.org/2000/svg", "g");
  art_group_bg[i] = document.createElementNS( "http://www.w3.org/2000/svg", "rect");
  art_group_bg[i].setAttribute("x", 10);
  art_group_bg[i].setAttribute("y", 10);
  art_group_bg[i].setAttribute("width", 580);
  art_group_bg[i].setAttribute("height", 580);
  let bg_color = "hsl("+ randomNum(0, 359) +", 70%, 70%)";
  art_group_bg[i].setAttribute("fill", bg_color);
  art_group[i].appendChild(art_group_bg[i]);

  dots[i] = lines[i] = [];
  for(let j=0; j<dots_num; j++) {

    lines[i][j] = document.createElementNS( "http://www.w3.org/2000/svg", "line");
    lines[i][j].setAttribute("x1", grid_x[art_x[i][art_line_d1[i][j]]]);
    lines[i][j].setAttribute("x2", grid_x[art_x[i][art_line_d2[i][j]]]);
    lines[i][j].setAttribute("y1", grid_y[art_y[i][art_line_d1[i][j]]]);
    lines[i][j].setAttribute("y2", grid_y[art_y[i][art_line_d2[i][j]]]);
    lines[i][j].setAttribute("stroke", "rgb(0,0,0)");
    lines[i][j].setAttribute("stroke-width", "4");

    art_group[i].appendChild(lines[i][j]);

    dots[i][j] = document.createElementNS( "http://www.w3.org/2000/svg", "circle");
    dots[i][j].setAttribute("cx", grid_x[art_x[i][j]]);
    dots[i][j].setAttribute("cy", grid_y[art_y[i][j]]);
    dots[i][j].setAttribute("r", dots_radius);
    dots[i][j].setAttribute("fill", "hsl("+ randomNum(0, 359) +", 100%, 70%)");
    dots[i][j].setAttribute("stroke", "rgb(0,0,0)");
    dots[i][j].setAttribute("stroke-width", "4");

  }

  for(let j=0; j<dots_num; j++) {
    art_group[i].appendChild(dots[i][j]);
  }

  svg_el.appendChild(art_group[i]);
}

art_group[1].setAttribute("transform", "translate(600, 0)");
art_group[2].setAttribute("transform", "translate(0, 600)");
art_group[3].setAttribute("transform", "translate(600, 600)");


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

function randomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

img_file.src = "data:image/svg+xml;charset=UTF-8," + new XMLSerializer().serializeToString(svg_el);

document.querySelector("body").appendChild(img_file);