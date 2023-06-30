const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const accomodationModel = require("../model/accomodationModel");

exports.getAllAccomodationsInfo = catchAsync(async (req, res) => {
  const data = await accomodationModel.getAllAccomodationInfo();

  //Xử lý data => Controller
  console.log(data);

  //Gửi data lại thông qua res
  res.json({
    status: 200,
    message: "success",
    data: data,
  });
});