function $(sel) {
  return document.querySelector(sel);
}

$("#email").addEventListener('focus', function() {
  $("#owl").classList.add("transition");
  if($("svg").getAttribute("class") == "password_reverse") {
    setTimeout(function(){
      $("svg").setAttribute("class", "email");
    }, 500);
    setTimeout(function(){
      $("svg").setAttribute("class", "email_static");
    }, 1000);
  } else {
    $("svg").setAttribute("class", "email");
    setTimeout(function(){
      $("svg").setAttribute("class", "email_static");
    }, 500);
  }
});

$("#email").addEventListener('keyup', function() {
  if (this.value.length <= 1) {
    $("svg").setAttribute("class", "read");
    setTimeout(function(){
      $("svg").setAttribute("class", "turn1");
    }, 500);
  }
  if (this.value.length == 2) { $("svg").setAttribute("class", "turn2") }
  if (this.value.length == 3) { $("svg").setAttribute("class", "turn3") }
  if (this.value.length == 4) { $("svg").setAttribute("class", "turn4") }
  if (this.value.length == 5) { $("svg").setAttribute("class", "turn5") }
  if (this.value.length == 6) { $("svg").setAttribute("class", "turn6") }
  if (this.value.length == 7) { $("svg").setAttribute("class", "turn7") }
  if (this.value.length == 8) { $("svg").setAttribute("class", "turn8") }
  if (this.value.length == 9) { $("svg").setAttribute("class", "turn9") }
  if (this.value.length == 10) { $("svg").setAttribute("class", "turn10") }
  if (this.value.length == 11) { $("svg").setAttribute("class", "turn11") }
  if (this.value.length == 12) { $("svg").setAttribute("class", "turn12") }
  if (this.value.length == 13) { $("svg").setAttribute("class", "turn13") }
  if (this.value.length == 14) { $("svg").setAttribute("class", "turn14") }
  if (this.value.length == 15) { $("svg").setAttribute("class", "turn15") }
  if (this.value.length == 16) { $("svg").setAttribute("class", "turn16") }
  if (this.value.length == 17) { $("svg").setAttribute("class", "turn17") }
  if (this.value.length == 18) { $("svg").setAttribute("class", "turn18") }
  if (this.value.length == 19) { $("svg").setAttribute("class", "turn19") }
  if (this.value.length == 20) { $("svg").setAttribute("class", "turn20") }
  if (this.value.length == 21) { $("svg").setAttribute("class", "turn21") }
  if (this.value.length == 22) { $("svg").setAttribute("class", "turn22") }
  if (this.value.length == 23) { $("svg").setAttribute("class", "turn23") }
  if (this.value.length == 24) { $("svg").setAttribute("class", "turn24") }
  if (this.value.length >= 25) { $("svg").setAttribute("class", "turn25") }
});

$("#email").addEventListener('blur', function() {
  $("#owl").classList.remove("transition")
  $("svg").setAttribute("class", "email_reverse");
  setTimeout(function(){
    $("svg").setAttribute("class", "init");
  }, 500);
});

$("#password").addEventListener('focus', function() {
  $("#owl").classList.remove("transition")
  if($("svg").getAttribute("class") == "email_reverse") {
    setTimeout(function(){
      $("svg").setAttribute("class", "password");
    }, 500);
    setTimeout(function(){
      $("svg").setAttribute("class", "password_static");
    }, 1000);
  } else {
    $("svg").setAttribute("class", "password");
    setTimeout(function(){
      $("svg").setAttribute("class", "password_static");
    }, 500);
  }
});

$("#password").addEventListener('blur', function() {
  $("svg").setAttribute("class", "password_reverse");
  setTimeout(function(){
    $("svg").setAttribute("class", "init");
  }, 500);
});