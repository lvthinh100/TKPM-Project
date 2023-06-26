const api = require("../api/index");

exports.renderBookingRoomPage = async (req, res) => {
  const { data } = await api.getAllBookingTicket();
  console.log(data);
  return res.render("bookingRoomPage");
};
