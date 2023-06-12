const api = require("../api/index");

exports.renderAddNewRoomPage = async (req, res) => {
  // Trả về detailRoomInfoPage
  res.render("addNewRoomPage", {
    template: { title: "Thêm phòng mới" },
  });
};

exports.handleAddNewRoom = async (req, res) => {
  // Trả về detailRoomInfoPage
  console.log("This come from handler", req.body);

  const data = {
    maphong: "109",
    loaiphong: "DONVIP",
    tang: 1,
    sogiuong: 3,
    sokhachtoida: 2,
    dientich: 140,
    tinhtrang: "TRONG",
    mota: "Phòng 103 với nhiều giường",
    ghichu: "Ghi chú của 103",
  };

  const resData = await api.createRoom(data);

  console.log(resData);

  res.render("addNewRoomPage", {
    template: { title: "Thêm phòng mới" },
  });
};
