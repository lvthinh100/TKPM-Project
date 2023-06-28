$("#delete-room").click(function (e) {
  const id = $(".product-detail").attr("id");

  $.ajax({
    method: "post",
    url: "/listRoomInfo",
    data: { id: id },
    success: function (data) {
      console.log(data.id);
      $(".noti-content").html(`<p>Xóa thành công</p>`);

      $(".pop-up").removeClass("hidden");
      $(".fa-window-close").click(function () {
        window.location.href = "/listRoomInfo";
      });

      setTimeout(function () {
        window.location.href = "/listRoomInfo";
      }, 1000);

    },
  });
});
