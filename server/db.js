const initOptions = {
  schema: "qlks",
};
const pgp = require("pg-promise")(initOptions);
const connect = require("./configs/connectStr");

module.exports = pgp(connect);
