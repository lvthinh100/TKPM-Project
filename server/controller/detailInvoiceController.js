const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const detailInvoiceModel = require("../model/detailInvoiceModel");

exports.getDetailInvoiceById = catchAsync(async (req, res) => {
    const { id } = req.params;

    const query = req.query;
    console.log(query);
    console.log(id);

    const data = await detailInvoiceModel.getDetailInvoiceInfoById(id);

    res.json({
        status: 200,
        message: "success",
        data: data,
    });
});
