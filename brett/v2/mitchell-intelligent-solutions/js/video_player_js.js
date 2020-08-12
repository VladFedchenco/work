/*jQuery(function($){
	$(document).ready(function(){
		$('#iframe-on-pop').click(function(){
			console.log('clicked');	
		});
	});
});
var vidId = $('.cover').data('ytid');
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
	  height: '510',
	  width: '910',
	  videoId: vidId,
	  events: {
		'onReady': onPlayerReady,
		'onStateChange': onPlayerStateChange
	  }
	});
}
function onPlayerReady(event) {
	console.log('PLAYER READY');
}
var done = false;
function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING && !done) {
		//setTimeout(stopVideo, 6000);
		//done = true;
		console.log(event);
	}
}
function playVideo(){
	player.playVideo();
	$('.cover').toggleClass('opacity');
}
function pauseVideo() {
	player.pauseVideo();
}
function stopVideo(){
	player.stopVideo();
	$('.cover').toggleClass('opacity');
}
function unMute(){
	player.unMute();
} */