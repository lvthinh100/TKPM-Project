$("#delete-room").click(function (e) {
  const id = $(".room-detail").attr("id");
  console.log(id);
  const detailURL = "/detailRoomInfo?id=" + id;
  console.log(detailURL);

  $.ajax({
    method: "post",
    url: detailURL,
    data: { id: id },
    success: function (data) {
      console.log(data);
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
