const api = require("../api");

exports.renderlistRoomInfoPage = async (req, res) => {
  const { data } = await api.getAllRoom();

  console.log(data.data);

  // Trả về home.hbs
  res.render("listRoomInfoPage", {
    template: { title: "Quản lý phòng" },
    listRoom: data.data,
  });
};
