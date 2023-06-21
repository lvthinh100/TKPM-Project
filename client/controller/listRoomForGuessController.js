const api = require("../api");

exports.renderlistRoomForGuessPage = async (req, res) => {
  const { data } = await api.getAllRoom();

  res.render("listRoomForGuessPage", {
    template: { title: "Đặt phòng" },
    listRoom: data.data,
  });
};
