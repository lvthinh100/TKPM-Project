const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const IdGenerator = require("../utils/UIDGenerator");

const userModel = require("../model/userModel");
const accountModel = require("../model/accountModel");

exports.getCustomer = catchAsync(async (req, res) => {
  const data = await userModel.createOne();
  //Xử lý data => Controller
  console.log(data);
  //Gửi data lại thông qua res
  res.json({
    status: 200,
    message: "success",
    data: data,
  });
});

exports.createCustomer = catchAsync(async (req, res, next) => {
  //Lấy dữ liệu được upload
  const data = req.body;
  const id = IdGenerator("KH");
  //Xử lý dữ liệu
  if (data.phone.length < 10) return next(new AppError(400, "Phone not valid"));
  //Up lên database
  const newData = await userModel.createOne({ ...data, id });

  //Trả kết quả về thông qua res
  res.json({
    message: "success",
    data: newData,
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { account } = req;
  if (account.userId !== id)
    return next(new AppError(403, "You do not have permission to do this"));
  // const query = req.query;
  // console.log(query);
  const [data] = await userModel.getOneById(id);
  // next (new AppError)
  res.json({
    message: "success",
    data,
  });
});

exports.deleteById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const query = req.query;
  console.log(query);

  // Chi xoa tai khoan co user
  const data_TK = await accountModel.deleteOne(id);
  const data_KH = await userModel.deleteOne(id);
  if (data_KH.length == 0) return next(new AppError(401, "User not exist"));
  res.json({
    message: "success",
    data: {
      data_TK,
      data_KH,
    },
  });
});

exports.updateCustomerById = catchAsync(async (req, res) => {
  //----------
  const { id } = req.params;
  //Lấy dữ liệu được upload
  const data = req.body;
  const Newdata = data

  // data_f la mảng 1 phần tử [{}]
  let data_f = await userModel.getOneById(id);

  // update 1 truong
  const attri1 = ["TENKHACHHANG", "LOAIKHACH", "SODIENTHOAI", "CMND", "DIACHI"]; // update thoong tin KH
  const attri2 = ["name", "type", "phone", "cmnd", "address"];
  for (let i = 0; i < 5 ; i++){ 
    if (String(data[attri2[i]]) == "undefined") {
      Newdata[attri2[i]] = data_f[0][attri1[i]];
    }
  }

  const newDataup = await userModel.updateOne(Newdata);

  res.status(200).json({
    status: "success",
    data: newDataup
  });
});

exports.getMe = (req, res, next) => {
  return res.json({
    status: "success",
    data: req.account,
  });
};
