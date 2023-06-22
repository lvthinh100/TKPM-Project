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
  const query = req.query // lay room(MAPHONG)
  const data = req.body;

  const status = await bookingTicketModel.findIdUserTTLT(id, query.room, data.MAKHACHHANG);

  if (status.length != 0){
    let data_f = await userModel.getOneById(data.MAKHACHHANG);
    // update 1 truong
    const attri = ["TENKHACHHANG", "LOAIKHACH", "SODIENTHOAI", "CMND", "DIACHI"]; // update thoong tin KH
    for (let i of attri) {
      if (String(data[i]) != "undefined") {
        data_f[0][i] = data[i];
      }
    }
    newuser = await userModel.updateOne(data_f[0]);
    dataNewLL = status
    dataNewLL.push({'user':newuser})

  }
  else{ // Tao moi KH 
    newuser = await userModel.createOne(data)
    dataNewLL = await bookingTicketModel.createStatusLL(id, query.room, data.MAKHACHHANG)
    dataNewLL.push({'user':newuser})
  }

  res.status(200).json({
    status: "success",
    dataa: dataNewLL
  });

});