let gametype, color1, color2, color3, product1, product2, product3, descriprion1, descriprion2, descriprion3;

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
    gametype = prizeData.gametype;
    $("#can1 img").setAttribute("src", prizeData.can1);
    $("#can2 img").setAttribute("src", prizeData.can2);
    $("#can3 img").setAttribute("src", prizeData.can3);
    $("#open1").setAttribute("src", prizeData.can1_open);
    $("#open2").setAttribute("src", prizeData.can2_open);
    $("#open3").setAttribute("src", prizeData.can3_open);
    color1 = prizeData.can1_color;
    color2 = prizeData.can2_color;
    color3 = prizeData.can3_color;
    product1 = prizeData.can1_product;
    product2 = prizeData.can2_product;
    product3 = prizeData.can3_product;
    descriprion1 = prizeData.can1_descriprion;
    descriprion2 = prizeData.can2_descriprion;
    descriprion3 = prizeData.can3_descriprion;
}

$("#can1").addEventListener("click", () => {
  $("#banner_win").style.background = color1;
  $("#banner_win h2").innerHTML = product1;
  $("#banner_win h3").innerHTML = descriprion1;
  hide_cans();
  setTimeout(function(){
    $("#open1").classList.remove("invis");
  }, 200);
  setTimeout(function(){
    $("#open1").classList.add("hide");
  }, 2000);
}, false);

$("#can2").addEventListener("click", () => {
  $("#banner_win").style.background = color2;
  $("#banner_win h2").innerHTML = product2;
  $("#banner_win h3").innerHTML = descriprion2;
  hide_cans();
  setTimeout(function(){
    $("#open2").classList.remove("invis");
  }, 200);
  setTimeout(function(){
    $("#open2").classList.add("hide");
  }, 2000);
}, false);

$("#can3").addEventListener("click", () => {
  $("#banner_win").style.background = color3;
  $("#banner_win h2").innerHTML = product3;
  $("#banner_win h3").innerHTML = descriprion3;
  hide_cans();
  setTimeout(function(){
    $("#open3").classList.remove("invis");
  }, 200);
  setTimeout(function(){
    $("#open3").classList.add("hide");
  }, 2000);
}, false);

const randomNumber = Math.floor(Math.random() * 1000) + 1;

function play_sound() {
  $("#sound").play();
  $("#sound").loop=false;
}

function hide_cans() {
  play_sound();
  if (gametype == 2) {
    $("#prize").setAttribute("src", "imgs/tumbler.png");
  }
  $("#pointer").classList.add("invis");
  $("#can1").classList.add("invis");
  $("#can2").classList.add("invis");
  $("#can3").classList.add("invis");
  $("#banner").classList.add("invis");
  setTimeout(function(){
    $("#banner_win").classList.remove("invis");
  }, 200);
  setTimeout(function(){
    $("#gradient").classList.add("invis");
    $("#crab").classList.remove("invis");
    $("#banner_win").classList.add("move");
    $("#pointer").style.display = "none";
  }, 2000);
  setTimeout(function(){
    $("#coins").setAttribute("src", "imgs/coins.svg");
    $("#coins").classList.remove("invis");
  }, 2100);
  setTimeout(function(){
    $("#prize").classList.remove("invis");
    $("#banner_win").style.display = "none";
  }, 4000);
  setTimeout(function(){
    $("#title").classList.remove("hidden");
    $("#crab").style.display = "none";
  }, 5000);
  setTimeout(function(){
    if (gametype == 1) {
      $("#content_win").classList.remove("hidden");
    } else {
      $("#redeem").classList.remove("hidden");
    }
  }, 5500);
}

function $(sel) {
  return document.querySelector(sel);
}
