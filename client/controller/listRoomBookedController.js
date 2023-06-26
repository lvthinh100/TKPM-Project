const api = require("../api/index");

exports.renderlistRoomBookedPage = async (req, res) => {
  // id = 'KHAP2BFE'
  var { data } = await api.getAllTicket();
  let tickets = data.data;

  for (let i of tickets) {
    console.log(i.MADATPHONG);
    var { data } = await api.getDetailTicket(i.MADATPHONG);
    console.log(data.data);
    i.ROOM = data.data;
  }
  console.log(tickets);
  // Trả về home.hbs
  res.render("listRoomBookedPage", {
    template: { title: "Chi tiết phiếu đặt phòng" },
    listTicket: tickets,
  });
};
