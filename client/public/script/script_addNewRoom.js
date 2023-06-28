$("#add-room-btn").click(function (e) {
  const typeRoom = $("#typeRoom").val();
  const imgRoom = $("#imgRoom").val();
  const maxPeople = $("#maxPeople").val();
  const floor = $("#floor").val();
  const numBed = $("#numBed").val();
  const areaRoom = $("#areaRoom").val();
  const description = $("#description").val();
  const remark = $("#remark").val();

  $.ajax({
    method: "post",
    data: {
      typeRoom: typeRoom,
      imgRoom: imgRoom,
      maxPeople: maxPeople,
      floor: floor,
      numBed: numBed,
      areaRoom: areaRoom,
      description: description,
      remark: remark
    },
    url: "/addNewRoom",
    success: function (data) {
      $(".noti-content").html(`Thêm phòng thành công`);

      $(".pop-up").removeClass("hidden");
      $(".fa-window-close").click(function () {
        window.location.reload();
      });
      setTimeout(function () {
        window.location.reload();
    }, 1000);
    },
  });
});
