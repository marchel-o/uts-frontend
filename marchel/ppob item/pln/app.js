$("#pln-form").on("submit", (e) => {
  e.preventDefault();

  $("#pln-result, #overlay").css("display", "flex");
  $("#pln-result #jenis-val").text($("#pln-jenis").val());
  $("#pln-result #registrasi-val").text($("#pln-nomor").val());
  // $("#pln-result #pln").text($("#ewallet-nominal").val());
  $("#pln-result #total-val").text((5000000+2500).toLocaleString('id-ID'));
})

$("#overlay, #cancel, #pay").on("click", () => {
  $("#pln-result").css("display", "none");
  $("#overlay").css("display", "none");
})