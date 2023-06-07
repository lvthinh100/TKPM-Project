const db = require("../db");

const table = "TAIKHOANKHACHHANG";
const adminTable = "TAIKHOANADMIN";

exports.checkUsername = async (username) => {
  try {
    const dbUser = await db.oneOrNone(
      ` Select * from "${table}"
        join "KHACHHANG" 
        on "TAIKHOANKHACHHANG"."MAKHACHHANG" = "KHACHHANG"."MAKHACHHANG"  
        where "USERNAME" = $1 `,
      [username]
    );
    if (dbUser) {
      const {
        MATAIKHOAN: id,
        USERNAME: username,
        PASSWORD: password,
        MAKHACHHANG: userId,
        TENKHACHHANG: name,
      } = dbUser;
      return { id, username, password, userId, name };
    } else return null;
  } catch (err) {
    throw err;
  }
};

//
exports.createOne = async (data) => {
  try {
    const dbAccount = await db.oneOrNone(
      ` INSERT INTO "${table}"(
                "MATAIKHOAN", "USERNAME", "PASSWORD", "NGAYLAP", "MAKHACHHANG")
                VALUES ($1, $2, $3, $4, $5) returning *; `,
      [data.id, data.username, data.password, data.createdAt, data.userId]
    );
    return dbAccount;
  } catch (err) {
    throw err;
  }
};

exports.checkAdminUsername = async (username) => {
  try {
    const dbUser = await db.oneOrNone(
      ` Select * from "${adminTable}"
          where "USERNAME" = $1 `,
      [username]
    );
    if (dbUser) {
      const { MATAIKHOAN: id, USERNAME: username, PASSWORD: password } = dbUser;
      return { id, username, password };
    } else return null;
  } catch (err) {
    throw err;
  }
};

exports.createAdmin = async (data) => {
  try {
    const dbAccount = await db.oneOrNone(
      ` INSERT INTO "${adminTable}"(
                      "MATAIKHOAN", "USERNAME", "PASSWORD", "NGAYLAP")
                      VALUES ($1, $2, $3, $4) returning *; `,
      [data.id, data.username, data.password, data.date]
    );
    return dbAccount;
  } catch (err) {
    throw err;
  }
};
