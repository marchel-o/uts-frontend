$(".pulsa-item").on("click", function(){
  $(".pulsa-item").removeClass("picked");
  $(this).addClass("picked");
  $("#continue-container").addClass("show");
  $("#continue-harga").text($(this).find(".harga-pulsa").text());
})