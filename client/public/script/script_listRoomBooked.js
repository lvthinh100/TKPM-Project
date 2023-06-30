$("#listRoomBooked").click(function (e) {
  console.log(e.target);
  if (e.target.classList.contains("cancel-booking-btn")) {
    console.log("ALOALO");
    const id = e.target.dataset.id;
    $.ajax({
      method: "patch",
      url: `http://127.0.0.1:3000/api/bookingTicket/checkOut/${id}`,
      data: { id: id, TRANGTHAI: 'DAHUY' },
      success: function (data) {
        console.log(data);
        $(".noti-content").html(`Hủy đặt phòng thành công`);

        $(".pop-up").removeClass("hidden");
        $(".fa-window-close").click(function () {
          window.location.href = "/listRoomBooked";
        });
        setTimeout(function () {
          window.location.href = "/listRoomBooked";
        }, 1000);
      },
    });
  }
});


