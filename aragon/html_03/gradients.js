let defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

createLinearGradient("l_grd1", 0, 1, 2, [0, 1], ["rgb(0,100,0)", "rgb(200,100,200)"]);
createLinearGradient("l_grd2", 0, 1, 2, [0, 1], ["rgb(200,100,80)", "rgb(20,100,20)"]);
createLinearGradient("l_grd3", 0, 1, 4, [0, .5, .5, 1], ["rgb(200,200,80)", "rgb(200,200,80)", "rgb(20,100,20)", "rgb(20,100,20)"]);

createRadialGradient("r_grd1", 3, [0, .5, 1], ["rgb(255,255,200)", "rgb(10,150,250)", "rgb(200,200,100)"]);
createRadialGradient("r_grd2", 6, [0, .3, .3, .7, .7, 1], ["rgb(255,255,200)", "rgb(255,255,200)", "rgb(10,150,250)", "rgb(10,150,250)", "rgb(20,20,100)", "rgb(20,20,100)"]);

svg_el.appendChild(defs);

let gradients = `
  .big_rect {
    fill: url(%23l_grd1);
  }
  .rect2 {
    fill: url(%23l_grd2);
  }
  .rect3 {
    fill: url(%23r_grd1);
  }
  .rect1_node1 {
    fill: url(%23l_grd3);
  }
  .rect1_node2 {
    fill: url(%23r_grd2);
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