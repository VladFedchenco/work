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

function $(sel) {
  return document.querySelector(sel);
}

$("#main_banner").onclick = function() {
  $("#curl_animation").setAttribute("class", "c_play");
  $("#pointer-block").setAttribute("class", "hidden");
  $("#click_to_open").setAttribute("class", "hidden");

  if(!win) {
    setTimeout(function(){
      $("#main").setAttribute("class", "hide");
      setTimeout(function(){
        $("#eargings").setAttribute("class", "disp");
        setTimeout(function(){
          $("#main").setAttribute("class", "hide invis");
          $("#eargings").setAttribute("class", "disp visible");
        }, 50);
      }, 250);
    }, 700);
  } else {
    setTimeout(function(){
      $("#main").setAttribute("class", "hide");
      $("#winning").setAttribute("class", "disp");
      setTimeout(function(){
        $("#main").setAttribute("class", "hide invis");
        $("#winning").setAttribute("class", "disp visible");
      }, 50);
    }, 700);
  }
}

$("#full_details").onclick = function() {
  $("#popup").setAttribute("class", "disp");
  setTimeout(function(){
    $("#popup").setAttribute("class", "disp visible");
  }, 50);
}

$("#popup_close").onclick = function() {
  $("#popup").setAttribute("class", "disp");
  setTimeout(function(){
    $("#popup").setAttribute("class", "");
  }, 50);
}