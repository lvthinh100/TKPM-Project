const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const TaiKhoangModel = require("../model/TaiKhoangModel");

exports.getAccount = catchAsync(async (req, res) => {
    const data = await TaiKhoangModel.createOne();
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
    const data = await TaiKhoangModel.getOne(id);
    // next (new AppError)
    res.json({
      message: "success",
      data,
    });
  });

  exports.deleteById = catchAsync(async (req, res) => { ////
    const { id } = req.params;
  
    const query = req.query;
    console.log(query);
  
    const data1 = await TaiKhoangModel.deleteOne(id);
    // const data2 = await KhachHangModel.deleteOne(id);
  
    res.json({
      message: "success",
      data1,
    //   data2
    });
  });