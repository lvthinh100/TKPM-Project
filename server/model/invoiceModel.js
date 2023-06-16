const db = require("../db");

exports.getAllInvoiceInfo = async () => {
  try {
    //Lấy data từ db => Model
    const query = 'SELECT * FROM "HOADONTHANHTOAN" as hd JOIN "KHACHHANG" as kh on hd."MAKHTHANHTOAN"=kh."MAKHACHHANG" ORDER BY "NGAYTHANHTOAN" DESC;';

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
    const query = 'SELECT * FROM "HOADONTHANHTOAN" as hd JOIN "KHACHHANG" as kh on hd."MAKHTHANHTOAN"=kh."MAKHACHHANG" where hd."MAHOADON" = $1;'
    
    //Bất đồng bộ
    const data = await db.any(query, [id]);
    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};

/*
//create new room
exports.createNewRoom = async (data) => {
  try {
    //Lấy data từ db => Model
    const query = ` 
        Insert into "PHONG"("MAPHONG", "LOAIPHONG", "TANG", "SOGIUONG", "SOKHACHTOIDA", "DIENTICH", "TINHTRANG", "MOTA", "GHICHU")
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *; `;

    //Bất đồng bộ
    const newData = await db.one(query, [
      data.maphong,
      data.loaiphong,
      data.tang,
      data.sogiuong,
      data.sokhachtoida,
      data.dientich,
      data.tinhtrang,
      data.mota,
      data.ghichu,
    ]);

    return newData;
  } catch (err) {
    throw err;
  }
};

//delete room
exports.deleteRoom = async (id) => {
  try {
    //Lấy data từ db => Model
    const query = ' Delete from "PHONG" where "MAPHONG" = $1 ';

    //Bất đồng bộ
    const data = await db.any(query, [id]);

    return data;
  } catch (err) {
    throw err;
  }
};

//update room information
exports.updateRoomInfo = async (dataUpdated) => {
  try {
    //Lấy data từ db => Model
    const query = ` 
        Update "PHONG" 
        set "LOAIPHONG" = $2,
            "TANG" = $3,
            "SOGIUONG" = $4,
            "SOKHACHTOIDA" = $5,
            "DIENTICH" = $6,
            "TINHTRANG" = $7,
            "MOTA" = $8,
            "GHICHU" = $9
        where "MAPHONG" = $1 `;

    //Bất đồng bộ
    const newData = await db.one(query, [
      data.maphong,
      data.loaiphong,
      data.tang,
      data.sogiuong,
      data.sokhachtoida,
      data.dientich,
      data.tinhtrang,
      data.mota,
      data.ghichu,
    ]);

    return data;
  } catch (err) {
    throw err;
  }
};
*/