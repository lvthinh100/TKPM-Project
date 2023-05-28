const dotenv = require("dotenv");
const pgp = require("pg-promise");

// Exception handler
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exception: server is shutting down");
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

//Create server with app
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log("Starting the server at 127.0.0.1:3000");
});

//Exception handler
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled Rejection: server is shutting down");
  server.close(() => {
    process.exit(1);
  });
});
