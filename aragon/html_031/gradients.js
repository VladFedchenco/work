let defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

let square_color = generateColor(70,80);
createLinearGradient("l_grd1", 1, 1, 2, [0, 1], [generateColor(100,70), generateColor(100,70)]);
createLinearGradient("l_grd2", 1, 1, 2, [0, 1], [generateColor(100,70), generateColor(100,70)]);
createLinearGradient("l_grd3", 1, 1, 2, [0, 1], [generateColor(100,70), generateColor(100,70)]);
createLinearGradient("l_grd4", 1, 1, 2, [0, 1], [generateColor(100,70), generateColor(100,70)]);

let sep_grad1 = [];
sep_grad1[0] = generateColor(100,50);
sep_grad1[1] = generateColor(100,50);
createLinearGradient("l_grd_2col", 0, 1, 4, [0, .5, .5, 1], [sep_grad1[0], sep_grad1[0], sep_grad1[1], sep_grad1[1]]);

for(let i=0; i<4; i++) {
  for(let j=0; j<8; j++) {
    let sep_grad2 = [];
    sep_grad2[0] = generateColor(100,50);
    sep_grad2[1] = generateColor(100,50);
    createLinearGradient(("l_grd" + i + "_" + j), 0, 1, 4, [0, .5, .5, 1], [sep_grad2[0], sep_grad2[0], sep_grad2[1], sep_grad2[1]]);
  }
}

let sep_grad3 = [];
sep_grad3[0] = generateColor(100,60);
sep_grad3[1] = generateColor(100,60);
sep_grad3[2] = generateColor(100,60);
createRadialGradient("r_grd_single", 10, [0, .3, .3, .35, .35, .7, .7, 0.75, .75, 1], [sep_grad3[0], sep_grad3[0], "hsl(0,0%,0%)", "hsl(0,0%,0%)", sep_grad3[1], sep_grad3[1], "hsl(0,0%,0%)", "hsl(0,0%,0%)", sep_grad3[2], sep_grad3[2]]);

for(let i=0; i<4; i++) {
  for(let j=0; j<8; j++) {
    let sep_grad4 = [];
    sep_grad4[0] = generateColor(100,60);
    sep_grad4[1] = generateColor(100,60);
    sep_grad4[2] = generateColor(100,60);
    createRadialGradient(("r_grd" + i + "_" + j), 10, [0, .3, .3, .35, .35, .7, .7, 0.75, .75, 1], [sep_grad4[0], sep_grad4[0], "hsl(0,0%,0%)", "hsl(0,0%,0%)", sep_grad4[1], sep_grad4[1], "hsl(0,0%,0%)", "hsl(0,0%,0%)", sep_grad4[2], sep_grad4[2]]);
  }
}

svg_el.appendChild(defs);

let square_type = randomNum(1, 3);
let square_fill = [];

for(let i=0; i<4; i++) {
  if(square_type == 1) {
    square_fill[i] = square_color;
  } else if(square_type == 2) {
    square_fill[i] = generateColor(70,70);
  } else {
    square_fill[i] = "url(%23l_grd" + (i+1) + ")";
  }
}

let node_type = randomNum(1,6);
let node_fill = [];

for(let i=0; i<4; i++) {
  node_fill[i] = [];
  for(let j=0; j<8; j++) {
    switch (node_type) {
      case 1:
        node_fill[i][j] = "rgb(255,255,255)";
      break;
      case 2:
        node_fill[i][j] = generateColor(100,50);
      break;
      case 3:
        node_fill[i][j] = "url(%23l_grd_2col)";
      break;
      case 4:
        node_fill[i][j] = "url(%23l_grd" + i + "_" + j + ")";
      break;
      case 5:
        node_fill[i][j] = "url(%23r_grd_single)";
      break;
      case 6:
        node_fill[i][j] = "url(%23r_grd" + i + "_" + j + ")";
      break;
      default:
    }
  }
}

let gradients = `
  .rect1 {
    fill: ${square_fill[0]};
  }
  .rect2 {
    fill: ${square_fill[1]};
  }
  .rect3 {
    fill: ${square_fill[2]};
  }
  .rect4 {
    fill: ${square_fill[3]};
  }
  .rect1_node1 {
    fill: ${node_fill[0][0]};
  }
  .rect1_node2 {
    fill: ${node_fill[0][1]};
  }
  .rect1_node3 {
    fill: ${node_fill[0][2]};
  }
  .rect1_node4 {
    fill: ${node_fill[0][3]};
  }
  .rect1_node5 {
    fill: ${node_fill[0][4]};
  }
  .rect1_node6 {
    fill: ${node_fill[0][5]};
  }
  .rect1_node7 {
    fill: ${node_fill[0][6]};
  }
  .rect1_node8 {
    fill: ${node_fill[0][7]};
  }
  .rect2_node1 {
    fill: ${node_fill[1][0]};
  }
  .rect2_node2 {
    fill: ${node_fill[1][1]};
  }
  .rect2_node3 {
    fill: ${node_fill[1][2]};
  }
  .rect2_node4 {
    fill: ${node_fill[1][3]};
  }
  .rect2_node5 {
    fill: ${node_fill[1][4]};
  }
  .rect2_node6 {
    fill: ${node_fill[1][5]};
  }
  .rect2_node7 {
    fill: ${node_fill[1][6]};
  }
  .rect2_node8 {
    fill: ${node_fill[1][7]};
  }
  .rect3_node1 {
    fill: ${node_fill[2][0]};
  }
  .rect3_node2 {
    fill: ${node_fill[2][1]};
  }
  .rect3_node3 {
    fill: ${node_fill[2][2]};
  }
  .rect3_node4 {
    fill: ${node_fill[2][3]};
  }
  .rect3_node5 {
    fill: ${node_fill[2][4]};
  }
  .rect3_node6 {
    fill: ${node_fill[2][5]};
  }
  .rect3_node7 {
    fill: ${node_fill[2][6]};
  }
  .rect3_node8 {
    fill: ${node_fill[2][7]};
  }
  .rect4_node1 {
    fill: ${node_fill[3][0]};
  }
  .rect4_node2 {
    fill: ${node_fill[3][1]};
  }
  .rect4_node3 {
    fill: ${node_fill[3][2]};
  }
  .rect4_node4 {
    fill: ${node_fill[3][3]};
  }
  .rect4_node5 {
    fill: ${node_fill[3][4]};
  }
  .rect4_node6 {
    fill: ${node_fill[3][5]};
  }
  .rect4_node7 {
    fill: ${node_fill[3][6]};
  }
  .rect4_node8 {
    fill: ${node_fill[3][7]};
  }
`;


function createLinearGradient(id, x2, y2, stops, offsets, colors) {
  let gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
  gradient.setAttribute("id", id);
  gradient.setAttribute("x2", x2);
  gradient.setAttribute("y2", y2);
  for(let i = 0; i < stops; i++) {
    let stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop.setAttribute("offset", offsets[i]);
    stop.setAttribute("stop-color", colors[i]);
    gradient.appendChild(stop);
  }
  defs.appendChild(gradient);
}

function createRadialGradient(id, stops, offsets, colors) {
  let gradient = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
  gradient.setAttribute("id", id);
  for(let i = 0; i < stops; i++) {
    let stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop.setAttribute("offset", offsets[i]);
    stop.setAttribute("stop-color", colors[i]);
    gradient.appendChild(stop);
  }
  defs.appendChild(gradient);
}

let css_gradients = document.createElementNS("http://www.w3.org/2000/svg", "style");
css_gradients.textContent = gradients;
svg_el.appendChild(css_gradients);