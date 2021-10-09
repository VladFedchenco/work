let cnvs = $('#main_canvas');
ctx = cnvs.getContext('2d');
ctx.beginPath();
ctx.rect(20, 20, 150, 100);
ctx.stroke();

function $(sel) {
  return document.querySelector(sel);
}