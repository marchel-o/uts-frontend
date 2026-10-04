$("#overlay, .cancel, .continue").on("click", () => {
  $("#delete-container").css("display", "none");
  $("#edit-container").css("display", "none");
  $("#overlay").css("display", "none");
  $("#tambah-akun-form").css("display", "none");
})

$(".delete-btn").on("click", function() {
  const nama = $(this).closest(".card-akun").children("p").first().text();
  $("#delete-container, #overlay").css("display", "flex");
  $("#delete-nama").text(nama);
})

$(".edit-btn").on("click", () => {
  $("#edit-container, #overlay").css("display", "flex");
})


$("#tambah-akun-form").on("submit", (e) => {
  e.preventDefault();
  $("#tambah-akun-form").css("display", "none");
  $("#overlay").css("display", "none");
})

$("#tambah-akun-btn").on("click", (e) => {
  $("#overlay").css("display", "block");
  $("#tambah-akun-form").css("display", "flex");
})