exports.renderDetailRoomInfoPage = async (req, res) => {
    // Trả về detailRoomInfoPage
    res.render("detailRoomInfoPage", {
      template: { title: "Test" },
      
      itemRoom: {
        MAPHONG: "520",
        LOAIPHONG: "PHONG DOI",
        TANG: "5",
        SOGIUONG: "2",
        SOKHACHTOIDA: "4",
        TINHTRANG: "Còn trống",
        MOTA: "Phòng đôi",
        GHICHU: "Không hút thuốc lá",
      },
    });
  };
  