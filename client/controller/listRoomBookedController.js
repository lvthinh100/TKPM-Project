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

exports.updateStatusById = async (req, res) => {
  console.log(req.query);
  console.log(req.body);

  const status = {TRANGTHAI: req.body.TRANGTHAI};

  const { data } = await api.updateStatusById(req.body.id, status);
  console.log(data);

  res.redirect("/listRoomBooked");
};
