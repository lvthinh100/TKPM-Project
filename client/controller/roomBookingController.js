exports.renderRoomBookingPage = (req, res) => {
  const data = {
    ticketId: "PHKHS12F",
    userId: "KH12KD4D",
    userName: "Lê Văn Thịnh",
    checkIn: "25/02/2002",
    checkOut: "27/02/2002",
    num: 3,
    status: "checked in",
  };

  const tickets = [data, data, data, data, data, data, data];

  return res.render("roomBooking", {
    tickets,
  });
};
