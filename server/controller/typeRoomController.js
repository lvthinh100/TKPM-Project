const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const typeRoomModel = require("../model/typeRoomModel");

exports.getAllTypeRoom = catchAsync(async (req, res) => {
    const data = await typeRoomModel.getAllTypeRoom();

    //Xử lý data => Controller
    console.log(data);

    //Gửi data lại thông qua res
    res.json({
        status: 200,
        message: "success",
        data: data,
    });
});

exports.getTypeRoomInfoById = catchAsync(async (req, res) => {
    const { id } = req.params;

    const query = req.query;
    console.log(query);

    const data = await typeRoomModel.getTypeRoomById(id);

    res.json({
        status: 200,
        message: "success",
        data: data,
    });
});
