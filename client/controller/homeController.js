exports.renderHomePage = async (req, res) => {
  // Trả về home.hbs
  return res.render("home", {
    template: { title: "Trang chủ" },
  });
};
