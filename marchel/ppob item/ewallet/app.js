$("#topup-ewallet-form").on("submit", (e) => {
  e.preventDefault();

  $("#ewallet-result, #overlay").css("display", "block");
  $("#ewallet-result #provider-val").text($("#ewallet-provider").val());
  $("#ewallet-result #nomor-val").text($("#ewallet-nomor").val());
  $("#ewallet-result #price-val").text($("#ewallet-nominal").val());
  $("#ewallet-result #total-val").text((parseInt($("#ewallet-nominal").val())+2500).toLocaleString('id-ID'));
})

$("#overlay, #cancel, #pay").on("click", () => {
  $("#ewallet-result").css("display", "none");
  $("#overlay").css("display", "none");
})