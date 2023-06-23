const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
// App utils
const IdGenerator = require("../utils/UIDGenerator");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// Model
const accountModel = require("../model/accountModel");
const userModel = require("../model/userModel");

const signToken = (username) =>
  jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendUser = (account, statusCode, res) => {
  const token = signToken(account.username);
  const expiresDate = new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  );
  const cookieOptions = {
    expires: expiresDate,
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };
  // if (process.env.DOT_ENV === 'production') cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  account.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    tokenExpires: expiresDate,
    data: {
      account,
    },
  });
};

exports.register = catchAsync(async (req, res, next) => {
  const { username, name, address, password, type, phone, cmnd, confirm } =
    req.body;
  // //1. check username in db
  const account = await accountModel.checkUsername(username);
  if (account) return next(new AppError(401, "Username exists"));
  if (phone.length < 10)
    return next(new AppError(401, "Phone number not valid"));
  //if (password !== confirm)
  //return next(new AppError(401, "Incorrect confirm password"));
  //3.Generate Id and hash password
  const accountId = IdGenerator("TK");
  const hashedPass = await bcrypt.hash(password, 12);
  const newAccount = {
    id: accountId,
    username,
    password: hashedPass,
    createdAt: new Date(),
    userId,
  };
  const newUser = {
    name,
    address,
    phone,
    cmnd,
    address,
    type: type == 0 ? "NOIDIA" : "NUOCNGOAI",
  };
  const dbResponse1 = await userModel.createOne(newUser);
  const dbResponse2 = await accountModel.createOne(newAccount);
  // //4. insert to db
  // userModel.createUser(newUser);
  // res.render("auth", {
  //   status: "success",
  //   isReg: true,
  //   message: "Account created",
  //   redirect,
  // });
  createSendUser(newAccount, 200, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  // //1. check username in db
  const account = await accountModel.checkUsername(username);
  if (!username || !password) {
    return next(new AppError(400, "Invalid username or password"));
  }
  if (!account)
    return next(new AppError(401, "Incorrect username or password"));

  //3. check password
  const correct = await bcrypt.compare(password, account.password);
  if (!correct)
    return next(new AppError(401, "Incorrect username or password"));

  createSendUser(account, 200, res);
});

exports.logout = catchAsync((req, res, next) => {
  res
    .cookie("jwt", "loggedOut", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .status(200)
    .json({ status: "success" });
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  //Get token from header or cookies
  let token;
  console.log(req.cookies);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError(401, "Please log in to access this feature"));
  }

  //Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //Check user
  const account = await accountModel.checkUsername(decoded.username);
  const adminAcc = await accountModel.checkAdminUsername(decoded.username);
  if (!account && !adminAcc)
    return next(new AppError(401, "Account not exist"));
  if (account) account.password = undefined;
  if (adminAcc) adminAcc.password = undefined;
  req.account = account ? account : { ...adminAcc, isAdmin: true };
  next();
});

exports.adminLogin = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new AppError(400, "Invalid username or password"));
  }
  // //1. check username in db
  const account = await accountModel.checkAdminUsername(username);
  if (!account) next(new AppError(401, "Incorrect username or password"));

  //3. check password
  const correct = password === account.password;
  if (!correct)
    return next(new AppError(401, "Incorrect username or password"));

  createSendUser(account, 200, res);
});

exports.restrictToAdmin = catchAsync(async (req, res, next) => {
  const { username } = req.account;
  const account = await accountModel.checkAdminUsername(username);

  if (!account) {
    return next(
      new AppError(403, "You do not have admin permission to do this action")
    );
  }
  next();
});

exports.createAdminAccount = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  // //1. check username in db
  const account = await accountModel.checkAdminUsername(username);
  if (account) {
    return next(new AppError(401, "Username exists"));
  }
  //3.Generate Id and hash password
  const accountId = IdGenerator("AD");
  const dbResponse = await accountModel.createAdmin({
    username,
    password,
    id: accountId,
    date: new Date(),
  });

  res.json(dbResponse);
});
