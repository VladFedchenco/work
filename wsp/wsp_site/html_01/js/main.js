function $(sel) {
  return document.querySelector(sel);
}

window.addEventListener("scroll", function() {
  if (window.scrollY >= 100) {
    $("#logo").classList.remove("hidden");
    $("#logo_big").classList.add("hidden");
  } else {
    $("#logo").classList.add("hidden");
    $("#logo_big").classList.remove("hidden");
  }
});