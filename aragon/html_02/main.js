let svg_el =  document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg_el.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
svg_el.setAttribute("viewBox", "0 0 1200 1200");
// svg_el.setAttribute("width", "1200");
// svg_el.setAttribute("height", "1200");


let css = document.createElementNS("http://www.w3.org/2000/svg", "style");
css.textContent = `
g {
 animation: trans 1s forwards;
}
@keyframes trans {
  0% {
    opacity: 0;
    transform: translate(10px, 10px);
  }
}
rect {
 animation: op 1s forwards;
}
@keyframes op {
  0% {
    opacity: 0;
  }
}
`
svg_el.appendChild(css);

let img_file = new Image();

let art_group = [];
let item_num = 5;
let dots_radius = 10;
let coord = [[], [], [], [], [], [], [], [], []];

coord[0] = shuffle([[210,100],[144,122],[254,122],[298,188],[100,210],[144,276],[254,276],[188,298]]);
coord[1] = shuffle([[610,100],[544,122],[654,122],[698,188],[500,210],[544,276],[654,276],[588,298]]);
coord[2] = shuffle([[1010,100],[944,122],[1054,122],[1098,188],[900,210],[944,276],[1054,276],[988,298]]);
coord[3] = shuffle([[210,500],[144,522],[254,522],[298,588],[100,610],[144,676],[254,676],[188,698]]);
coord[4] = shuffle([[610,500],[544,522],[654,522],[698,588],[500,610],[544,676],[654,676],[588,698]]);
coord[5] = shuffle([[1010,500],[944,522],[1054,522],[1098,588],[900,610],[944,676],[1054,676],[988,698]]);
coord[6] = shuffle([[210,900],[144,922],[254,922],[298,988],[100,1010],[144,1076],[254,1076],[188,1098]]);
coord[7] = shuffle([[610,900],[544,922],[654,922],[698,988],[500,1010],[544,1076],[654,1076],[588,1098]]);
coord[8] = shuffle([[1010,900],[944,922],[1054,922],[1098,988],[900,1010],[944,1076],[1054,1076],[988,1098]]);

console.log(coord);

for (let i=0; i<3; i++) {
  for (let j=0; j<3; j++) {
    let bg = document.createElementNS( "http://www.w3.org/2000/svg", "rect");
    bg.setAttribute("x", (20 + 400*j));
    bg.setAttribute("y", (20 + 400*i));
    bg.setAttribute("width", 360);
    bg.setAttribute("height", 360);
    let bg_color = "hsl("+ randomNum(0, 359) +", 60%, 80%)";
    bg.setAttribute("fill", bg_color);
    svg_el.appendChild(bg);
  }
}


for (let i=0; i<9; i++) {

  art_group[i] = document.createElementNS( "http://www.w3.org/2000/svg", "g");
  art_group[i].setAttribute("id", "g"+i);

  for (let j=0; j<item_num; j++) {
    let line = document.createElementNS( "http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", coord[i][j][0]);
    line.setAttribute("y1", coord[i][j][1]);

    if(j<(item_num-1)) {
      line.setAttribute("x2", coord[i][j+1][0]);
      line.setAttribute("y2", coord[i][j+1][1]);
    } else {
      line.setAttribute("x2", coord[i][0][0]);
      line.setAttribute("y2", coord[i][0][1]);
    }

    let line_type = randomNum(0, 3);

    if(line_type == 0) {
      line.setAttribute("stroke", "none");
    }
    if(line_type == 1) {
      line.setAttribute("stroke", "rgb(0,0,0)");
    }
    if(line_type == 2) {
      line.setAttribute("stroke", "rgb(0,0,0)");
      line.setAttribute("stroke-dasharray", "1 4");
    }
    if(line_type == 3) {
      line.setAttribute("stroke", "rgb(0,0,0)");
      line.setAttribute("stroke-dasharray", "10 8");
    }
    
    line.setAttribute("stroke-linecap", "round");
    line.setAttribute("stroke-width", "2");
    art_group[i].appendChild(line);
  }
  for (let j=0; j<item_num; j++) {
    let circle = document.createElementNS( "http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", coord[i][j][0]);
    circle.setAttribute("cy", coord[i][j][1]);
    circle.setAttribute("r", dots_radius);

    let circle_type = randomNum(0, 2);

    if(circle_type == 0) {
      circle.setAttribute("fill", "rgb(255,255,255");
      circle.setAttribute("stroke", "rgb(255,255,255");
    }

    if(circle_type == 1) {
      let clr = "hsl("+ randomNum(0, 359) +", 100%, 30%)";
      circle.setAttribute("fill", clr);
      circle.setAttribute("stroke", clr);
    }

    if(circle_type == 2) {
      circle.setAttribute("fill", "hsl("+ randomNum(0, 359) +", 100%, 70%)");
      circle.setAttribute("stroke", "hsl("+ randomNum(0, 359) +", 100%, 20%)");
    }

    circle.setAttribute("stroke-width", "3");
    art_group[i].appendChild(circle);
  }

  svg_el.appendChild(art_group[i]);
}

/* let dots = [];
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


*/

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