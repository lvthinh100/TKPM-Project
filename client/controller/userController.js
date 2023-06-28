exports.renderProfilePage = (req, res) => {
  console.log(req.user);
  return res.render("userProfile");
};
