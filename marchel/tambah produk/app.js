let popupTimer;

function showPopup() {
  const $p = $('#modal-popup');

  $p.find('p').text("Berhasil ditambahkan!");

  clearTimeout(popupTimer);

  $p.addClass('show');

  $('#modal-popup').on('click', function() {
    $(this).removeClass('show');
    clearTimeout(popupTimer);
  });
  
  popupTimer = setTimeout(() => {
    $p.removeClass('show');
  }, 2000);
}


$("#tambah-produk-form").on("submit", (e) => {
  e.preventDefault();

  showPopup();
})