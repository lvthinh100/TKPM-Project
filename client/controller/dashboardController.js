exports.renderDashboardPage = async (req, res) => {
  // Trả về home.hbs
  return res.render("dashboard", {
    template: { title: "Test" },
    user: {
      MAKHACHHANG: "KH12SDA3",
      TENKHACHHANG: "Random user",
      LOAIKHACH: "Quocte",
      SODIENTHOAI: "0796792539",
      CMND: "054202000061",
      DIACHI: "Khu B",
    },
  });
};
