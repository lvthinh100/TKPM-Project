const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const reportModel = require("../model/reportModel");
// const userModel = require("../model/userModel");

exports.getRevenue = catchAsync(async (req, res, next) => {

  const data = req.query;
  if (data.year == undefined || data.month == undefined)
    return next(new AppError(401, "Missing data field"));

  const dataset = await reportModel.getRevenueByTime(data);

  //Gửi data lại thông qua res
  res.json({
    status: 200,
    message: "success",
    data: dataset,
  });
});

exports.getEfficiency = catchAsync(async (req, res, next) => {

  const data = req.query;
  if (data.year == undefined || data.month == undefined)
    return next(new AppError(401, "Missing data field"));
    
  const dataset = await reportModel.getEfficiencyByTime(data);
  
  //Gửi data lại thông qua res
  res.json({
    status: 200,
    message: "success",
    data: data,
  });
});

exports.getAll = catchAsync(async (req, res) => {

  const data = await reportModel.getAll();

  //Gửi data lại thông qua res
  res.json({
    status: 200,
    message: "success",
    data: data,
  });
});