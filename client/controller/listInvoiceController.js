const api = require("../api");
var itemPerPage = 12;
var totalPage = 0;
var currentPage = 0;

exports.renderlistInvoicePage = async (req, res) => {
  const { data } = await api.getAllInvoice();

  console.log(data.data);

  res.render("listInvoicePage", {
    template: { title: "Quản lý hóa đơn" },
    listInvoice: data.data,
  });
};
