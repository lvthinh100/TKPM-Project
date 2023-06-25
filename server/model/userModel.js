const db = require("../db");
const IdGenerator = require("../utils/UIDGenerator");

exports.getAll = async () => {
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

exports.createOne = async (data) => {
  try {
    const query = ` INSERT INTO "KHACHHANG"(
          "MAKHACHHANG", "TENKHACHHANG", "LOAIKHACH", "SODIENTHOAI", "CMND", "DIACHI")
          VALUES ($1, $2, $3, $4, $5, $6) 
          returning "TENKHACHHANG" as name, "CMND" as cmnd, "SODIENTHOAI" as phone, 
           "DIACHI" as address, "MAKHACHHANG" as userId; `;

    const userId = IdGenerator("KH");

    const newData = await db.one(query, [
      userId,
      data.name,
      data.type,
      data.phone,
      data.cmnd,
      data.address,
    ]);

    return { ...data, userId };
  } catch (err) {
    throw err;
  }
};

exports.getOneById = async (id) => {
  try {
    //Lấy data từ db => Model
    const query = ` Select *
                  from "KHACHHANG"  
                  Where "MAKHACHHANG" = $1 `;

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
    const query =
      ' DELETE FROM "KHACHHANG" WHERE "MAKHACHHANG" = ($1) returning *; ';

    //Bất đồng bộ
    const data = await db.any(query, [id]);

    return data;
  } catch (err) {
    throw err;
  }
};

exports.updateOne = async (data) => {
  try {
    //Lấy data từ db => Model
    const query = ` 
          UPDATE "KHACHHANG"
          SET "TENKHACHHANG"=($2), "LOAIKHACH"=$3, "SODIENTHOAI"=$4, "CMND"=$5 , "DIACHI"=$6
          WHERE "MAKHACHHANG"=$1  
          returning "TENKHACHHANG" as name, "CMND" as cmnd, "SODIENTHOAI" as phone, 
          "DIACHI" as address, "MAKHACHHANG" as userId; `;

    const newData = await db.one(query, [
      data.id,
      data.name,
      data.type,
      data.phone,
      data.cmnd,
      data.address,
    ]);

    return newData;
  } catch (err) {
    throw err;
  }
};
