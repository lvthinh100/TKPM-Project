const express = require("express");
const authController = require("../controller/authController");

const router = express.Router();

router.post("/logout", authController.handleLogout);
router.post("/loginAdmin", authController.handleAdminLogin);

router.use(authController.notLoggedIn);
router.get("/register", authController.renderRegisterPage);
router.post("/register", authController.handleRegister);

router.get("/login", authController.renderLoginPage);
router.post("/login", authController.handleLogin);

module.exports = router;
