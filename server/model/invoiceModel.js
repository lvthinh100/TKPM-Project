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

exports.createOneInvoice = async (data, cre_data) => {
  try {
    // const query1 = ` INSERT INTO "HOADONTHANHTOAN"("MAHOADON", "MAKHTHANHTOAN", "NGAYTHANHTOAN", "TONGTIEN")
    //   VALUES ($1, $2, $3, $4) 
    //   returning *; `;
    // const newdata1 = await db.any(query1, [
    //   cre_data.ticketId,
    //   data.userid,
    //   data.createdAt,
    //   0
    // ]);

    const query2 = ` select ("NGAYCHECKOUT" - "NGAYCHECKIN") as day, "SLKHACH"
                    from "PHIEUDATPHONG"
                    where "MADATPHONG" = $1`;
    let newdata2 = await db.any(query2, [data.ticketId]);
    let SONGAY = newdata2[0]['day']['days'] + 1

    const query3 = ` select distinct a."MAPHONG", c."DONGIA"
                    from "CT_PHIEUDATPHONG" a, "PHONG" b, "LOAIPHONG" c
                    where "MADATPHONG" = $1 and a."MAPHONG" = b."MAPHONG" and b."LOAIPHONG" = c."MALOAI"`;
    const newdata3 = await db.any(query3, [data.ticketId]);
    const_pt = 0
    if (newdata2[0]['SLKHACH'] > 2) 
      const_pt = 0.25
  
    // const query4 = ` INSERT INTO "CT_HOADON"("MAHOADON", "MADATPHONG", "MAPHONG", "SONGAY", "DONGIA", "PHUTHU", "THANHTIEN")
    //   VALUES ($1, $2, $3, $4, $5, $6, $7) 
    //   returning *; `;
   
    // for (const i of newdata3){
    //   const newdata4 = await db.any(query4, [
    //     cre_data.ticketId,
    //     data.ticketId,
    //     i['MAPHONG'],
    //     SONGAY,
    //     i['DONGIA'],
    //     const_pt,
    //     i['DONGIA']+const_pt*i['DONGIA']
    //   ]);
    // }

    // const query2 = ` INSERT INTO "CT_PHIEUDATPHONG"("MADATPHONG", "MAPHONG")
    //   VALUES ($1, $2) 
    //    `;
    // for (const room of data.room){
    //   const newdata2 = await db.any(query2, [
    //     data.ticketId,
    //     room
    //   ]);
    // }
    // console.log(newdata[0]['day']['days'])
    // return newdata2
    for (const i of newdata3){
      // console.log(const_pt*i['DONGIA'])
      // console.log(Interger(i['DONGIA']))
      // console.log(const_pt)
      // console.log(formatter.format(i['DONGIA']));
    }
  
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
