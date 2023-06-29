const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const roomModel = require("../model/roomModel");

exports.getAllRoom = catchAsync(async (req, res) => {
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

exports.getRoomById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const query = req.query;
  console.log(query);

  const data = await roomModel.getRoomInfoById(id);

  res.json({
    status: 200,
    message: "success",
    data: data,
  });
});

exports.getMaxIDRoom = catchAsync(async (req, res) => {
  const { floor } = req.params;
  console.log(req.params.id);

  //const query = req.query;
  //console.log(query);

  const searchFloor = req.params.id + '%';
  console.log(searchFloor);

  const data = await roomModel.getMaxIDRoomByFloor(searchFloor);
  console.log(data)

  res.json({
    status: 200,
    message: "success",
    data: data,
  });
});

exports.createRoom = catchAsync(async (req, res, next) => {
  const data = req.body;

  // Xử lý dữ liệu nếu cần
  /* 
  Code. . .
  */

  // Insert into table . . .
  const newData = await roomModel.createNewRoom(data);

  res.json({
    status: 200,
    message: "success",
    data: newData,
  });
});

exports.deleteRoomById = catchAsync(async (req, res) => {
  const { id } = req.params;

  console.log(id);
  
  const data = await roomModel.deleteRoom(id);

  res.json({
    status: 200,
    message: "success",
    data: data,
  });
});

/*
exports.updateRoomById = catchAsync(async (req, res, next) => {
  
  const data = req.body;

  // Xử lý dữ liệu nếu cần
  /* 
  Code. . .
  

  // Update dataroom
  //const resData = await roomModel.updateRoomInfo(data);

  res.json({
    status: 200,
    message: "success",
    //data: resData,
  });
});*/