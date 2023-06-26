const catchAsync = require("../utils/catchAsync");
// const AppError = require("../utils/AppError");

const bookingTicketModel = require("../model/bookingTicketModel");
const userModel = require("../model/userModel");

exports.getAllTicket = catchAsync(async (req, res) => {
  const data = await bookingTicketModel.getAllTicketsInfo();

  //Xử lý data => Controller
  console.log(data);

  //Gửi data lại thông qua res
  res.json({
    status: 200,
    message: "success",
    data: data,
  });
});

exports.getStatusByIdRoom = catchAsync(async (req, res) => {
  //----------
  const { id } = req.params;
  const query = req.query// lay room(MAPHONG)
  //Lấy dữ liệu được upload  

  const data = await bookingTicketModel.getInfoByTicket(id, query['MAPHONG']);

  const user = await bookingTicketModel.getInfoByUser(id, query['MAPHONG']);

  data.push({'user':user})
  //Xử lý data => Controller

  console.log(user);

  //Gửi data lại thông qua res
  res.json({
    status: 200,
    message: "success",
    data: data
  });
  
});

exports.updateStatusById = catchAsync(async (req, res) => {
  //----------
  const { id } = req.params;
  const data = req.body;
  const newData = await bookingTicketModel.updateStatusOne(id, data);

  console.log(data);

  res.status(200).json({
    status: "success",
    data: newData,
  });

});

exports.updateInforCheckInByIdRoom = catchAsync(async (req, res) => {
  //----------
  const { id } = req.params;
  const query = req.query// lay room(MAPHONG)
  const data = req.body;
  // const newData = await bookingTicketModel.updateInforCheckIn(id, query, data);

  const newData = await bookingTicketModel.checkExitsUser(id);
  // if (newData.length() != 0)
      // return (newData);
  console.log(newData.length);

  res.status(200).json({
    status: "success",
    // data: newData,
  });

});

exports.getAllTicket = catchAsync(async (req, res) => {
  const data = await bookingTicketModel.getAllTicket();

  res.json({
    status: 200,
    message: 'success',
    data: data
  })
})

exports.getTicketsByUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const query = req.query;

  const data = await bookingTicketModel.getTicketsByUser(id);

  res.json({
    status: 200,
    message: 'success',
    data: data
  })
})

exports.getDetailTicket = catchAsync(async (req, res) => {
  const { id } = req.params;
  const query = req.query;

  const data = await bookingTicketModel.getDetailTicket(id);

  res.json({
    status: 200,
    message: 'success',
    data: data
  })
})