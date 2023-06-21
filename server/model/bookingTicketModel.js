const db = require("../db");

exports.getAllTicketsInfo = async () => {
  try {
    //Lấy data từ db => Model
    // const query = ` Select a."MADATPHONG", a."MAKHACHHANG", c."TENKHACHHANG", a."NGAYDATPHONG", a."NGAYCHECKIN", a."NGAYCHECKOUT", b."MAPHONG", a."SLKHACH", a."TRANGTHAI"
    //                 from "PHIEUDATPHONG" a, "CT_PHIEUDATPHONG" b, "KHACHHANG" c 
    //                 where a."MADATPHONG" = b."MADATPHONG" and c."MAKHACHHANG" =  a."MAKHACHHANG" `;
    const query = ` Select * from "KHACHHANG" `;

    //Bất đồng bộ
    const data = await db.any(query);

    return data;
  } catch (err) {
    throw err;
  }
};

exports.getInfoByTicket = async (id, room) => {
  try {
    //Lấy data từ db => Model
    const query1 = ` Select a."MAPHONG", a."MADATPHONG", b."NGAYCHECKIN", b."NGAYCHECKOUT"
                    from "CT_LUUTRU" a, "PHIEUDATPHONG" b
                    where a."MADATPHONG" = b."MADATPHONG" and a."MADATPHONG" = $1 and a."MAPHONG" = $2 `;
    //Bất đồng bộ
    const data = await db.any(query1, [id, room]);

    return (data);
  } catch (err) {
    throw err;
  }
};

exports.getInfoByUser = async (id, room) => {
  try {
    const query2 = ` Select b."TENKHACHHANG", b."CMND", b."SODIENTHOAI", b."DIACHI", b."MAKHACHHANG"
                    from "CT_LUUTRU" a, "KHACHHANG" b
                    where a."MAKHACHHANG" = b."MAKHACHHANG" and a."MADATPHONG" = $1 and a."MAPHONG" = $2 `;
    const data = await db.any(query2, [id, room]);

    return (data);
  } catch (err) {
    throw err;
  }
}

exports.updateStatusOne = async (id, data) => {
  try {
    const query = `UPDATE "PHIEUDATPHONG" 
                    SET "TRANGTHAI" = $1 
                    WHERE "MADATPHONG" = $2 returning *;`;
    const newdata = await db.any(query, [data.TRANGTHAI, id]);

    return (newdata);
  } catch (err) {
    throw err;
  }
}

exports.updateStatusCheckin = async (id, data) => {
  try {
    const query = `UPDATE "PHIEUDATPHONG" 
                    SET "TRANGTHAI" = $1 
                    WHERE "MADATPHONG" = $2 returning *;`;
    const newdata = await db.any(query, [data.TRANGTHAI, id]);

    return (newdata);
  } catch (err) {
    throw err;
  }
}

exports.checkExitsUser = async (id) => {
  try {
    const query = ` Select * from "KHACHHANG"
                    where  "MAKHACHHANG" = $1`;
    const newdata = await db.any(query, id);
    
    return (newdata);
  } catch (err) {
    throw err;
  }
}