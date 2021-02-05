// let requestURL = 'js/data.json';
// let request = new XMLHttpRequest();
// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();

// request.onload = function() {
//   const prizeData = request.response;
//   $("#prize_head").innerText = prizeData.head;
//   $("#prize_id").setAttribute("src", prizeData.prize_id);
//   $("#prize_name").innerText = prizeData.prize_name;
//   $("#prize_underline").innerText = prizeData.prize_underline;
//   $("#prize_size").innerText = prizeData.prize_size;
// }

let sector;

function $(sel) {
  return document.querySelector(sel);
}

function randomNumber(min, max) {  
    min = Math.ceil(min); 
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

$("#bttn").onclick = function() {
  sector = randomNumber(1, 8);
  $("#sectors").setAttribute("class", "sector" + sector);
  $("#reset").setAttribute("class", "");
  $("#bttn").setAttribute("class", "invis");
}

$("#reset").onclick = function() {
  sector = randomNumber(1, 8);
  $("#sectors").setAttribute("class", "");
  $("#bttn").setAttribute("class", "");
  $("#reset").setAttribute("class", "invis");
}