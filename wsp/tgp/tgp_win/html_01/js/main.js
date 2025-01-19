// let request = new XMLHttpRequest();
// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();

// request.onload = function() {
//   const prizeData = request.response;
//     $("#gift_text").textContent = prizeData.ballot;
// }

function $(sel) {
  return document.querySelector(sel);
}

document.addEventListener("DOMContentLoaded", function(event) {
  setTimeout(function(){
    $("#hometown_logo").classList.remove("hidden");
  }, 50);
  setTimeout(function(){
    $("#town").classList.remove("hidden");
  }, 500);
  setTimeout(function(){
    $("#prize").classList.remove("hidden");
  }, 800);
  setTimeout(function(){
    $("#prize").classList.add("play");
  }, 1200);
  setTimeout(function(){
    $("#prize_content").classList.remove("hidden");
  }, 3600);
});