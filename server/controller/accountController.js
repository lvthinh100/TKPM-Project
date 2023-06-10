const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const accountModel = require("../model/accountModel");

exports.getAccount = catchAsync(async (req, res) => {
  const data = await accountModel.createOneK();
  //Xử lý data => Controller
  console.log(data);
  //Gửi data lại thông qua res
  res.json({
    status: 200,
    message: "success",
    data: data,
  });
});

exports.getById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const query = req.query;
  console.log(query);
  const data = await accountModel.getOne(id);
  // next (new AppError)
  res.json({
    message: "success",
    data,
  });
});

exports.deleteById = catchAsync(async (req, res) => {
  ////
  const { id } = req.params;

  const query = req.query;
  console.log(query);

  const data1 = await accountModel.deleteOne(id);
  // const data2 = await KhachHangModel.deleteOne(id);

  res.json({
    message: "success",
    data1,
    //   data2
  });
});
