const axios = require("axios");

exports.renderUserInfoPage = async (req, res) => {
  //Lấy thông tin User thông qua api
  const resAPI = await axios.get("http://127.0.0.1:3000/api/user");
  //Xử lý data
  console.log(resAPI.data.data);
  //Trả về giao diện
  res.render("userInfo", {
    users: resAPI.data.data, //Mảng các đối tượng
    error: false,
    title: "This is user info page",
  });
};

exports.renderGetUserById = async (req, res) => {
  //Trả về giao diện
  res.render("getUserInfo", {
    user: {},
    error: false,
  });
};

exports.apiGetUserById = async (req, res) => {
  const id = req.body.idKh;
  let error = false;
  //Xu ly du lieu
  const { data } = await axios.get(`http://127.0.0.1:3000/api/user/${id}`);
  //Render UI
  if (data.data.length == 0) error = true;
  //Trả về giao diện
  res.render("getUserInfo", {
    user: data.data[0],
    error,
  });
};
