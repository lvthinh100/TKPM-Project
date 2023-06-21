const db = require("../db");

//get detail invoice information by id
exports.getDetailInvoiceInfoById = async (id) => {
    try {
        //Lấy data từ db => Model
        const query = 'SELECT * FROM "CT_HOADON" WHERE "MAHOADON" = $1;'

        //Bất đồng bộ
        const data = await db.any(query, [id]);
        console.log(data);

        return data;

    } catch (err) {
        throw err;
    }
};