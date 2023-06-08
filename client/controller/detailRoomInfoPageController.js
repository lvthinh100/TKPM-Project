exports.renderDetailRoomInfoPage = async (req, res) => {
    // Trả về detailRoomInfoPage
    return res.render("detailRoomInfoPage", {
      template: { title: "Test" },
    });
  };
  