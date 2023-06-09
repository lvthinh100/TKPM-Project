const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const KhachHangModel = require("../model/KhachHangModel");
const TaiKhoangModel = require("../model/TaiKhoangModel");


exports.getCustomer = catchAsync(async (req, res) => {
  const data = await KhachHangModel.createOne();
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
  //Xử lý dữ liệu
  if (data.phone.length < 10) return next(new AppError(400, "Phone not valid"));
  //Up lên database
  const newData = await KhachHangModel.insertOne(data);

  console.log(newData);

  //Trả kết quả về thông qua res
  res.json({
    message: "success",
    data: newData,
  });
});

exports.getUserById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const query = req.query;
  console.log(query);
  const data = await KhachHangModel.getOneById(id);
  // next (new AppError)
  res.json({
    message: "success",
    data,
  });
});

exports.deleteById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const query = req.query;
  console.log(query);

  const data_TK = await TaiKhoangModel.deleteOne(id);
  const data_KH = await KhachHangModel.deleteOne(id);

  res.json({
    message: "success",
    data_TK,
    data_KH
  });
});


exports.updateCustomerById = catchAsync(async (req, res) => {
//----------
 //Lấy dữ liệu được upload
  const data = req.body;

  let data_f = await KhachHangModel.getOneById(data.MAKHACHHANG);
  // console.log(newData);

  const attri = [ 'TENKHACHHANG', 'LOAIKHACH', 'SODIENTHOAI', 'CMND', 'DIACHI' ];
  for (let i of attri) {
    if (String(data[i]) != 'undefined'){
      data_f[0][i] = data[i]
    }
  }

  const newdData = await KhachHangModel.updateOne(data_f[0]);

  res.status(200).json({
    status: 'success',
    data: data_f,
  });
});
