const api = require("../api");
var itemPerPage = 12;
var totalPage = 0;
var currentPage = 0;

exports.renderlistInvoicePage = async (req, res) => {
    const { data } = await api.getAllInvoice();

    console.log(data.data);
    /*
    listInvoice = [{
        "MAHOADON": "A5PhS25",
        "MAKHTHANHTOAN": "K5YHJ2k",
        "NGAYTHANHTOAN": "24-05-2023",
        "TONGTIEN": "200.000"
    },
    {
        "MAHOADON": "A5PhS25",
        "MAKHTHANHTOAN": "K5YHJ2k",
        "NGAYTHANHTOAN": "24-05-2023",
        "TONGTIEN": "200.000"
    },
    ];*/
    /*
    if (req.query.page) {
        if (req.query.page != "") {
            currentPage = parseInt(req.query.page);
        }
    }

    var tempReceiptIDArr = listInvoice.slice(
        currentPage * itemPerPage,
        currentPage * itemPerPage + itemPerPage
    );
    totalPage =
        parseInt(listInvoice.length / itemPerPage) +
        (listInvoice.length % itemPerPage > 0 ? 1 : 0);
    detailArr = [];
    temp = {};

    for (i = 0; i < tempReceiptIDArr.length; i++) {
        temp["MAHOADON"] = tempReceiptIDArr[i].MAHOADON;
        temp["MAKHTHANHTOAN"] = tempReceiptIDArr[i].MAKHTHANHTOAN;
        temp["NGAYTHANHTOAN"] = tempReceiptIDArr[i].NGAYTHANHTOAN;
        detailArr.push(temp);
        temp = {};
    }

    if (detailArr.length > 0) {
        console.log(detailArr);
        res.render("listInvoicePage", {
            title: 'Lịch sử giao dịch',
            listInvoice: detailArr,
            totalPage: totalPage,
            currentPage: currentPage
        });
    }
    else {
        res.render("tradingHistoryPage", {
            title: 'Lịch sử giao dịch',
            user: user,
            transactionsList: detailArr,
            message: 'Đã xảy ra lỗi'
        });
    }*/

    res.render("listInvoicePage", {
        template: { title: "Quản lý hóa đơn" },
        listInvoice: data.data,
    });
};
