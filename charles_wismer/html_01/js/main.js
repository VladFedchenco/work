function $(sel) {
  return document.querySelector(sel);
}

$("#initial").addEventListener('change', function() {
  $("svg").setAttribute("class", "initial");
});

$("#email").addEventListener('change', function() {
  $("svg").setAttribute("class", "email");
});

$("#reading").addEventListener('change', function() {
  $("svg").setAttribute("class", "read");
});

$("#writing").addEventListener('change', function() {
  $("svg").setAttribute("class", "write");
});

$("#password").addEventListener('change', function() {
  $("svg").setAttribute("class", "password");
});

$("#initial_color").addEventListener('change', function() {
  $("#owl").setAttribute("class", "");
});

$("#grayscale_color").addEventListener('change', function() {
  $("#owl").setAttribute("class", "");
  $("#owl").classList.add("v2");
});

$("#purple_color").addEventListener('change', function() {
  $("#owl").setAttribute("class", "");
  $("#owl").classList.add("v3");
});