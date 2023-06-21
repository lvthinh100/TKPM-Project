const express = require("express");
const exphbs = require("express-handlebars");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
//Route
// const viewRoutes = require("./router/viewRoutes");
const homeRoutes = require("./router/homeRoutes");
const dashboardRoutes = require("./router/dashboardRoutes");
const userInfoRoutes = require("./router/userInfoRoutes");
const getUserInfoByIdRoutes = require("./router/getUserInfoByIdRoutes");

const authRoutes = require("./router/authRoutes");
const userRoutes = require("./router/userRoutes");
const adminRoutes = require("./router/adminRoutes");

const detailRoomInfoRoutes = require("./router/detailRoomInfoPageRoutes");
const listRoomInfoRoutes = require("./router/listRoomInfoRoutes");
const addNewRoomRoutes = require("./router/addNewRoomRoutes");

const listInvoiceRoutes = require("./router/listInvoiceRoutes");
const detailInvoiceRoutes = require("./router/detailInvoiceRoutes");


const app = express();

//public
app.use("/public", express.static(path.join(__dirname, "public")));

//body parser
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// cookie
app.use(cookieParser());

// Env
dotenv.config({ path: "./config.env" });

//Handlebar view engine
app.engine(
  "hbs",
  exphbs.engine({
    extname: "hbs",
    layoutsDir: "views/layouts",
    defaultLayout: "index",
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

// Server-side rendering, dynamic
app.use("/home", homeRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/userInfo", userInfoRoutes);
app.use("/getUserInfo", getUserInfoByIdRoutes);

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

app.use("/listRoomInfo", listRoomInfoRoutes)
app.use("/detailRoomInfo", detailRoomInfoRoutes);
app.use("/addNewRoom", addNewRoomRoutes);

app.use("/listInvoice", listInvoiceRoutes);
app.use("/detailInvoice", detailInvoiceRoutes);


app.all("*", (req, res, next) => {
  res.json({
    status: 404,
    message: "Page Not Found",
  });
});

app.use("/", (err, req, res, next) => {
  res.status(500).json({
    data: "error",
  });
  console.log(err);
});

// app.use("/api/transactions", transactionRoutes);

const port = 20585;
const hostname = "127.0.0.1";

const server = app.listen(port, hostname, () => {
  console.log(`Starting the server at http://${hostname}:${port}`);
});
