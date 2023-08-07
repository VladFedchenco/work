window.addEventListener('load', function () {

  let scContainer = $('#tgp_container');
  let sc = new ScratchCard('#tgp_container', {
    enabledPercentUpdate: true,
    scratchType: SCRATCH_TYPE.LINE,
    containerWidth: 302,
    containerHeight: 326,
    imageForwardSrc: 'imgs/ticket.png',
    imageBackgroundSrc: 'imgs/empty.png',
    clearZoneRadius: 20,
    percentToFinish: 30,
    nPoints: 200,
    pointSize: 3,
    callback: function () {
      ticket.setAttribute("style", "display: none");
      $('#stars').setAttribute("class", "play");
      $('#prize_head').setAttribute("class", "");
      $('#prize').setAttribute("class", "ready");
      setTimeout(function(){
        $('#stars').setAttribute("class", "");
        $('#info_block').setAttribute("class", "");
      }, 1000);
    }
  })
  sc.init();

  let ticket = $(".sc__canvas");
  ticket.addEventListener("mousedown", ticket_reveal);
  ticket.addEventListener("touchstart", ticket_reveal);

});

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  let p_head = prizeData.head;
  p_head ? $("#prize_head").innerText = p_head : $("#prize_head").style.display = "none";
  let blt = prizeData.ballot_img;
  blt ? $("#ballot").setAttribute("src", blt) : $("#bllt_box").style.display = "none";
  let entry_num = prizeData.entry_num;
  entry_num ? $("#entry_num").innerText = entry_num : $("#entry_num").style.display = "none";
  let entry_text = prizeData.entry_text;
  entry_text ? $("#entry_text").innerText = entry_text : $("#entry_text").style.display = "none";
  let bllt_text = prizeData.ballot_text;
  bllt_text ? $("#bllt_text").innerText = bllt_text : $("#bllt_text").style.display = "none";
  let giftcard = prizeData.giftcard_img;
  giftcard ? $("#giftcard").setAttribute("src", giftcard) : $("#giftcard").style.display = "none";
  let prize = prizeData.prize_id;
  prize ? $("#prize_id").setAttribute("src", prize) : $("#prize_id").style.display = "none";
  let p_name = prizeData.prize_name;
  p_name ? $("#prize_name").innerText = p_name : $("#prize_name").style.display = "none";
  let p_line = prizeData.prize_underline;
  p_line ? $("#prize_underline").innerText = p_line : $("#prize_underline").style.display = "none";
  let note = prizeData.note;
  note ? $("#note").innerHTML = note : $("#note").style.display = "none";
}

function ticket_reveal() {
  $('#tickt2x').setAttribute("class", "invis");
  $('#click_anim').setAttribute("class", "invis");
  $('#click_text').setAttribute("class", "invis");
  $('#prize').setAttribute("style", "opacity: 1");
  setTimeout(function(){
    $('#click_anim').style.display = "none";
    $('#click_text').style.display = "none";
  }, 400);
}

function $(sel) {
  return document.querySelector(sel);
}