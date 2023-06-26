$("#delete-room").click(function (e) {
  const id = $(".product-detail").attr("id");

  $.ajax({
    method: "post",
    url: "/detailRoomInfo",
    data: { id: id },
    success: function (data) {
      console.log(data.id);
      window.location.href = "/listRoomInfo";
      console.log(window);
    },
  });
});
