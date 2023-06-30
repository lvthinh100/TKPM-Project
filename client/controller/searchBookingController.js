const api = require("../api/index");

exports.renderSearchBookingPage = async (req, res) => {
  console.log("Query", req.query.id);

  var { data } = await api.getTicketsById(req.query.id);
  dataBooking = data.data[0];
  console.log(dataBooking);

  if (data.data.length != 0) {
    var { data } = await api.getDetailTicket(dataBooking.MADATPHONG);
    dataDetailBooking = data.data;
    console.log(dataDetailBooking);

    // Trả về searchBookingPage
    res.render("searchBookingPage", {
      template: { title: "Chi tiết đặt phòng" },
      message: 'THÔNG TIN ĐẶT PHÒNG',
      dataBooking: dataBooking,
      dataDetailBooking: dataDetailBooking,
    });
  }
  else {
    res.render("searchBookingPage", {
      template: { title: "Chi tiết đặt phòng" },
      message: 'Không có thông tin đặt phòng',
    });
  }


};
