const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

//const KhachHangModel = require("../model/KhachHangModel");
const roomModel = require("../model/RoomModel");

exports.getRoomInfo = catchAsync(async (req, res) => {
    const data = await roomModel.getAllRoomsInfo();
    //Xử lý data => Controller
    console.log(data);
    //Gửi data lại thông qua res
    res.json({
        status: 200,
        message: "success",
        data: data,
    });
});

/*
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
*/
