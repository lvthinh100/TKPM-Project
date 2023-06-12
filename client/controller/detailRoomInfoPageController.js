const api = require("../api/index");

exports.renderDetailRoomInfoPage = async (req, res) => {
  console.log(req.query.id);

  const { data } = await api.getRoomById(req.query.id);

  // Trả về detailRoomInfoPage
  res.render("detailRoomInfoPage", {
    template: { title: "Test" },

    itemRoom: data.data[0],
  });
};
