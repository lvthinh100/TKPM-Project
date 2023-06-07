exports.renderRegisterPage = async (req, res) => {
  // Trả về home.hbs
  return res.render("register");
};

exports.renderLoginPage = async (req, res) => {
  return res.render("login");
};
