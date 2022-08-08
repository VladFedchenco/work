function $(sel) {
  return document.querySelector(sel);
}

$("#game").onclick = function() {
  this.classList.add(cl);
  $("#hand").classList.add("invis");
}