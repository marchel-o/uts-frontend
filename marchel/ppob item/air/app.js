$("#air-form").on("submit", (e) => {
  e.preventDefault();

  $("#air-result, #overlay").css("display", "flex");
  $("#air-result #wilayah-val").text($("#air-wilayah").val());
  $("#air-result #nomor-val").text($("#air-nomor").val());
  $("#air-result #total-val").text((300000+2500).toLocaleString('id-ID'));
})

$("#overlay, #cancel, #pay").on("click", () => {
  $("#air-result").css("display", "none");
  $("#overlay").css("display", "none");
})