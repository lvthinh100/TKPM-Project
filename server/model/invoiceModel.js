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
    DataReturn = {};
    DataReturn["userid"] = data.userid;
    DataReturn["ticketId"] = data.ticketId;
    DataReturn["invoiceId"] = cre_data.ticketId;

    const query1 = ` INSERT INTO "HOADONTHANHTOAN"("MAHOADON", "MAKHTHANHTOAN", "NGAYTHANHTOAN", "TONGTIEN")
      VALUES ($1, $2, $3, $4) 
      returning *; `;
    const newdata1 = await db.any(query1, [
      cre_data.ticketId,
      data.userid,
      cre_data.createdAt,
      0,
    ]);

    const query2 = ` select ("NGAYCHECKOUT" - "NGAYCHECKIN") as day, "SLKHACH"
                    from "PHIEUDATPHONG"
                    where "MADATPHONG" = $1`;
    let newdata2 = await db.any(query2, [data.ticketId]);
    let SONGAY = newdata2[0]["day"]["days"] + 1;

    const query3 = ` select distinct a."MAPHONG", c."DONGIA"
                    from "CT_PHIEUDATPHONG" a, "PHONG" b, "LOAIPHONG" c
                    where "MADATPHONG" = $1 and a."MAPHONG" = b."MAPHONG" and b."LOAIPHONG" = c."MALOAI"`;
    const newdata3 = await db.any(query3, [data.ticketId]);
    const_pt = 0;
    if (newdata2[0]["SLKHACH"] > 2) const_pt = 0.25;

    const query4 = ` INSERT INTO "CT_HOADON"("MAHOADON", "MADATPHONG", "MAPHONG", "SONGAY", "DONGIA", "PHUTHU", "THANHTIEN")
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      returning *; `;

    tongtien = 0;
    detail = [];
    for (const i of newdata3) {
      dg = parseFloat(i["DONGIA"].replace("$", "").replace(",", ""));
      let newdata4 = await db.any(query4, [
        cre_data.ticketId,
        data.ticketId,
        i["MAPHONG"],
        SONGAY,
        dg,
        const_pt * dg,
        dg + const_pt * dg,
      ]);
      detail.push(newdata4[0]);
      tongtien = tongtien + dg + const_pt * dg;
    }
    // update
    const query5 = `UPDATE "HOADONTHANHTOAN" 
                    SET "TONGTIEN" = $1 
                    WHERE "MAHOADON" = $2 returning *;`;
    const newdata5 = await db.any(query5, [tongtien, cre_data.ticketId]);
    DataReturn["amount"] = tongtien;
    DataReturn["detail"] = detail;

    return DataReturn;
  } catch (err) {
    throw err;
  }
};
