const db = require("../db");

exports.getAllAccomodationInfo = async () => {
  try {
    //Lấy data từ db => Model
    const query = `SELECT * 
                   FROM "CT_LUUTRU" as lt 
                   JOIN "PHIEUDATPHONG" as pdp ON lt."MADATPHONG" = pdp."MADATPHONG" 
                   JOIN "PHONG" as ph ON lt."MAPHONG" = ph."MAPHONG"
                   JOIN "LOAIPHONG" as lp ON ph."LOAIPHONG" = lp."MALOAI"
                   JOIN "KHACHHANG" as kh ON lt."MAKHACHHANG" = kh."MAKHACHHANG"
                   WHERE NOW() BETWEEN pdp."NGAYCHECKIN" AND pdp."NGAYCHECKOUT"
                   ORDER BY pdp."NGAYCHECKOUT" ASC, pdp."MADATPHONG" ASC`;

    //Bất đồng bộ
    const data = await db.any(query);

    return data;
  } catch (err) {
    throw err;
  }
};