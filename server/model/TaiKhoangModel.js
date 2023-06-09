const db = require("../db");

exports.createOne = async () => {
    try {
      //Lấy data từ db => Model
      const query = ' Select * from "TAIKHOANKHACHHANG" ';
  
      //Bất đồng bộ
      const data = await db.any(query);
  
      return data;
    } catch (err) {
      throw err;
    }
  };

exports.getOne = async (id) => {
    try {
      //Lấy data từ db => Model
      const query = ' Select * from "TAIKHOANKHACHHANG" Where "MAKHACHHANG" = $1 ';
  
      //Bất đồng bộ
      const data = await db.any(query, [id]);
  
      return data;
    } catch (err) {
      throw err;
    }
};

exports.deleteOne = async (id) => {
try {
    //Lấy data từ db => Model
    const query = ' DELETE FROM "TAIKHOANKHACHHANG" WHERE "MAKHACHHANG" = ($1) returning *; ';

    //Bất đồng bộ
    const data = await db.any(query, [id]);

    return data;
} catch (err) {
    throw err;
}
};