const db = require("../db");

exports.getAllTicketsInfo = async () => {
  try {
    // Lấy data từ db => Model
    const query = ` Select DISTINCT a."MADATPHONG" as ticketId, a."MAKHACHHANG" as userId, c."TENKHACHHANG" as userName, 
                    a."NGAYDATPHONG" as createdAt, a."NGAYCHECKIN" as checkIn, a."NGAYCHECKOUT" as checkOut, b."MAPHONG" as room,
                     a."SLKHACH" as numUser, a."TRANGTHAI" as status
                    from "PHIEUDATPHONG" a, "CT_PHIEUDATPHONG" b, "KHACHHANG" c 
                    where a."MADATPHONG" = b."MADATPHONG" and c."MAKHACHHANG" =  a."MAKHACHHANG" `;
    // const query = ` Select *
    //                 from "PHONG" a, "LOAIPHONG" b
    //                 where a."LOAIPHONG" = b."MALOAI"` ;
    // const query = ` Select DISTINCT *
    //                 from "PHIEUDATPHONG" a, "KHACHHANG" b
    //                 where  a."MAKHACHHANG" = b."MAKHACHHANG"  `;

    //Bất đồng bộ
    const data = await db.any(query);

    return data;
  } catch (err) {
    throw err;
  }
};

exports.checkStatusLL = async (id, room) => {
  try {
    const query = ` Select * from "CT_LUUTRU"
                    where "MADATPHONG" = $1 and "MAPHONG" = $2 `;

    //Bất đồng bộ
    const data = await db.any(query, [id, room]);

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
                    where a."MADATPHONG" = b."MADATPHONG" and a."MADATPHONG" = $1 `;
    //Bất đồng bộ
    const data = await db.any(query1, [id, room]);

    return data;
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

    return data;
  } catch (err) {
    throw err;
  }
};

exports.updateStatusOne = async (id, data) => {
  try {
    const query = `UPDATE "PHIEUDATPHONG" 
                    SET "TRANGTHAI" = $1 
                    WHERE "MADATPHONG" = $2 returning *;`;
    const newdata = await db.any(query, [data.status, id]);

    return newdata;
  } catch (err) {
    throw err;
  }
};

exports.updateStatusCheckin = async (id, data) => {
  try {
    const query = `UPDATE "PHIEUDATPHONG" 
                    SET "TRANGTHAI" = $1 
                    WHERE "MADATPHONG" = $2 returning *;`;
    const newdata = await db.any(query, [data.TRANGTHAI, id]);

    return newdata;
  } catch (err) {
    throw err;
  }
};

exports.findIdUserTTLT = async (id, room, iduser) => {
  try {
    const query = ` Select "MAPHONG" as roomId, "MADATPHONG" as ticketId
                    from "CT_LUUTRU"
                    where  "MADATPHONG" = $1 and "MAPHONG" = $2 and "MAKHACHHANG" = $3`;
    const newdata = await db.any(query, [id, room, iduser]);

    return newdata;
  } catch (err) {
    throw err;
  }
};

exports.createStatusLL = async (id, room, data) => {
  try {
    const query = ` INSERT INTO "CT_LUUTRU"(
                      "MADATPHONG", "MAPHONG", "MAKHACHHANG")
                      VALUES ($1, $2, $3) returning "MAPHONG" as roomId, "MADATPHONG" as ticketId; `;
    const newdata = await db.any(query, [id, room, data]);

    return newdata;
  } catch (err) {
    throw err;
  }
};

exports.changeAttribute = async (data1, data2) => {
  try {
    let Newdata = data2;
    const attri1 = [
      "TENKHACHHANG",
      "LOAIKHACH",
      "SODIENTHOAI",
      "CMND",
      "DIACHI",
    ]; // update thoong tin KH
    const attri2 = ["name", "type", "phone", "cmnd", "address"];
    for (let i = 0; i < 5; i++) {
      if (String(data2[attri2[i]]) == "undefined") {
        Newdata[attri2[i]] = data1[attri1[i]];
      }
    }

    return Newdata;
  } catch (err) {
    throw err;
  }
};

exports.checkRoomExits = async (id, room, iduser) => {
  try {
    const query = ` Select * from "PHONG" where  "MAPHONG" = $1 `;

    const newdata = await db.any(query, [id, room, iduser]);
    if (newdata.length > 0) return true;
    return false;
  } catch (err) {
    throw err;
  }
};
exports.checkBookingTicketExits = async (id) => {
  try {
    const query = ` Select * from "PHIEUDATPHONG" where  "MADATPHONG" = $1 `;

    const newdata = await db.any(query, [id]);
    if (newdata.length > 0) return true;
    return false;
  } catch (err) {
    throw err;
  }
};
exports.searchTicket = async (data, status) => {
  try {
    const query = ` Select DISTINCT * 
                    from "PHIEUDATPHONG" a, "KHACHHANG" b  
                    where  (a."MADATPHONG" like $1 or a."MAKHACHHANG" like $1 or b."TENKHACHHANG" LIKE $1) 
                    and a."MAKHACHHANG" = b."MAKHACHHANG" and a."TRANGTHAI" like $2 `;

    const newdata = await db.any(query, [data, status]);

    return newdata;
  } catch (err) {
    throw err;
  }
};
