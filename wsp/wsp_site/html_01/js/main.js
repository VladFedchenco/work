let big_logo = $("#logo_big");

if (big_logo) {
  window.addEventListener("scroll", function() {
      if (window.scrollY >= 100) {
        $("#logo").classList.remove("hidden");
        $("#logo_big").classList.add("hidden");
      } else {
        $("#logo").classList.add("hidden");
        $("#logo_big").classList.remove("hidden");
      }
  });
}

$("#mobile_menu").addEventListener("click", function() {
  $("body").classList.toggle("menu_active");
});

function $(sel) {
  return document.querySelector(sel);
}