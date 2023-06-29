const api = require("../api/index");

exports.renderlistRoomBookedPage = async (req, res) => {
  const idKH = req.user.userId;
  console.log(req.user.userId);

  var { data } = await api.getTicketsByUser(idKH);
  console.log(data);

  let tickets = data.data;

  for (let i of tickets) {
    //console.log(i.MADATPHONG);
    var { data } = await api.getDetailTicket(i.MADATPHONG);
    //console.log(data.data);
    i.ROOM = data.data;
  }
  console.log(tickets);
  // Trả về 
  res.render("listRoomBookedPage", {
    template: { title: "Chi tiết phiếu đặt phòng" },
    listTicket: tickets,
  });
};

exports.deleteBookingById = async (req, res) => {
  console.log(req.query);
  console.log(req.body);

  const { data } = await api.deleteBookingById(req.query.id);
  console.log(data);

  res.redirect("/listRoomBooked");
};
