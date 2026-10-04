$(".data-item").on("click", function(){
  $(".data-item").removeClass("picked");
  $(this).addClass("picked");
  $("#continue-container").addClass("show");
  $("#continue-harga").text($(this).find(".harga-data").text());
})