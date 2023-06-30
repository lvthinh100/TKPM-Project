const api = require("../api/index");

exports.renderDetailInvoicePage = async (req, res) => {
  console.log(req.query.id);

  var { data } = await api.getInvoiceById(req.query.id);
  dataInvoice = data.data[0];
  console.log(dataInvoice);

  if (data.data.length != 0)
  {
    var { data } = await api.getDetailInvoiceById(req.query.id);
  dataDetailInvoice = data.data;
  console.log(dataDetailInvoice);

  // Trả về detailInvoicePage
  res.render("detailInvoicePage", {
    template: { title: "Chi tiết hóa đơn" },
    message: "CHI TIẾT HÓA ĐƠN THANH TOÁN",
    dataInvoice: dataInvoice,
    dataDetailInvoice: dataDetailInvoice,
  });
  } else {
    res.render("detailInvoicePage", {
      template: { title: "Chi tiết hóa đơn" },
      message: "Không có thông tin hóa đơn",
    });
  }

  
};
