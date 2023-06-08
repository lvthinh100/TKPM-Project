exports.renderlistRoomInfoPage = async (req, res) => {
    // Trả về home.hbs
    return res.render("listRoomInfoPage", {
      template: { title: "Quản lý phòng" },
      listRoom: [{
        MAPHONG: "520",
        LOAIPHONG: "PHONG DOI",
        TANG: "5",
        SOGIUONG: "2",
        SOKHACHTOIDA: "4",
        TINHTRANG: "Còn trống",
        MOTA: "Phòng đôi",
        GHICHU: "Không hút thuốc lá",
      },
      {
        MAPHONG: "220",
        LOAIPHONG: "PHONG DON",
        TANG: "2",
        SOGIUONG: "1",
        SOKHACHTOIDA: "2",
        TINHTRANG: "Còn trống",
        MOTA: "Phòng đôi",
        GHICHU: "Không hút thuốc lá",
      },]
    });
  };
  