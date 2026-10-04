$("#kredit-form").on("submit", (e) => {
  e.preventDefault();

  $("#kredit-result, #overlay").css("display", "flex");
  $("#kredit-result #bank-val").text($("#kredit-bank").val());
  $("#kredit-result #nomor-val").text($("#kredit-nomor").val());
  $("#kredit-result #total-val").text((300000+2500).toLocaleString('id-ID'));
})

$("#overlay, #cancel, #pay").on("click", () => {
  $("#kredit-result").css("display", "none");
  $("#overlay").css("display", "none");
})