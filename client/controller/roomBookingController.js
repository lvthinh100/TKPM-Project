const api = require("../api/index");

exports.renderRoomBookingPage = async (req, res) => {
  const { data } = await api.getAllBookingTicket();
  console.log("roomBoookingController: ", data);
  return res.render("roomBooking", {
    tickets: data.data,
  });
};
