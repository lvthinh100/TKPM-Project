const db = require("../db");

//get all typerooms
exports.getAllTypeRoom = async () => {
    try {
        //Lấy data từ db => Model
        const query = 'Select * from "LOAIPHONG"';

        //Bất đồng bộ
        const data = await db.any(query);

        return data;
    } catch (err) {
        throw err;
    }
};

//get typeroom information by id typeroom
exports.getTypeRoomById = async (id) => {
    try {
        //Lấy data từ db => Model
        const query = 'Select * from "LOAIPHONG" where "MALOAI" = $1';

        //Bất đồng bộ
        const data = await db.any(query, [id]);

        return data;
    } catch (err) {
        throw err;
    }
};