window.addEventListener('load', function () {

  let scContainer = document.getElementById('tgp_container');
  let sc = new ScratchCard('#tgp_container', {
    enabledPercentUpdate: true,
    scratchType: SCRATCH_TYPE.SPRAY,
    //brushSrc: 'imgs/brush.png',
    containerWidth: 302,
    containerHeight: 326,
    imageForwardSrc: 'imgs/ticket.png',
    imageBackgroundSrc: '',
    clearZoneRadius: 30,
    percentToFinish: 60,
    nPoints: 200,
    pointSize: 3,
    callback: function () {
      ticket.setAttribute("style", "display: none");
      document.getElementById('info').setAttribute("class", "");
      document.getElementById('win_big').setAttribute("class", "");
    }
  })
  sc.init();

  let ticket = document.querySelector(".sc__canvas");
  ticket.onmousedown = function() {
    document.getElementById('click_anim').setAttribute("class", "invis");
    document.getElementById('click_text').setAttribute("class", "invis");
    document.getElementById('prize').setAttribute("style", "opacity: 1");
    setTimeout(function(){
      document.getElementById('click_anim').style.display = "none";
      document.getElementById('click_text').style.display = "none";
    }, 400);
  };

});