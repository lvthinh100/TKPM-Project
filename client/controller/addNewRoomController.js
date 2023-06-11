exports.renderAddNewRoomPage = async (req, res) => {
    // Trả về detailRoomInfoPage
    res.render("addNewRoomPage", {
      template: { title: "Thêm phòng mới" },
    });
  };
  