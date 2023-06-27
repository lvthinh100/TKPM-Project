const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const invoiceModel = require("../model/invoiceModel");
const IdGenerator = require("../utils/UIDGenerator");
const bookingTicketModel = require("../model/bookingTicketModel");

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

exports.createInvoice = catchAsync(async (req, res) => {
  data = req.body;
  const ticketId = IdGenerator("HD");
  // cre_data =
  let cre_data = {};
  cre_data["ticketId"] = ticketId;
  cre_data["createdAt"] = new Date();

  const data_re = await invoiceModel.createOneInvoice(data, cre_data);
  await bookingTicketModel.updateStatus(data.ticketId, "DASUDUNG");

  res.json({
    status: 200,
    message: "success",
    data: data_re,
  });
});
