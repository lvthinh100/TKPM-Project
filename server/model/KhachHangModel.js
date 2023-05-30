const db = require("../db");

exports.createOne = async () => {
  try {
    //Lấy data từ db => Model
    const query = ' Select * from "KHACHHANG" ';

    //Bất đồng bộ
    const data = await db.any(query);

    return data;
  } catch (err) {
    throw err;
  }
};

exports.insertOne = async (data) => {
  const query = ` INSERT INTO "KHACHHANG"(
        "MAKHACHHANG", "TENKHACHHANG", "LOAIKHACH", "SODIENTHOAI", "CMND", "DIACHI")
        VALUES ($1, $2, $3, $4, $5, $6) returning *; `;

  const newData = await db.one(query, [
    data.id,
    data.name,
    data.type,
    data.phone,
    data.cmnd,
    data.address,
  ]);

  return newData;
};

exports.getOneById = async (id) => {
  try {
    //Lấy data từ db => Model
    const query = ' Select * from "KHACHHANG" Where "MAKHACHHANG" = $1 ';

    //Bất đồng bộ
    const data = await db.any(query, [id]);

    return data;
  } catch (err) {
    throw err;
  }
};
