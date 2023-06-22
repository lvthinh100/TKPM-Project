const api = require("../api/index");

exports.renderAddNewRoomPage = async (req, res) => {
  const { data } = await api.getAllTypeRoom();

  console.log(data.data);

  // Trả về detailRoomInfoPage
  res.render("addNewRoomPage", {
    template: { title: "Thêm phòng mới" },
    listTypeRoom: data.data,
  });
};

exports.handleAddNewRoom = async (req, res) => {
  // Trả về detailRoomInfoPage
  console.log(req.body);

  const { data } = await api.getMaxIDRoom(req.body.floor);

  const idRoom = String(parseInt(data.data[0].max)+1)
  console.log(idRoom);
  
  const dataRoom = {
    maphong: idRoom,
    loaiphong: req.body.typeRoom,
    tang: req.body.floor,
    sogiuong: req.body.numBed,
    sokhachtoida: req.body.maxPeople,
    dientich: req.body.areaRoom,
    tinhtrang: "TRONG",
    mota: req.body.description,
    ghichu: req.body.remark,
  };
  console.log(dataRoom)
  
  const { resData } = await api.createRoom(dataRoom);

  console.log(resData);
  

  this.renderAddNewRoomPage;
};
