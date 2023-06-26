const api = require("../api/index");

exports.renderDetailRoomInfoPage = async (req, res) => {

  var { data } = await api.getRoomById(req.query.id);
  roomData = data.data[0];

  var { data } = await api.getAllTypeRoom();
  typeRoomData = data.data;

  // Trả về detailRoomInfoPage
  res.render("detailRoomInfoPage", {
    template: { title: "Test" },
    itemRoom: roomData,
    listTypeRoom: typeRoomData,
  });
};
