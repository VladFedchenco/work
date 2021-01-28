let requestURL = 'js/data.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  $("#prize_head").innerText = prizeData.head;
  $("#prize_id").setAttribute("src", prizeData.prize_id);
  $("#prize_name").innerText = prizeData.prize_name;
  $("#prize_underline").innerText = prizeData.prize_underline;
  $("#prize_size").innerText = prizeData.prize_size;
}

function $(sel) {
  return document.querySelector(sel);
}


$("#start").onclick = function() {
  $("#main_star").setAttribute("class", "rotation");
  $("#click_circles").setAttribute("class", "hidden");
  $("#hand_pointer").setAttribute("class", "hidden");
  $("#pointer_text").setAttribute("class", "hidden");

  setTimeout(function(){
    $("#corner_animation").setAttribute("class", "active");
    setTimeout(function(){
      $("#scene_01").setAttribute("class", "inactive");
      $("#scene_02").setAttribute("class", "paused");
      setTimeout(function(){
        $("#scene_02").setAttribute("class", "");
      }, 50);
    }, 1000);
  }, 1500);
}