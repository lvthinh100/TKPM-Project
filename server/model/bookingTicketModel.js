const db = require("../db");

exports.getAllTicketsInfo = async () => {
  try {
    // Lấy data từ db => Model
    // const query = ` Select DISTINCT a."MADATPHONG" as ticketId, a."MAKHACHHANG" as userId, c."TENKHACHHANG" as userName, 
    //                 a."NGAYDATPHONG" as createdAt, a."NGAYCHECKIN" as checkIn, a."NGAYCHECKOUT" as checkOut, b."MAPHONG" as room,
    //                  a."SLKHACH" as numUser, a."TRANGTHAI" as status
    //                 from "PHIEUDATPHONG" a, "CT_PHIEUDATPHONG" b, "KHACHHANG" c 
    //                 where a."MADATPHONG" = b."MADATPHONG" and c."MAKHACHHANG" =  a."MAKHACHHANG" `;
    const query = ` Select *
                    from "PHIEUDATPHONG" ` ;
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
    const query = ` Select * from "CT_PHIEUDATPHONG"
                    where "MADATPHONG" = $1 and "MAPHONG" = $2 `;

    //Bất đồng bộ
    const data = await db.any(query, [id, room]);
    if (data.length == 0) return false;
    return true;
  } catch (err) {
    throw err;
  }
};

exports.getInfoByTicket = async (id, room) => {
  try {
    //Lấy data từ db => Model
    const query1 = ` Select DISTINCT a."MAPHONG" as roomId, a."MADATPHONG" as ticketId, 
                      b."NGAYCHECKIN" as checkIn, b."NGAYCHECKOUT" as checkOut,
                      c."SOKHACHTOIDA" as num
                    from "CT_PHIEUDATPHONG" a, "PHIEUDATPHONG" b, "PHONG" c
                    where a."MADATPHONG" = b."MADATPHONG"
                          and a."MAPHONG" = c."MAPHONG"
                          and b."MADATPHONG" = $1 and a."MAPHONG" = $2 `;
    //Bất đồng bộ
    const data = await db.any(query1, [id, room]);

    return data;
  } catch (err) {
    throw err;
  }
};

exports.getInfoByUser = async (id, room) => {
  try {
    const query2 = ` Select DISTINCT b."TENKHACHHANG" as name, b."CMND" as cmnd, b."SODIENTHOAI" as phone, b."DIACHI" as address, b."MAKHACHHANG" as userId, b."LOAIKHACH" as type
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

exports.getDetailTicketByUser = async (id) => {
  try {
    const query =
      'SELECT * FROM "PHIEUDATPHONG" as PDP JOIN "CT_PHIEUDATPHONG" as CTPDP ON PDP."MADATPHONG" = CTPDP."MADATPHONG" JOIN "PHONG" ON CTPDP."MAPHONG" = "PHONG"."MAPHONG" JOIN "LOAIPHONG" LP ON LP."MALOAI" = "PHONG"."LOAIPHONG" WHERE "MAKHACHHANG" = $1';
    const data = await db.any(query, id);
    return data;
  } catch (err) {
    throw err;
  }
};

exports.getAllDetailTicket = async () => {
  try {
    const query =
      'SELECT * FROM "PHIEUDATPHONG" as PDP JOIN "CT_PHIEUDATPHONG" as CTPDP ON PDP."MADATPHONG" = CTPDP."MADATPHONG" JOIN "PHONG" ON CTPDP."MAPHONG" = "PHONG"."MAPHONG"';
    const data = await db.any(query);
    return data;
  } catch (err) {
    throw err;
  }
};

exports.getAllTicket = async () => {
  try {
    const query = 'SELECT * FROM "PHIEUDATPHONG"';
    const data = await db.any(query);
    return data;
  } catch (err) {
    throw err;
  }
};

exports.getTicketsByUser = async (id) => {
  try {
    const query = 'SELECT * FROM "PHIEUDATPHONG" WHERE "MAKHACHHANG" = $1';
    const data = await db.any(query, id);
    return data;
  } catch (err) {
    throw err;
  }
};

exports.getDetailTicket = async (id) => {
  try {
    const query =
      'SELECT * FROM "CT_PHIEUDATPHONG" as CTPDP JOIN "PHONG" ON CTPDP."MAPHONG" = "PHONG"."MAPHONG" JOIN "LOAIPHONG" LP ON LP."MALOAI" = "PHONG"."LOAIPHONG" WHERE "MADATPHONG" = $1';
    const data = await db.any(query, id);
    return data;
  } catch (err) {
    throw err;
  }
};

exports.checkRoomExits = async (id, room) => {
  try {
    const query = ` Select * from "CT_PHIEUDATPHONG" where  "MAPHONG" = $1 and "MADATPHONG" = $2 `;

    const newdata = await db.any(query, [room, id]);
    if (newdata.length > 0) return true;
    return false;
  } catch (err) {
    throw err;
  }
};

exports.searchTicket = async (data) => {
  try {
    if (data.search == undefined) search = "%%";
    else {
      search = "%" + data.search + "%";
    }

    if (data.status == undefined) statuss = "%%";
    else {
      statuss = "%" + data.status + "%";
    }
    const query = ` Select DISTINCT a."MADATPHONG" as ticketId, a."MAKHACHHANG" as userId, b."TENKHACHHANG" as userName, 
                    a."NGAYDATPHONG" as createdAt, a."NGAYCHECKIN" as checkIn, a."NGAYCHECKOUT" as checkOut, c."MAPHONG" as room,
                    a."SLKHACH" as numUser, a."TRANGTHAI" as status
                    from "PHIEUDATPHONG" a, "KHACHHANG" b, "CT_PHIEUDATPHONG" c
                    where  (a."MADATPHONG" like $1 or a."MAKHACHHANG" like $1 or b."TENKHACHHANG" LIKE $1) 
                    and a."MAKHACHHANG" = b."MAKHACHHANG" and a."TRANGTHAI" like $2 and c."MADATPHONG" = a."MADATPHONG" `;
    const newdata = await db.any(query, [search, statuss]);

    return newdata;
  } catch (err) {
    throw err;
  }
};

exports.createOneTicket = async (data) => {
  try {
    // const query = ` Select * from "PHIEUDATPHONG" where  "MADATPHONG" = $1 `;
    const query1 = ` INSERT INTO "PHIEUDATPHONG"("MADATPHONG", "MAKHACHHANG", "NGAYDATPHONG", 
    "NGAYCHECKIN", "NGAYCHECKOUT", "SLKHACH", "TRANGTHAI")
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      returning "MADATPHONG" as ticketId, "MAKHACHHANG" as userid, "NGAYDATPHONG" as createdAt, 
      "NGAYCHECKIN" as checkin, "NGAYCHECKOUT" as checkout, "SLKHACH" as numuser, "TRANGTHAI" as status; `;
    const newdata = await db.any(query1, [
      data.ticketId,
      data.userid,
      data.createdAt,
      data.checkin, 
      data.checkout,
      data.numuser,
      "SAPTOI"
    ]);

    const query2 = ` INSERT INTO "CT_PHIEUDATPHONG"("MADATPHONG", "MAPHONG")
      VALUES ($1, $2) 
       `;
    for (const room of data.room){
      const newdata2 = await db.any(query2, [
        data.ticketId,
        room
      ]);
    }
    return newdata

  } catch (err) {
    throw err;
  }
};
