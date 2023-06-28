const api = require("../api/index");

exports.renderDetailInvoicePage = async (req, res) => {
  console.log(req.query.id);

  var { data } = await api.getInvoiceById(req.query.id);
  dataInvoice = data.data[0];
  console.log(dataInvoice);

  var { data } = await api.getDetailInvoiceById(req.query.id);
  dataDetailInvoice = data.data;
  console.log(dataDetailInvoice);

  // Trả về detailInvoicePage
  res.render("detailInvoicePage", {
    template: { title: "Chi tiết hóa đơn" },
    dataInvoice: dataInvoice,
    dataDetailInvoice: dataDetailInvoice,
  });
};
