const db = require("../db");

exports.getAllInvoiceInfo = async () => {
  try {
    //Lấy data từ db => Model
    const query =
      'SELECT * FROM "HOADONTHANHTOAN" as hd JOIN "KHACHHANG" as kh on hd."MAKHTHANHTOAN"=kh."MAKHACHHANG" ORDER BY "NGAYTHANHTOAN" DESC;';

    //Bất đồng bộ
    const data = await db.any(query);

    return data;
  } catch (err) {
    throw err;
  }
};

//get invoice information by id
exports.getInvoiceInfoById = async (id) => {
  try {
    //Lấy data từ db => Model
    const query =
      'SELECT * FROM "HOADONTHANHTOAN" as hd JOIN "KHACHHANG" as kh on hd."MAKHTHANHTOAN"=kh."MAKHACHHANG" where hd."MAHOADON" = $1;';

    //Bất đồng bộ
    const data = await db.any(query, [id]);
    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};

exports.createOneInvoice = async (data, cre_data) => {
  try {
    DataReturn = {"userid": data.userid, "ticketId": data.ticketId, "invoiceId": cre_data.ticketId};
    //Tao du lieu bang HOADONTHANHTOAN
    const query1 = ` INSERT INTO "HOADONTHANHTOAN"("MAHOADON", "MAKHTHANHTOAN", "NGAYTHANHTOAN", "TONGTIEN") VALUES ($1, $2, $3, $4) returning *; `;
    await db.any(query1, [cre_data.ticketId, data.userid, cre_data.createdAt, 0]);

    // Lay thong tin tu bang PHIEUDATPHONG
    const query2 = ` select ("NGAYCHECKOUT" - "NGAYCHECKIN") as day from "PHIEUDATPHONG" where "MADATPHONG" = $1`;
    let newdata2 = await db.any(query2, [data.ticketId]);
    let SONGAY = newdata2[0]["day"]["days"] + 1;

    //  Lay thong tin tien
    const query3 = ` select distinct a."MAPHONG", c."DONGIA"
                    from "CT_PHIEUDATPHONG" a, "PHONG" b, "LOAIPHONG" c
                    where "MADATPHONG" = $1 and a."MAPHONG" = b."MAPHONG" and b."LOAIPHONG" = c."MALOAI"`;
    const newdata3 = await db.any(query3, [data.ticketId]);

    // Tao bang CT_HOADON cho từng room
    const query4 = ` INSERT INTO "CT_HOADON"("MAHOADON", "MADATPHONG", "MAPHONG", "SONGAY", "DONGIA", "PHUTHU", "THANHTIEN") VALUES ($1, $2, $3, $4, $5, $6, $7) returning *; `;
    tongtien = 0;
    detail = [];
    for (const i of newdata3) {
        const_pt = 0;
        donGia = parseFloat(i["DONGIA"].replace("$", "").replace(",", ""));
        // Xem loại khach
        let query_inf = ` select distinct b."LOAIKHACH" from "CT_LUUTRU" a, "KHACHHANG" b where a."MADATPHONG" = $1 and a."MAKHACHHANG" = b."MAKHACHHANG" and a."MAPHONG" = $2 `;
        let data_inf = await db.any(query_inf, [data.ticketId, i["MAPHONG"]]);

        if (data_inf[0] == undefined) // Chưa cập nhật thông tin luu tru -> ko lặp hóa đơn
          continue;
        // TH có khách nước ngoài
        if (data_inf[0]["LOAIKHACH"] == 'NUOCNGOAI' ||(data_inf.length > 1 && data_inf[1]["LOAIKHACH"] == 'NUOCNGOAI')) 
          donGia = donGia*1.5

        // Xem so lương khach
        let query_sl = ` select distinct "SLKHACH" from "CT_PHIEUDATPHONG" where "MADATPHONG" = $1 and "MAPHONG" = $2 `;
        let data_sl = await db.any(query_sl, [data.ticketId, i["MAPHONG"]]);

        // console.log(data_sl) 
        if (data_sl[0]["SLKHACH"] > 2) const_pt = 0.25;

        let newdata4 = await db.any(query4, [cre_data.ticketId, data.ticketId, i["MAPHONG"], SONGAY, donGia, const_pt * donGia, donGia + const_pt * donGia]);
        detail.push(newdata4[0]);
        tongtien = tongtien + donGia + const_pt * donGia;
    }
    // update lai bang HOADONTHANHTOAN
    const query5 = `UPDATE "HOADONTHANHTOAN" SET "TONGTIEN" = $1 WHERE "MAHOADON" = $2 returning *;`;
    await db.any(query5, [tongtien, cre_data.ticketId]);
    
    DataReturn["amount"] = tongtien;
    DataReturn["detail"] = detail;
    return DataReturn;
  } catch (err) {
    throw err;
  }
};
