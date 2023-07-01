const api = require("../api/index");

exports.renderRoomBookingPage = async (req, res) => {
  const { data } = await api.getAllBookingTicket();
  const B = data.data.reduce((acc, curr) => {
    const existing = acc.find((item) => item.ticketid === curr.ticketid);
    if (existing) {
      existing.room.push(curr.room.trim());
    } else {
      acc.push({ ...curr, ticketid: curr.ticketid, room: [curr.room.trim()] });
    }
    return acc;
  }, []);
  console.log(B);
  return res.render("roomBooking", {
    tickets: B,
  });
};
