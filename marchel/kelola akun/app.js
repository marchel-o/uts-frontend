$("#overlay, .cancel, .continue").on("click", () => {
  $("#delete-container").css("display", "none");
  $("#edit-container").css("display", "none");
  $("#overlay").css("display", "none");
})

$(".delete-btn").on("click", function() {
  const nama = $(this).closest(".card-akun").children("p").first().text();
  $("#delete-container, #overlay").css("display", "flex");
  $("#delete-nama").text(nama);
})

$(".edit-btn").on("click", () => {
  $("#edit-container, #overlay").css("display", "flex");

})