const api = require("../api/index");

const cookieOptions = {
  maxAge: 900000,
  httpOnly: true,
  secure: true,
};

exports.renderRegisterPage = (req, res) => {
  // Trả về home.hbs
  return res.render("register");
};

exports.renderLoginPage = (req, res) => {
  // Disable caching for the auth page
  res.set("Cache-Control", "no-cache, no-store, must-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  return res.render("login");
};

exports.handleRegister = async (req, res) => {
  try {
    const data = req.body;
    const resAPI = await api.register(data);
    console.log(resAPI);

    res.locals.user = resAPI.data.data;
    res.cookie("jwt", resAPI.data.token, cookieOptions);
    res.redirect("/user/profile");
  } catch (err) {
    const { data } = err.response;
    console.log(err.response.data);
    res.render("register", {
      error: true,
      message: data.message,
    });
  }
};

exports.handleLogin = async (req, res) => {
  try {
    const formData = req.body;
    const { data } = await api.login(formData);
    res.locals.user = data.data;
    res.cookie("jwt", data.token, cookieOptions);
    res.redirect("/user/profile");
  } catch (err) {
    const { data } = err.response;
    console.log(err.response.data);
    res.render("login", {
      error: true,
      message: data.message,
    });
  }
};

exports.handleAdminLogin = async (req, res) => {
  try {
    const { usernameAdmin: username, passwordAdmin: password } = req.body;
    const { data } = await api.loginAdmin({ username, password });
    res.locals.user = data.data;
    res.cookie("jwt", data.token, cookieOptions);
    res.redirect("/admin");
  } catch (err) {
    const { data } = err.response;
    console.log(err.response.data);
    res.render("login", {
      error: true,
      message: data.message,
    });
  }
};

exports.isLoggedIn = async (req, res, next) => {
  try {
    const { jwt } = req.cookies;
    if (!jwt) return next();
    const { data } = await api.getMe(req.headers.cookie);
    res.locals.user = data.data;
    req.user = data.data;
    console.log(data.data);
    next();
  } catch (err) {
    res.redirect("/auth/login");
  }
};

exports.protected = async (req, res, next) => {
  try {
    const { jwt } = req.cookies;
    if (!jwt) return res.redirect("/auth/login");
    const { data } = await api.getMe(req.headers.cookie);
    res.locals.user = data.data;
    req.user = data.data;
    console.log(data.data);
    next();
  } catch (err) {
    res.redirect("/auth/login");
  }
};

exports.notLoggedIn = async (req, res, next) => {
  try {
    const { jwt } = req.cookies;
    console.log(jwt);
    if (!jwt || jwt == "loggedOut") return next();
    return res.redirect("/user/profile");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.handleLogout = (req, res) => {
  try {
    res
      .cookie("jwt", "loggedOut", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .redirect("/auth/login");
  } catch (err) {
    res.redirect("/auth/login");
  }
};

exports.restrictToAdmin = async (req, res, next) => {
  const account = req.user;
  if (account.isAdmin) return next();
  res.redirect("/user/profile");
};
