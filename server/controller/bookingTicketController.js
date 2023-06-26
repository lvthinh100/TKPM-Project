const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

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

exports.getStatusByIdRoom = catchAsync(async (req, res, next) => {
  //----------
  const { id } = req.params;
  const query = req.query; // lay room(MAPHONG)
  //Lấy dữ liệu được upload
  // const data = await bookingTicketModel.getInfoByTicket(id, query['room']);

  checkRoom = await bookingTicketModel.checkRoomExits(id, query["room"]);
  if (checkRoom == false)
    return next(new AppError(401, "Ticket room not exist"));

  // checkBookingTicket = await bookingTicketModel.checkBookingTicketExits(id)
  // if (checkBookingTicket == false)
  //   return next(new AppError(401, "Booking ticket not exist"));

  const data = await bookingTicketModel.getInfoByTicket(id, query.room);
  const users = await bookingTicketModel.getInfoByUser(id, query.room);

  //Gửi data lại thông qua res
  res.json({
    status: 200,
    message: "success",
    data: { ...data[0], users },
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

exports.updateInforCheckInByIdRoom = catchAsync(async (req, res, next) => {
  //----------
  const { id } = req.params;
  const query = req.query; // lay room(MAPHONG)
  const data = req.body;
  checkStatusLL = await bookingTicketModel.checkStatusLL(id, query.room);
  if (checkStatusLL.length == 0)
    return next(new AppError(401, "Accommodation information not exist"));

  arr_user = [];
  for (let index = 0; index < data.length; index++) {
    let status = await bookingTicketModel.findIdUserTTLT(
      id,
      query.room,
      data[index].id
    );
    let checkExitsUser = await userModel.getOneById(data[index].id);

    if (status.length == 0 && checkExitsUser.length == 0) {
      // Phiêu ko có user và user chưa tồn tại.
      newuser = await userModel.createOne(data[index]);
      dataNewLL = await bookingTicketModel.createStatusLL(
        id,
        query.room,
        newuser.userId
      );
    } else {
      // khi này user luon tôn tại
      Newdata = await bookingTicketModel.changeAttribute(
        checkExitsUser[0],
        data[index]
      ); // update truong
      newuser = await userModel.updateOne(Newdata);
      dataNewLL = status;
      if (status.length == 0)
        // chưa có phieu
        dataNewLL = await bookingTicketModel.createStatusLL(
          id,
          query.room,
          data[index].id
        );
    }
    arr_user.push(newuser);
  }
  dataNewLL.push({ users: arr_user });

  res.status(200).json({
    status: "success",
    data: { ...dataNewLL[0], users: arr_user },
  });
});

exports.searchBookingTicket = catchAsync(async (req, res, next) => {
  //----------
  const searchQuery = req.query;
  data = await bookingTicketModel.searchTicket(searchQuery);

  if (data.length == 0) return next(new AppError(404, "Not found"));

  res.status(200).json({
    status: "success",
    data: data,
  });
});

// exports.getAllTicket = catchAsync(async (req, res) => {
//   const data = await bookingTicketModel.getAllTicket();

//   res.json({
//     status: 200,
//     message: 'success',
//     data: data
//   })
// })

exports.getTicketsByUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const query = req.query;

  const data = await bookingTicketModel.getTicketsByUser(id);

  res.json({
    status: 200,
    message: "success",
    data: data,
  });
});

exports.getDetailTicket = catchAsync(async (req, res) => {
  const { id } = req.params;
  const query = req.query;

  const data = await bookingTicketModel.getDetailTicket(id);

  res.json({
    status: 200,
    message: "success",
    data: data,
  });
});
