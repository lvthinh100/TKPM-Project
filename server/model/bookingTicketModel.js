const db = require("../db");

exports.getAllTicketsInfo = async () => {
  try {
    // // Lấy data từ db => Model
    // const query = ` Select DISTINCT a."MADATPHONG" as ticketId, a."MAKHACHHANG" as userId, c."TENKHACHHANG" as userName, 
    //                 a."NGAYDATPHONG" as createdAt, a."NGAYCHECKIN" as checkIn, a."NGAYCHECKOUT" as checkOut, b."MAPHONG" as room,
    //                  a."SLKHACH" as numUser, a."TRANGTHAI" as status
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
    const query1 = ` Select DISTINCT a."MAPHONG" as roomId, a."MADATPHONG" as ticketId, b."NGAYCHECKIN" as checkIn, b."NGAYCHECKOUT" as checkOut
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
    const query2 = ` Select DISTINCT b."TENKHACHHANG" as name, b."CMND" as cmnd, b."SODIENTHOAI" as phone, b."DIACHI" as address, b."MAKHACHHANG" as userId 
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
    const newdata = await db.any(query, [data.status, id]);

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

exports.findIdUserTTLT = async (id, room, iduser) => {
  try {
    const query = ` Select "MAPHONG" as roomId, "MADATPHONG" as ticketId
                    from "CT_LUUTRU"
                    where  "MADATPHONG" = $1 and "MAPHONG" = $2 and "MAKHACHHANG" = $3`;
    const newdata = await db.any(query, [id, room, iduser]);
    
    return (newdata);
  } catch (err) {
    throw err;
  }
}

exports.createStatusLL = async (id, room, data) => {
  try {
    const query = ` INSERT INTO "CT_LUUTRU"(
                      "MADATPHONG", "MAPHONG", "MAKHACHHANG")
                      VALUES ($1, $2, $3) returning "MAPHONG" as roomId, "MADATPHONG" as ticketId; `;
    const newdata = await db.any(query, [id, room, data]);

    return (newdata);
  } catch (err) {
    throw err;
  }
}