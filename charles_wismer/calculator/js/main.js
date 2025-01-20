function $(sel) {
  return document.querySelector(sel);
}

$("#estimate").addEventListener('click', function() {
  let month, quarter, year;
  month = $("#client").value * ($("#percentage").value / 100) * $("#billing").value;
  quarter = month * 3;
  year = month * 12;

  $("#month_val").innerText = month;
  $("#quarter_val").innerText = quarter;
  $("#year_val").innerText = year;

  $("#calculator").classList.add("hidden");
  $("#results").classList.remove("hidden");
});


