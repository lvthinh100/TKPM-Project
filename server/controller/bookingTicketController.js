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

  const data = await bookingTicketModel.getInfoByTicket(id, query['room']);
  const user = await bookingTicketModel.getInfoByUser(id, query['room']);

  data.push({'users':user})

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

  const status = await bookingTicketModel.findIdUserTTLT(id, query.room, data.id);
  const Newdata = data
  if (status.length != 0){
    let data_f = await userModel.getOneById(data.id);
    // update 1 truong
    const attri1 = ["TENKHACHHANG", "LOAIKHACH", "SODIENTHOAI",   "CMND", "DIACHI"]; // update thoong tin KH
    const attri2 = ["name", "type", "phone", "cmnd", "address"];
    for (let i = 0; i < 5 ; i++){ 
      if (String(data[attri2[i]]) == "undefined") {
        Newdata[attri2[i]] = data_f[0][attri1[i]];
        // data_f[0][attri1[i]] = data[attri2[i]];
      }
    }
    newuser = await userModel.updateOne(Newdata);
    dataNewLL = status
    dataNewLL.push({'users':newuser})

  }
  else{ // Tao moi KH 
    newuser = await userModel.createOne(data)
    dataNewLL = await bookingTicketModel.createStatusLL(id, query.room, data.id)
    dataNewLL.push({'users':newuser})
  }
  // console.log(status.length)
  res.status(200).json({
    status: "success",
    dataa: dataNewLL
  });

});