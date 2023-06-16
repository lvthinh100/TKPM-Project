const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const invoiceModel = require("../model/invoiceModel");

exports.getAllInvoice = catchAsync(async (req, res) => {
    const data = await invoiceModel.getAllInvoiceInfo();

    //Xử lý data => Controller
    console.log(data);

    //Gửi data lại thông qua res
    res.json({
        status: 200,
        message: "success",
        data: data,
    });
});


exports.getInvoiceById = catchAsync(async (req, res) => {
    const { id } = req.params;

    const query = req.query;
    console.log(query);
    console.log(id);
    const data = await invoiceModel.getInvoiceInfoById(id);

    res.json({
        status: 200,
        message: "success",
        data: data,
    });
});

/*
exports.getMaxIDRoom = catchAsync(async (req, res) => {
  const { floor } = req.params;

  const query = req.query;
  console.log(query);

  const searchFloor = floor + '%';
  console.log(searchFloor);

  const data = await roomModel.getMaxIDRoomByFloor(searchFloor);

  res.json({
    status: 200,
    message: "success",
    data: data,
  });
});

exports.createRoom = catchAsync(async (req, res, next) => {
  const data = req.body;

  // Xử lý dữ liệu nếu cần

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

  const data = await roomModel.deleteRoom(id);

  res.json({
    status: 200,
    message: "success",
    data: data,
  });
});
*/