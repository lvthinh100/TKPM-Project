const db = require("../db");

exports.getAll = async () => {
  try {
    const query = ` Select *
                    from "HOADONTHANHTOAN" a, "CT_HOADON" b 
                    where a."MAHOADON" = b."MAHOADON"
                    `;
    //Bất đồng bộ
    const data = await db.any(query);

    return data;
  } catch (err) {
    throw err;
  }
};

exports.getRevenueByTime = async (data_re) => {
  try {
    YEAR = data_re.year;
    MONTH = data_re.month;
    const query = ` Select DISTINCT d."MALOAI" as typeId, d."TENLOAI" as type, SUM(b."THANHTIEN") as amount
                      from "HOADONTHANHTOAN" a, "CT_HOADON" b, "PHONG" c, "LOAIPHONG" d
                      where a."MAHOADON" = b."MAHOADON" and b."MAPHONG" = c."MAPHONG" and d."MALOAI" = c."LOAIPHONG"
                      and EXTRACT(MONTH FROM "NGAYTHANHTOAN") = $1 and EXTRACT(YEAR FROM "NGAYTHANHTOAN") = $2
                      GROUP BY d."MALOAI", d."TENLOAI"
                      `;
    //Bất đồng bộ
    const data = await db.any(query, [MONTH, YEAR]);
    data_re["title"] = "Báo cáo doanh thu";
    data_re["dataset"] = data;
    return data_re;
  } catch (err) {
    throw err;
  }
};

exports.getEfficiencyByTime = async (data_re) => {
  try {
    YEAR = data_re.year;
    MONTH = data_re.month;
    const query = ` Select b."MAPHONG" as typeid, SUM(b."SONGAY") as amount
                      from "HOADONTHANHTOAN" a, "CT_HOADON" b
                      where a."MAHOADON" = b."MAHOADON" 
                      and EXTRACT(MONTH FROM "NGAYTHANHTOAN") = $1 and EXTRACT(YEAR FROM "NGAYTHANHTOAN") = $2
                      GROUP BY b."MAPHONG"
                      `;
    //Bất đồng bộ
    const data = await db.any(query, [MONTH, YEAR]);
    data_re["title"] = "Báo cáo hiệu suất";
    data_re["dataset"] = data;
    return data;
  } catch (err) {
    throw err;
  }
};
