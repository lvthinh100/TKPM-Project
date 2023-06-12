//package
const path = require("path");
const express = require("express");
const morgan = require("morgan");
// const rateLimit = require('express-rate-limit');
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const favicon = require("serve-favicon");
//utils
const AppError = require("./utils/AppError");

const GlobalErrorHandler = require("./controller/errorController");

const db = require("./db");

//router
// const tourRouter = require('./routes/tourRoutes');
// const userRouter = require("./routes/userRoutes");
// const provinceRouter = require("./routes/provincesRoutes");
const KhachHangRoutes = require("./routes/userRoutes");
const RoomRoutes = require("./routes/RoomRoutes");

const app = express();

//Serving static file
app.use(express.static(path.join(__dirname, "public")));

//Dev log
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
if (process.env.NODE_ENV === "production") console.log("Working in Production");

//rate limit
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many request to this ip!! Try again in an hour',
// });
//cors
const corsOrigin = {
  origin: "http://127.0.0.1:20585", //or whatever port your frontend is using
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOrigin));

// app.use('/api', limiter);
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

//Body parser
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
//Cookie parser
app.use(cookieParser());

//data sanitization against xss
app.use(xss());

//favicon
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

//Check request time middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//DEFINE API HERE
// app.use("/api/users", userRouter);
// app.use("/api/provinces", provinceRouter);
// app.use("/api/comments", commentRouter);
// app.use("/api/vouchers", voucherRouter);
// app.use("/api/orders", orderRouter);
// app.use("/api/products", productRouter);

app.use("/api/user", KhachHangRoutes);
app.use("/api/room", RoomRoutes);

//Global error handler

app.all("*", (req, res, next) => {
  next(new AppError(404, `Can't find ${req.originalUrl} on this server`));
});

app.use(GlobalErrorHandler);

module.exports = app;
