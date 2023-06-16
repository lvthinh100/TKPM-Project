const api = require("../api/index");

exports.renderDetailInvoicePage = async (req, res) => {
    //console.log(req.query.id);

    //const { data } = await api.getRoomById(req.query.id);

    //console.log(data.data[0])

    dataInvoice = {
        "MAHOADON": "A5PhS25",
        "MAKHTHANHTOAN": "K5YHJ2k",
        "NGAYTHANHTOAN": "24-05-2023",
        "TONGTIEN": "200.000"
    }

    dataDetailInvoice = [{
        "MADATPHONG": "Pd5NHs2",
        "MAPHONG": "203",
        "SONGAY": 5,
        "DONGIA": 200,
        "PHUTHU": 100,
        "THANHTIEN": 1100
    },
    {
        "MADATPHONG": "pHN5o05",
        "MAPHONG": "302",
        "SONGAY": 5,
        "DONGIA": 200,
        "PHUTHU": 100,
        "THANHTIEN": 1100
    },
    {
        "MADATPHONG": "du5oPS4",
        "MAPHONG": "402",
        "SONGAY": 5,
        "DONGIA": 200,
        "PHUTHU": 100,
        "THANHTIEN": 1100
    }];

    // Trả về detailInvoicePage
    res.render("detailInvoicePage", {
        template: { title: "Chi tiết hóa đơn" },
        dataInvoice: dataInvoice,
        dataDetailInvoice: dataDetailInvoice
    });
};
